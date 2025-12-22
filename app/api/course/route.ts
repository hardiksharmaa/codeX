import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  CourseChaptersTable,
  CourseTable,
  EnrolledCoursesTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import {
  eq,
  asc,
  and,
  desc,
  inArray,
} from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseIdParam = searchParams.get("courseId");
    const user = await currentUser();

    if (!courseIdParam) {
      const courses = await db.select().from(CourseTable);
      return NextResponse.json(courses);
    }

    if (courseIdParam === "enrolled") {
      if (!user) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      const userId = user.id;

      const enrolledCourses = await db
        .select()
        .from(EnrolledCoursesTable)
        .where(eq(EnrolledCoursesTable.userId, userId));

      if (enrolledCourses.length === 0) {
        return NextResponse.json([]);
      }

      const courseIds = enrolledCourses.map(c => c.courseId);

      const courses = await db
        .select()
        .from(CourseTable)
        .where(inArray(CourseTable.courseId, courseIds));

      const chapters = await db
        .select()
        .from(CourseChaptersTable)
        .where(inArray(CourseChaptersTable.courseId, courseIds))
        .orderBy(asc(CourseChaptersTable.chapterId));

      const completed = await db
        .select()
        .from(CompletedExerciseTable)
        .where(
          and(
            inArray(CompletedExerciseTable.courseId, courseIds),
            eq(CompletedExerciseTable.userId, userId)
          )
        );

      const formattedResult = courses.map(course => {
        const courseEnrollInfo = enrolledCourses.find(
          e => e.courseId === course.courseId
        );

        const courseChapters = chapters.filter(
          ch => ch.courseId === course.courseId
        );

        const totalExercises = courseChapters.reduce((acc, chapter) => {
          const count = Array.isArray(chapter.exercises)
            ? chapter.exercises.length
            : 0;
          return acc + count;
        }, 0);

        const completedExercises = completed.filter(
          cx => cx.courseId === course.courseId
        ).length;

        return {
          courseId: course.courseId,
          title: course.title,
          bannerImage: course.bannerImage,
          totalExercises,
          completedExercises,
          xpEarned: courseEnrollInfo?.xpEarned ?? 0,
          level: course.level,
          userEnrolled: true,
        };
      });

      return NextResponse.json(formattedResult);
    }
    
    const courseId = Number(courseIdParam);
    if (Number.isNaN(courseId)) {
      return NextResponse.json(
        { error: "Invalid courseId" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(CourseTable)
      .where(eq(CourseTable.courseId, courseId));

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const chapterResult = await db
      .select()
      .from(CourseChaptersTable)
      .where(eq(CourseChaptersTable.courseId, courseId))
      .orderBy(asc(CourseChaptersTable.chapterId));

    let isEnrolledCourse = false;
    let enrolledCourse: any[] = [];
    let completedExercises: any[] = [];

    if (user) {
      enrolledCourse = await db
        .select()
        .from(EnrolledCoursesTable)
        .where(
          and(
            eq(EnrolledCoursesTable.courseId, courseId),
            eq(EnrolledCoursesTable.userId, user.id)
          )
        );

      isEnrolledCourse = enrolledCourse.length > 0;

      completedExercises = await db
        .select()
        .from(CompletedExerciseTable)
        .where(
          and(
            eq(CompletedExerciseTable.courseId, courseId),
            eq(CompletedExerciseTable.userId, user.id)
          )
        )
        .orderBy(
          asc(CompletedExerciseTable.chapterId),
          asc(CompletedExerciseTable.exerciseId)
        );
    }

    return NextResponse.json({
      ...result[0],
      chapters: chapterResult,
      userEnrolled: isEnrolledCourse,
      courseEnrolledInfo: enrolledCourse[0] ?? null,
      completedExercises,
    });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}