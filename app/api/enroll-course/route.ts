import { db } from "@/config/db";
import { EnrolledCoursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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
    const courseId = Number(body.courseId);

    if (!courseId || Number.isNaN(courseId)) {
      return NextResponse.json(
        { error: "Invalid courseId" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(EnrolledCoursesTable)
      .values({
        courseId,
        userId: user.id, 
        xpEarned: 0,
      })
      .onConflictDoNothing()
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Already enrolled" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, enrollment: result[0] },
      { status: 201 }
    );

  } catch (error) {
    console.error("Enroll error:", error);
    return NextResponse.json(
      { error: "Failed to enroll" },
      { status: 500 }
    );
  }
}