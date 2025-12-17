import { db } from "@/config/db";
import { CourseChaptersTable, CourseTable } from "@/config/schema";
import { eq , asc} from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseIdParam = searchParams.get("courseId");

    if (courseIdParam) {
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

      const chapterResult=await db.select().from(CourseChaptersTable).where(eq(CourseChaptersTable.courseId,courseId)).orderBy(asc(CourseChaptersTable.chapterId));

      return NextResponse.json(
        {
          ...result[0],
          chapters: chapterResult,
        }
      );
    }
    const result = await db.select().from(CourseTable);
    return NextResponse.json(result);

  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}