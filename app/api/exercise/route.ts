import { CompletedExerciseTable, CourseChaptersTable, CourseTable, ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { and, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId } = await req.json();
    const courseInfo=await db.select().from(CourseTable).where(eq(CourseTable.courseId,courseId))

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

    const completedExercise=await db.select().from(CompletedExerciseTable).where(and(eq(CompletedExerciseTable?.courseId,courseId),eq(CompletedExerciseTable?.chapterId,chapterId)))

    return NextResponse.json({
      ...courseResult[0],
      exerciseResult: exerciseResult[0],
      completedExercise:completedExercise,
      editorType:courseInfo[0]?.editorType
    });

  } catch (error) {
    console.error("Fetch exercise error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}