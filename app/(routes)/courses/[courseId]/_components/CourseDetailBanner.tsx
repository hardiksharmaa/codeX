'use client'
import React, { useState } from 'react'
import { Course } from '../../_components/CourseList'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { se } from 'date-fns/locale'
import { set } from 'date-fns'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

type props={
    loading:boolean,
    courseDetail:Course | undefined
    refreshData:()=>void
}
function CourseDetailBanner({ loading, courseDetail, refreshData }: props) {
  const [loading_,setLoading_] =useState(false);
  const EnrollCourse=async()=>{
    setLoading_(true)
    try {
      const result = await axios.post('/api/enroll-course', {
        courseId: courseDetail?.courseId
      })
      if (result.status === 200) {
        toast.success('Course Enrolled Successfully')
        refreshData();
      }
    } catch (error) {
      console.error('Enrollment failed:', error)
      toast.error('Failed to enroll in course. Please try again.')
    } finally {
      setLoading_(false)
    }
  }

  return (
    <div>
      {!courseDetail ? (
        <Skeleton className="w-full h-[300px] rounded-2xl" />
      ) : (
        <div className="relative w-full h-[350px] overflow-hidden rounded-2xl">

          <Image
            src={courseDetail.bannerImage}
            alt={courseDetail.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />

          <div className="absolute inset-0 z-10 flex flex-col justify-center pt-2 px-10 md:px-24 lg:px-36 font-game ">
            <h2 className="text-6xl text-white">
              {courseDetail.title}
            </h2>
            <p className="text-3xl text-zinc-300 mt-2 max-w-3xl">
              {courseDetail.desc}
            </p>
            {
              !courseDetail.userEnrolled ?
            <Button
              className="font-game text-2xl mt-6 w-fit px-2 cursor-pointer"
              variant="pixel"
              size="lg"
              onClick={EnrollCourse}
              disabled={loading_}
            >
              {loading_ && <Loader2Icon className='animate-spin'/>}
              Enroll Now
            </Button>
            : 
            <Button className="font-game text-2xl mt-6 w-fit px-2 cursor-pointer" variant="pixel"
              size="lg">Continue Learning...</Button>
            }
          </div>
            
        </div>
      )}
    </div>
  );
}

export default CourseDetailBanner