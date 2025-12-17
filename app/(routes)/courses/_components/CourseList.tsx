"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import Link from "next/link";

export type Course = {
  id: number;
  courseId: number;
  title: string;
  desc: string;
  level: string;
  bannerImage: string;
  tag: string;
  chapters?:Chapter[];
};

type Chapter={
  chapterId: number;
  courseId: number;
  desc: number;
  name: string;
  id: number;
  exercises: exercise[];
}

type exercise={
  name: string;
  slug:string;
  xp:number;
  difficulty:string;
}


function CourseList() {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllCourses();
  }, []);

  const GetAllCourses = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/course");
      setCourseList(result.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="font-game text-2xl mt-2 text-yellow-500">Loading courses...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
      {courseList.map((course) => (
        <Link key={course.id} href={'/courses/'+course?.courseId}>
        <div key={course.id} className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 rounded-xl p-3 cursor-pointer"
        >
        <div className="relative w-full h-[150px] overflow-hidden rounded-lg">
          <Image
            src={course.bannerImage}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>

        <h2 className="font-game text-2xl mt-3">{course.title}</h2>
        <p className="text-zinc-400 font-game text-xl">{course.desc}</p>
        <h2 className=" gap-2 bg-gray-900 font-game p-1 rounded-xl items-center inline-flex px-3 mt-2">
          <ChartNoAxesColumnIncreasingIcon className="h-4 w-4"/>
          {course.level} 
        </h2>
      </div>
      </Link>
      ))}
    </div>
  );
}

export default CourseList;