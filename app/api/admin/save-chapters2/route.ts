import {db} from "@/config/db"
import { CourseChaptersTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server";
export const DATA = [
  {
    id: 1,
    name: "Introduction to React",
    desc: "Understand React, JSX, and component-based architecture.",
    exercises: [
      { name: "Hello Component", slug: "hello-component", xp: 20, difficulty: "easy" },
      { name: "JSX Playground", slug: "jsx-playground", xp: 25, difficulty: "easy" },
      { name: "Component Mindset", slug: "component-mindset", xp: 20, difficulty: "easy" },
      { name: "Virtual DOM Intro", slug: "virtual-dom-intro", xp: 25, difficulty: "easy" }
    ]
  },
  {
    id: 2,
    name: "Components & Props",
    desc: "Build reusable components and pass data using props.",
    exercises: [
      { name: "Props Delivery", slug: "props-delivery", xp: 30, difficulty: "easy" },
      { name: "Reusable Card", slug: "reusable-card", xp: 35, difficulty: "medium" },
      { name: "Props Validation", slug: "props-validation", xp: 30, difficulty: "medium" },
      { name: "Component Composition", slug: "component-composition", xp: 40, difficulty: "medium" }
    ]
  },
  {
    id: 3,
    name: "State Management",
    desc: "Manage component state using useState.",
    exercises: [
      { name: "Counter App", slug: "counter-app", xp: 30, difficulty: "easy" },
      { name: "Toggle Power", slug: "toggle-power", xp: 35, difficulty: "medium" },
      { name: "Multiple States", slug: "multiple-states", xp: 35, difficulty: "medium" },
      { name: "State Update Rules", slug: "state-update-rules", xp: 40, difficulty: "medium" }
    ]
  },
  {
    id: 4,
    name: "Event Handling",
    desc: "Respond to user interactions in React.",
    exercises: [
      { name: "Click Commander", slug: "click-commander", xp: 30, difficulty: "easy" },
      { name: "Form Handler", slug: "form-handler", xp: 40, difficulty: "medium" },
      { name: "Keyboard Events", slug: "keyboard-events", xp: 30, difficulty: "easy" },
      { name: "Event Binding", slug: "event-binding", xp: 35, difficulty: "medium" }
    ]
  },
  {
    id: 5,
    name: "Lists & Keys",
    desc: "Render dynamic lists efficiently using keys.",
    exercises: [
      { name: "Render Army", slug: "render-army", xp: 30, difficulty: "easy" },
      { name: "Key Guardian", slug: "key-guardian", xp: 35, difficulty: "medium" },
      { name: "Map Mastery", slug: "map-mastery", xp: 30, difficulty: "easy" },
      { name: "List Optimization", slug: "list-optimization", xp: 40, difficulty: "medium" }
    ]
  },
  {
    id: 6,
    name: "Hooks Basics",
    desc: "Use useEffect and lifecycle concepts.",
    exercises: [
      { name: "Effect Tracker", slug: "effect-tracker", xp: 35, difficulty: "medium" },
      { name: "API Watcher", slug: "api-watcher", xp: 45, difficulty: "medium" },
      { name: "Cleanup Wizard", slug: "cleanup-wizard", xp: 40, difficulty: "medium" },
      { name: "Dependency Array", slug: "dependency-array", xp: 35, difficulty: "medium" }
    ]
  },
  {
    id: 7,
    name: "Conditional Rendering",
    desc: "Render UI based on conditions.",
    exercises: [
      { name: "Auth Gate", slug: "auth-gate", xp: 35, difficulty: "medium" },
      { name: "Toggle Views", slug: "toggle-views", xp: 40, difficulty: "medium" },
      { name: "Loader States", slug: "loader-states", xp: 35, difficulty: "medium" },
      { name: "Fallback UI", slug: "fallback-ui", xp: 30, difficulty: "easy" }
    ]
  },
  {
    id: 8,
    name: "React Best Practices",
    desc: "Write clean, optimized React code.",
    exercises: [
      { name: "Component Cleanup", slug: "component-cleanup", xp: 40, difficulty: "hard" },
      { name: "Optimize Renders", slug: "optimize-renders", xp: 50, difficulty: "hard" },
      { name: "Folder Structure", slug: "folder-structure", xp: 35, difficulty: "medium" },
      { name: "Anti-Patterns", slug: "anti-patterns", xp: 45, difficulty: "hard" }
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
            courseId: 1, 
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
