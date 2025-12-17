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
                        {/* <Button variant={'destructive'} className='px-2 font-game'>{exc.xp} xp</Button> */}
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
                          <p>Please Enroll</p>
                        </TooltipContent>
                        </Tooltip>
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