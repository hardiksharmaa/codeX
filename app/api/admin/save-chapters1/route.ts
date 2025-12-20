import {db} from "@/config/db"
import { CourseChaptersTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server";
export const DATA = [
  {
    id: 1,
    name: "Introduction to CSS",
    desc: "Understand how CSS styles the web and separates design from structure.",
    exercises: [
      { name: "Style the Page", slug: "style-the-page", xp: 20, difficulty: "easy" },
      { name: "CSS Power-Up", slug: "css-power-up", xp: 25, difficulty: "easy" },
      { name: "Inline vs External", slug: "inline-vs-external", xp: 20, difficulty: "easy" },
      { name: "CSS File Linking", slug: "css-file-linking", xp: 25, difficulty: "easy" }
    ]
  },

  {
    id: 2,
    name: "Selectors & Specificity",
    desc: "Target elements accurately using CSS selectors and specificity rules.",
    exercises: [
      { name: "Class Hunter", slug: "class-hunter", xp: 25, difficulty: "easy" },
      { name: "ID Boss Fight", slug: "id-boss-fight", xp: 30, difficulty: "medium" },
      { name: "Specificity Battle", slug: "specificity-battle", xp: 35, difficulty: "medium" },
      { name: "Selector Combo", slug: "selector-combo", xp: 30, difficulty: "medium" },
      { name: "Override the Styles", slug: "override-the-styles", xp: 40, difficulty: "hard" }
    ]
  },

  {
    id: 3,
    name: "Colors & Units",
    desc: "Learn colors, units, and sizing techniques in CSS.",
    exercises: [
      { name: "Color Alchemy", slug: "color-alchemy", xp: 20, difficulty: "easy" },
      { name: "Pixel vs Percent", slug: "pixel-vs-percent", xp: 25, difficulty: "easy" },
      { name: "Responsive Units", slug: "responsive-units", xp: 35, difficulty: "medium" },
      { name: "REM vs EM", slug: "rem-vs-em", xp: 30, difficulty: "medium" }
    ]
  },

  {
    id: 4,
    name: "Box Model",
    desc: "Master padding, margin, border, and content flow.",
    exercises: [
      { name: "Box Breakdown", slug: "box-breakdown", xp: 30, difficulty: "easy" },
      { name: "Margin Mystery", slug: "margin-mystery", xp: 30, difficulty: "medium" },
      { name: "Border Control", slug: "border-control", xp: 25, difficulty: "easy" },
      { name: "Padding Puzzle", slug: "padding-puzzle", xp: 30, difficulty: "medium" },
      { name: "Box Sizing Fix", slug: "box-sizing-fix", xp: 35, difficulty: "medium" }
    ]
  },

  {
    id: 5,
    name: "Flexbox",
    desc: "Create flexible layouts using Flexbox.",
    exercises: [
      { name: "Flex Align", slug: "flex-align", xp: 30, difficulty: "easy" },
      { name: "Center the Boss", slug: "center-the-boss", xp: 35, difficulty: "medium" },
      { name: "Flex Layout Challenge", slug: "flex-layout-challenge", xp: 45, difficulty: "medium" },
      { name: "Flex Direction Master", slug: "flex-direction-master", xp: 35, difficulty: "medium" },
      { name: "Flex Wrap Arena", slug: "flex-wrap-arena", xp: 40, difficulty: "hard" }
    ]
  },

  {
    id: 6,
    name: "Grid Layout",
    desc: "Design complex layouts using CSS Grid.",
    exercises: [
      { name: "Grid Blueprint", slug: "grid-blueprint", xp: 35, difficulty: "medium" },
      { name: "Grid Area Master", slug: "grid-area-master", xp: 40, difficulty: "medium" },
      { name: "Grid Columns Setup", slug: "grid-columns-setup", xp: 35, difficulty: "medium" },
      { name: "Grid Gap Control", slug: "grid-gap-control", xp: 30, difficulty: "easy" },
      { name: "Grid Dashboard Challenge", slug: "grid-dashboard-challenge", xp: 50, difficulty: "hard" }
    ]
  },

  {
    id: 7,
    name: "Responsive Design",
    desc: "Build layouts that adapt to all screen sizes.",
    exercises: [
      { name: "Media Query Magic", slug: "media-query-magic", xp: 30, difficulty: "medium" },
      { name: "Mobile First", slug: "mobile-first", xp: 40, difficulty: "medium" },
      { name: "Breakpoint Builder", slug: "breakpoint-builder", xp: 35, difficulty: "medium" },
      { name: "Responsive Navbar", slug: "responsive-navbar", xp: 45, difficulty: "hard" }
    ]
  },

  {
    id: 8,
    name: "CSS Best Practices",
    desc: "Write clean, scalable, and maintainable CSS.",
    exercises: [
      { name: "Clean Styles", slug: "clean-styles", xp: 25, difficulty: "easy" },
      { name: "Refactor the Mess", slug: "refactor-the-mess", xp: 45, difficulty: "hard" },
      { name: "Naming Convention Fix", slug: "naming-convention-fix", xp: 30, difficulty: "medium" },
      { name: "Remove Dead CSS", slug: "remove-dead-css", xp: 35, difficulty: "medium" }
    ]
  }
];

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await Promise.all(
      DATA.map((item) =>
        db
          .insert(CourseChaptersTable)
          .values({
            courseId: 3, 
            desc: item?.desc,
            exercises: item.exercises,
            name: item?.name,
            chapterId: item?.id
          })
          .onConflictDoNothing()   
      )
    );

    return NextResponse.json({
      success: true,
      message: "Chapters inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting chapters:", error);

    return NextResponse.json(
      { error: "Failed to insert chapters" },
      { status: 500 }
    );
  }
}

