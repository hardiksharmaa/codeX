import { db } from "@/config/db";
import {
  CourseChaptersTable,
  CourseTable,
  EnrolledCoursesTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, asc, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseIdParam = searchParams.get("courseId");
    const user = await currentUser();

    // ✅ CASE 1: No courseId → return ALL courses
    if (!courseIdParam) {
      const courses = await db.select().from(CourseTable);
      return NextResponse.json(courses);
    }

    // ✅ CASE 2: courseId present → course detail
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
    }

    return NextResponse.json({
      ...result[0],
      chapters: chapterResult,
      userEnrolled: isEnrolledCourse,
      courseEnrolledInfo: enrolledCourse[0] ?? null,
    });

  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}