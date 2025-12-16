"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Pixelify_Sans } from 'next/font/google';
import Link from 'next/link';
function EnrolledCourses() {
    const [enrolledCourses,setenrolledCourses]=useState([]);
  return (
    <div className='mt-2'>
        <h2 className='font-game text-3xl mb-1'>Your Enrolled Courses</h2>
        {
            enrolledCourses?.length==0?
            <div className='flex flex-col items-center gap-3 p-7 border rounded-2xl bg-zinc-800'>
                <Image src={'/books.png'} alt='book' width={90} height={90}/>
                <h2 className='font-game text-2xl' >You Don't have any enrolled courses yet</h2>
                <Link href={'/courses'}>
                <Button variant={'pixel'} size={'lg'}className='font-game text-xl cursor-pointer'>Enroll Now</Button>
                </Link>
            </div>: 
            <div>
                list
            </div>
        }
    </div>
  )
}

export default EnrolledCourses