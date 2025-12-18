import React from 'react'
import { Course } from '../../_components/CourseList'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type props={
    loading:boolean,
    courseDetail:Course | undefined
}

function CourseChapters({ loading, courseDetail }:props) {

  const getGlobalExerciseIndex = (
    chapterIndex: number,
    exerciseIndex: number,
    chapters: any[]
  ) => {
    let count = 0;

    for (let i = 0; i < chapterIndex; i++) {
      count += chapters[i].exercises.length;
    }

    return count + exerciseIndex;
  };

    const EnableExercise = (
    chapterIndex: number,
    exerciseIndex: number
  ) => {
    const completed = courseDetail?.completedExercises;
    const chapters = courseDetail?.chapters;

    if (!chapters) return false;

    if (!completed || completed.length === 0) {
      return chapterIndex === 0 && exerciseIndex === 0;
    }

    const last = completed[completed.length - 1];

    const lastGlobalIndex = getGlobalExerciseIndex(
      last.chapterId - 1,
      last.exerciseId - 1,
      chapters
    );

    const currentGlobalIndex = getGlobalExerciseIndex(
      chapterIndex,
      exerciseIndex,
      chapters
    );

    return currentGlobalIndex === lastGlobalIndex + 2;
  };

  const isExerciseCompleted=(chapterId:number, exerciseId:number)=>{
    const completedChapters = courseDetail?.completedExercises;
    const completedChapter=completedChapters?.find((item=>item.chapterId===chapterId && item.exerciseId===exerciseId))
    if(completedChapter) return true;
    return false;
  }
  return (
    <div>
        <div className='p-5 border-4 rounded-2xl'>
          {
            courseDetail?.chapters?.map((chapter,index)=>(
              <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1">
                  <AccordionTrigger className='p-3 hover:bg-zinc-800 font-game text-3xl'>
                  <div className='flex gap-8'>
                    <h2 className='h-7 w-7'>{index+1}</h2>
                    <h2>{chapter.name}</h2>
                  </div>
                  </AccordionTrigger>
                <AccordionContent>
                  <div className='p-3 bg-zinc-800 rounded-2xl'>
                    {chapter?.exercises.map((exc,indexExc)=>(
                      <div key={indexExc} className='flex items-center justify-between mb-5'>
                        <div className='flex items-center gap-10'>
                          <h2 className='text-2xl font-game text-yellow-500'>Excercise {index*chapter?.exercises
                          .length+indexExc+1}</h2>
                          <h2 className='text-2xl font-game'>{exc.name}</h2>
                        </div>
                        {isExerciseCompleted(chapter.chapterId, indexExc + 1) ? (
                          <Button
                            variant="pixel"
                            className="px-2 font-game text-xl bg-green-600 cursor-default"
                          >
                            Done
                          </Button>
                        ) : EnableExercise(index, indexExc) ? (
                          <Button variant="destructive" className="px-2 font-game text-xl">
                            {exc.xp} xp
                          </Button>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="pixelDisabled"
                                className="px-2 font-game cursor-not-allowed"
                              >
                                🔒 xp
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Complete previous exercise</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          }
        </div>
    </div>
  )
}

export default CourseChapters