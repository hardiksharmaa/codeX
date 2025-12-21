'use client'

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { exercise } from "../../../_components/CourseList";
import ContentSection from "./_components/ContentSection";
import CodeEditor from "./_components/CodeEditor";
import { Button } from "@/components/ui/button";
export type CourseExercise = {
  chapterId: number;
  courseId: number;
  desc: string;
  name: string;
  exerciseResult: exerciseData; 
};

export type exerciseData = {
  chapterId: number;
  courseId: number;
  exerciseId: string;
  exerciseName: string;
  exercisesContent: ExerciseContent; 
};

type ExerciseContent={
  content:string;
  hint:string;
  hintXP:string;
  starterCode:any;
  task:string;
}

export default function Playground() {
  const { courseId, chapterId, exerciseslug } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseExerciseData, setCourseExerciseData] = useState<any>();
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    getExerciseCourseDetail();
  }, [courseId, chapterId, exerciseslug]);

  const getExerciseCourseDetail = async () => {
    setLoading(true);
    const result = await axios.post('/api/exercise', {
      courseId,
      chapterId,
      exerciseId: exerciseslug,
    });
    setCourseExerciseData(result.data);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <PanelGroup direction="horizontal" className="h-full min-h-0">

        <Panel defaultSize={40} minSize={20}>
          <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
            <ContentSection
              courseExerciseData={courseExerciseData}
              loading={loading}
            />
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-yellow-500" />

        <Panel defaultSize={60} minSize={30}>
          <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
            <CodeEditor 
            courseExerciseData={courseExerciseData}
            loading={loading}/>
          </div>
        </Panel>

      </PanelGroup>

    </div>
  );
}