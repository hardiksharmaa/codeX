"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Pixelify_Sans } from 'next/font/google';
import Link from 'next/link';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import CourseProgressCard from './CourseProgressCard';

export type EnrolledCourseInfo={
    bannerImage:string,
    courseId:number,
    completedExercises:number,
    level:string,
    title:string,
    totalExercises:number,
    userEnrolled:boolean,
    xpEarned:number
}
function EnrolledCourses() {
    const [enrolledCourses,setEnrolledCourses]=useState<EnrolledCourseInfo[]>([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{ 
        GetUserEnrolledCourses();
    },[])

    const GetUserEnrolledCourses=async()=>{
        setLoading(true);
        const result=await axios.get('/api/course?courseId=enrolled');
        setEnrolledCourses(result.data);
        console.log(result.data);
        setLoading(false);
    }
  return (
    <div className='mt-2'>
        <h2 className='font-game text-3xl mb-1'>Your Enrolled Courses</h2>
        {loading && <Skeleton className='w-full rounded-2xl my-5'/>}
        {
            enrolledCourses?.length==0?
            <div className='flex flex-col items-center gap-3 p-7 border rounded-2xl bg-zinc-800'>
                <Image src={'/books.png'} alt='book' width={90} height={90}/>
                <h2 className='font-game text-2xl' >You Don't have any enrolled courses yet</h2>
                <Link href={'/courses'}>
                <Button variant={'pixel'} size={'lg'}className='font-game text-xl cursor-pointer'>Enroll Now</Button>
                </Link>
            </div>: 
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-3'>
                {enrolledCourses?.map((course,index)=>(
                    <div key={index}>
                        <CourseProgressCard course={course}/>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default EnrolledCourses