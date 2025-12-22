import React from 'react'
import { EnrolledCourseInfo } from './EnrolledCourses'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

type Props = {
  course: EnrolledCourseInfo
}

function CourseProgressCard({ course }: Props) {
  const progressPercent =
    (course.completedExercises / course.totalExercises) * 100

  return (
    <Link href={'/courses/'+course?.courseId}>
    <div className="group rounded-2xl overflow-hidden border border-zinc-800 bg-linear-to-b from-zinc-900 to-zinc-950 hover:border-yellow-500/40 transition-all duration-300 mb-4 border-3">
      
      <div className="relative">
        <Image
          src={course.bannerImage.trimEnd()}
          alt={course.title}
          width={1200}
          height={600}
          className="w-full h-[140px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />

        <span className="absolute top-3 right-3 px-3 py-1 text-sm font-game rounded-full bg-black/70 border border-zinc-700 text-yellow-400">
          {course.level}
        </span>
      </div>

      <div className="p-5 font-game space-y-1">
        <h2 className="text-2xl leading-tight">{course.title}</h2>

        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span className='text-xl'>
            {course.completedExercises} / {course.totalExercises} exercises
          </span>
          <span className='text-xl'>{Math.round(progressPercent)}%</span>
        </div>

        <Progress
          value={progressPercent}
          className="h-2 bg-zinc-800"
        />
      </div>
    </div>
    </Link>
  )
}

export default CourseProgressCard