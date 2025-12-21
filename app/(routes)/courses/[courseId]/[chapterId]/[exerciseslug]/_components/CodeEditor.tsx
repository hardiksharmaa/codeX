'use client';

import React from 'react';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react';

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { CourseExercise } from '../page';
import { Button } from '@/components/ui/button';
import { nightOwl } from "@codesandbox/sandpack-themes";
import { useParams } from 'next/navigation';

type Props={
  courseExerciseData:CourseExercise | undefined;
  loading:boolean;
}
const CodeEditorChildren = ({onCompleteExercise}:any) => {

  const {sandpack}=useSandpack();
  return (
    <div className="font-game flex w-full gap-3">
      <Button
        variant="default"
        className="flex-1 text-xl py-2 cursor-pointer bg-[#874a4a]"
        onClick={()=>sandpack.runSandpack()}
      >
        Run Code
      </Button>

      <Button
        variant="default"
        className="flex-1 bg-[#a3e534] text-xl py-2 cursor-pointer"
        onClick={()=>onCompleteExercise()}
      >
        Mark Completed!
      </Button>
    </div>
  );
};

function CodeEditor({courseExerciseData,loading}:Props) {

  const {exerciseslug}=useParams();
  const onCompleteExercise=()=>{
    
  }
  return (
    <div
      className="w-full bg-black overflow-hidden"
      style={{ height: 'calc(100vh - 48px)' }} 
    >
      <SandpackProvider
        template="static"
        theme={nightOwl}
        files={courseExerciseData?.exerciseResult?.exercisesContent?.starterCode}
        options={{
          autoReload:false,
          autorun:false
        }}
      >
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
            <div className='shrink-0 border-t border-zinc-800 p-2 flex gap-3 bg-black'>
              <CodeEditorChildren onCompleteExercise={onCompleteExercise}/>
            </div>
            </div>
          </Panel>
          <PanelResizeHandle
            className="w-1 bg-zinc-800 hover:bg-yellow-500 transition-colors cursor-col-resize"
          />
          <Panel defaultSize={50} minSize={35} className="min-w-0">
            <div className="h-full w-full bg-white overflow-auto">
              <SandpackPreview 
              showNavigator
              showOpenNewtab
              showOpenInCodeSandbox={false}
              showRefreshButton={false} 
              style={{ height: '100%' }} />
            </div>
          </Panel>

        </PanelGroup>
      </SandpackProvider>
      <div className="max-w-7xl mx-auto flex gap-4 pb-2">
      <Button className="flex-1 font-game text-xl  bg-[#103a5f] cursor-pointer text-white" variant="default">
        Previous
      </Button>
      <Button className="flex-1 font-game text-xl bg-[#103a5f] cursor-pointer text-white" variant="default">
        Next
      </Button>
    </div>
    </div>
  );
}

export default CodeEditor;