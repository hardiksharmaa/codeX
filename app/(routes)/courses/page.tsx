import React from 'react'
import Image from 'next/image'
import CourseList from './_components/CourseList'
function Courses() {
  return (
    <div>
        <div className="relative h-[300px] w-full">
        <Image
          src="/course-banner.gif"
          alt="course-banner"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 pt-24 px-10 md:px-24 lg:px-36
                    bg-linear-to-r from-black/90 via-black/60 to-transparent
                    space-y-2"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          <h2 className="font-game text-6xl">Explore All Courses</h2>
          <p className="font-game text-3xl">
            Enroll to learn and increase your knowledge.
          </p>
        </div>
      </div>
        <div className='mt-7 px-10 md:px-24 lg:px-36'>
          <h2 className='font-game text-4xl'>All Courses</h2>
          <CourseList />
        </div>
    </div>
  )
}

export default Courses