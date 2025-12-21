import { db } from "@/config/db";
import { CompletedExerciseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { courseId, chapterId, exerciseId } = body;

    if (!courseId || !chapterId || !exerciseId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    
    const existing = await db
      .select()
      .from(CompletedExerciseTable)
      .where(
        and(
          eq(CompletedExerciseTable.userId, user.id),
          eq(CompletedExerciseTable.exerciseId, exerciseId)
        )
      );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Exercise already completed" },
        { status: 200 }
      );
    }

    const result = await db
      .insert(CompletedExerciseTable)
      .values({
        courseId,
        chapterId,
        exerciseId,
        userId: user.id,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });

  } catch (error) {
    console.error("[COMPLETE_EXERCISE_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}