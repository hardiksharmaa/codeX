'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import {Course} from '../../_components/CourseList'
type Props={
  courseDetail:Course| undefined
}
function CourseStatus({courseDetail}:Props) {
  const [counts,setCounts]=useState<{
    totalExc:number,
    totalXP:number
  }>();

  useEffect(()=>{
    courseDetail && getCounts();
  },[courseDetail])

  const getCounts=()=>{
    let totalExcersises=0;
    let totalxp=0;

    courseDetail?.chapters?.forEach((chapter)=>{
      totalExcersises+=chapter?.exercises?.length;
      chapter?.exercises?.forEach((exercise)=>{
        totalxp+=exercise?.xp;
      })
    })
    setCounts({
      totalExc:totalExcersises,
      totalXP:totalxp
    })
  }
  return (
    <div className='font-game p-4 border-4 rounded-xl w-full'>
        <h2 className='text-3xl'>Course Progress</h2>
        <div className='flex items-center gap-5 mt-4'>
            <Image src={'/book.png'} alt='book' width={50} height={50}/>
            <div className='w-full'>
              <h2 className='flex justify-between text-2xl'>Exercises <span className='text-zinc-400'>7/{counts?.totalExc}</span></h2>
              <Progress value={28} className='mt-2'/>

            </div>
        </div>
        <div className='flex items-center gap-5 mt-4'>
            <Image src={'/star.png'} alt='book' width={50} height={50}/>
            <div className='w-full'>
              <h2 className='flex justify-between text-2xl'>XP Earned <span className='text-zinc-400'>1/{counts?.totalXP}</span></h2>
              <Progress value={28} className='mt-2'/>

            </div>
        </div>
    </div>
  )
}

export default CourseStatus