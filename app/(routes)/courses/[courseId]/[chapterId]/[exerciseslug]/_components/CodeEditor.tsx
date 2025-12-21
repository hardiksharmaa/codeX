'use client';

import React, { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react';
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { CourseExercise } from '../page';
import { Button } from '@/components/ui/button';
import { nightOwl } from "@codesandbox/sandpack-themes";
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

type Progress = {
  currentIndex: number;
  totalExercises: number;
  isFirst: boolean;
  isLast: boolean;
  nextExerciseId: string | null;
  prevExerciseId: string | null;
};


const CodeEditorChildren = ({
  onCompleteExercise,
  completing,
  isCompleted,
}: any) => {
  const { sandpack } = useSandpack();

  return (
    <div className="font-game flex w-full gap-3">
      <Button
        variant="default"
        className="flex-1 text-xl py-2 cursor-pointer bg-[#874a4a]"
        onClick={() => sandpack.runSandpack()}
      >
        Run Code
      </Button>

      <Button
        variant="default"
        className="flex-1 bg-[#6da50d] text-xl py-2 cursor-pointer"
        disabled={completing || isCompleted}
        onClick={onCompleteExercise}
      >
        {isCompleted ? "Completed" : completing ? "Saving..." : "Mark Completed!"}
      </Button>
    </div>
  );
};


function CodeEditor({ courseExerciseData }: Props) {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.courseId);
  const chapterId = Number(params.chapterId);
  const exerciseslug = String(params.exerciseslug);

  const [progress, setProgress] = useState<Progress | null>(null);
  const [completing, setCompleting] = useState(false);
  const [locallyCompleted, setLocallyCompleted] = useState(false);
  const [showXpGain, setShowXpGain] = useState(false);

  const isCompleted =
    locallyCompleted ||
    courseExerciseData?.completedExercise?.some(
      (ce: any) =>
        ce.courseId === courseId &&
        ce.chapterId === chapterId &&
        ce.exerciseId === exerciseslug
    ) ||
    false;

  useEffect(() => {
    if (!courseId || !chapterId || !exerciseslug) return;

    setProgress(null);

    const fetchProgress = async () => {
      try {
        const res = await axios.post("/api/exercise/progress", {
          courseId,
          chapterId,
          exerciseId: exerciseslug,
        });
        setProgress(res.data);
      } catch (err) {
        console.error("Failed to fetch exercise progress", err);
      }
    };

    fetchProgress();
  }, [courseId, chapterId, exerciseslug]);

  const onCompleteExercise = async () => {
    if (completing || isCompleted) return;

    try {
      setCompleting(true);

      const xpEarned = 20;

      await axios.post("/api/exercise/complete", {
        courseId,
        chapterId,
        exerciseId: exerciseslug,
        xpEarned,
      });

      toast.success("Exercise marked as completed!");
      setLocallyCompleted(true);
      setShowXpGain(true);

      setTimeout(() => {
        setShowXpGain(false);
      }, 1500);
      const res = await axios.post("/api/exercise/progress", {
        courseId,
        chapterId,
        exerciseId: exerciseslug,
      });
      setProgress(res.data);
    } catch (error) {
      toast.error("Failed to complete exercise");
      console.error("Failed to complete exercise", error);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div
      className="w-full bg-black overflow-hidden"
      style={{ height: 'calc(100vh - 48px)' }}
    >
      <SandpackProvider
        template="static"
        theme={nightOwl}
        files={courseExerciseData?.exerciseResult?.exercisesContent?.starterCode}
        options={{ autoReload: false, autorun: false }}
      >
        {showXpGain && (
        <div className="fixed bottom-24 right-10 z-50 pointer-events-none">
          <div className="animate-xp-pop text-3xl font-game text-yellow-700 drop-shadow-lg">
            +20 XP ✨
          </div>
        </div>
      )}
        <PanelGroup direction="horizontal" className="h-full min-h-0">
          <Panel defaultSize={50} minSize={35} className="min-w-0">
            <div className="h-full w-full flex flex-col min-h-0">
              <div className="flex-1 overflow-auto">
                <SandpackCodeEditor
                  showTabs
                  showRunButton={false}
                  showLineNumbers
                  wrapContent
                  style={{ height: 'calc(100vh - 150px)' }}
                />
              </div>

              <div className="shrink-0 border-t border-zinc-800 p-2 flex gap-3 bg-black">
                <CodeEditorChildren
                  onCompleteExercise={onCompleteExercise}
                  completing={completing}
                  isCompleted={isCompleted}
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-yellow-500 transition-colors cursor-col-resize" />

          <Panel defaultSize={50} minSize={35} className="min-w-0">
            <div className="h-full w-full bg-white overflow-auto">
              <SandpackPreview
                showNavigator
                showOpenNewtab
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ height: '100%' }}
              />
            </div>
          </Panel>
        </PanelGroup>
      </SandpackProvider>
      <div className="max-w-7xl mx-auto flex gap-4 pb-2">
        <Button
          disabled={!progress || progress.isFirst}
          onClick={() =>
            progress?.prevExerciseId &&
            router.push(
              `/courses/${courseId}/${chapterId}/${progress.prevExerciseId}`
            )
          }
          className="flex-1 font-game text-xl bg-[#103a5f] text-white cursor-pointer"
        >
          Previous
        </Button>

        {isCompleted && progress?.nextExerciseId ? (
          <Button
            onClick={() =>
              router.push(
                `/courses/${courseId}/${chapterId}/${progress.nextExerciseId}`
              )
            }
            className="flex-1 font-game text-xl bg-[#103a5f] text-white cursor-pointer"
          >
            Next
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex-1">
                <Button
                  disabled
                  className="w-full font-game text-xl bg-[#103a5f] text-white cursor-not-allowed"
                >
                  Next
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xl rounded-2xl p-1 font-game">
                Complete this exercise first
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;