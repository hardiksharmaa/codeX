import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  CourseChaptersTable,
  CourseTable,
  EnrolledCoursesTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, asc, and, desc } from "drizzle-orm";
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
        ).orderBy(desc(CompletedExerciseTable?.courseId),
          desc(CompletedExerciseTable?.exerciseId)
        )
      }
    return NextResponse.json({
      ...result[0],
      chapters: chapterResult,
      userEnrolled: isEnrolledCourse,
      courseEnrolledInfo: enrolledCourse[0] ?? null,
      completedExercises: completedExercises,
    });

  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}