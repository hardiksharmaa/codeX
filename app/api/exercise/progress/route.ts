import { ExerciseTable } from "@/config/schema";
import { db } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
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
    const exercises = await db
      .select({
        id: ExerciseTable.id,
        exerciseId: ExerciseTable.exerciseId,
      })
      .from(ExerciseTable)
      .where(
        and(
          eq(ExerciseTable.courseId, courseId),
          eq(ExerciseTable.chapterId, chapterId)
        )
      )
      .orderBy(ExerciseTable.id); 

    if (!exercises.length) {
      return NextResponse.json(
        { error: "No exercises found" },
        { status: 404 }
      );
    }

    const currentIndex = exercises.findIndex(
      (ex) => ex.exerciseId === exerciseId
    );

    if (currentIndex === -1) {
      return NextResponse.json(
        { error: "Exercise not found in chapter" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      currentIndex,     
      totalExercises: exercises.length,
      isFirst: currentIndex === 0,
      isLast: currentIndex === exercises.length - 1,
      nextExerciseId:
        exercises[currentIndex + 1]?.exerciseId ?? null,
      prevExerciseId:
        exercises[currentIndex - 1]?.exerciseId ?? null,
    });

  } catch (error) {
    console.error("[EXERCISE_PROGRESS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}