import React from 'react'
import { Course } from '../../_components/CourseList'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

type props={
    loading:boolean,
    courseDetail:Course | undefined
}
function CourseDetailBanner({ loading, courseDetail }: props) {
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

            <Button
              className="font-game text-2xl mt-6 w-fit px-2 cursor-pointer"
              variant="pixel"
              size="lg"
            >
              Enroll Now
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CourseDetailBanner