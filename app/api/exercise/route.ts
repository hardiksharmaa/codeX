import { CourseChaptersTable, ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { and, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId } = await req.json();

    if (!courseId || !chapterId || !exerciseId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [courseResult, exerciseResult] = await Promise.all([
      db
        .select()
        .from(CourseChaptersTable)
        .where(
          and(
            eq(CourseChaptersTable.courseId, courseId),
            eq(CourseChaptersTable.chapterId, chapterId)
          )
        ),

      db
        .select()
        .from(ExerciseTable)
        .where(
          and(
            eq(ExerciseTable.courseId, courseId),
            eq(ExerciseTable.exerciseId, exerciseId)
          )
        ),
    ]);

    if (!courseResult.length || !exerciseResult.length) {
      return NextResponse.json(
        { error: "Course or Exercise not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...courseResult[0],
      exerciseResult: exerciseResult[0],
    });

  } catch (error) {
    console.error("Fetch exercise error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}