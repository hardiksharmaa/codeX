import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  EnrolledCoursesTable,
  usersTable
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
    const safeXp = Number(xpEarned) || 0;

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

    const [completed] = await db
      .insert(CompletedExerciseTable)
      .values({
        courseId,
        chapterId,
        exerciseId,
        userId: user.id,
      })
      .returning();

    await db
      .update(EnrolledCoursesTable)
      .set({
        xpEarned: sql`${EnrolledCoursesTable.xpEarned} + ${safeXp}`,
      })
      .where(
        and(
          eq(EnrolledCoursesTable.courseId, courseId),
          eq(EnrolledCoursesTable.userId, user.id)
        )
      );

    const email = user.primaryEmailAddress?.emailAddress;
    if (email) {
      await db
        .update(usersTable)
        .set({
          points: sql`${usersTable.points} + ${safeXp}`,
        })
        .where(eq(usersTable.email, email));
    }

    return NextResponse.json(completed, { status: 201 });
  } catch (error) {
    console.error("[COMPLETE_EXERCISE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}