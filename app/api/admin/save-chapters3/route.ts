import {db} from "@/config/db"
import { CourseChaptersTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"

export const DATA = [
  {
    id: 1,
    name: "Introduction to Python",
    desc: "Learn Python syntax and basic concepts.",
    exercises: [
      { name: "Hello Python", slug: "hello-python", xp: 20, difficulty: "easy" },
      { name: "Print Power", slug: "print-power", xp: 20, difficulty: "easy" },
      { name: "Python Playground", slug: "python-playground", xp: 25, difficulty: "easy" },
      { name: "Run Your First Script", slug: "run-first-script", xp: 25, difficulty: "easy" }
    ]
  },
  {
    id: 2,
    name: "Variables & Data Types",
    desc: "Store and manipulate data in Python.",
    exercises: [
      { name: "Variable Vault", slug: "variable-vault", xp: 25, difficulty: "easy" },
      { name: "Type Identifier", slug: "type-identifier", xp: 30, difficulty: "easy" },
      { name: "Type Conversion", slug: "type-conversion", xp: 30, difficulty: "easy" },
      { name: "Dynamic Typing", slug: "dynamic-typing", xp: 35, difficulty: "medium" }
    ]
  },
  {
    id: 3,
    name: "Conditions",
    desc: "Control logic using if, else, and elif.",
    exercises: [
      { name: "Decision Maker", slug: "decision-maker", xp: 30, difficulty: "medium" },
      { name: "Grade Checker", slug: "grade-checker", xp: 35, difficulty: "medium" },
      { name: "Nested Decisions", slug: "nested-decisions", xp: 35, difficulty: "medium" },
      { name: "Logical Operators", slug: "logical-operators", xp: 30, difficulty: "easy" }
    ]
  },
  {
    id: 4,
    name: "Loops",
    desc: "Repeat tasks efficiently using loops.",
    exercises: [
      { name: "Loop Runner", slug: "loop-runner", xp: 30, difficulty: "easy" },
      { name: "Pattern Printer", slug: "pattern-printer", xp: 40, difficulty: "medium" },
      { name: "While Wizard", slug: "while-wizard", xp: 35, difficulty: "medium" },
      { name: "Break & Continue", slug: "break-and-continue", xp: 30, difficulty: "easy" }
    ]
  },
  {
    id: 5,
    name: "Functions",
    desc: "Create reusable blocks of code.",
    exercises: [
      { name: "Function Forge", slug: "function-forge", xp: 30, difficulty: "easy" },
      { name: "Return Master", slug: "return-master", xp: 40, difficulty: "medium" },
      { name: "Arguments Arena", slug: "arguments-arena", xp: 35, difficulty: "medium" },
      { name: "Default Parameters", slug: "default-parameters", xp: 30, difficulty: "easy" }
    ]
  },
  {
    id: 6,
    name: "Lists & Tuples",
    desc: "Store multiple values in collections.",
    exercises: [
      { name: "List Warrior", slug: "list-warrior", xp: 30, difficulty: "easy" },
      { name: "Tuple Guard", slug: "tuple-guard", xp: 35, difficulty: "medium" },
      { name: "List Slicing", slug: "list-slicing", xp: 30, difficulty: "easy" },
      { name: "Mutable vs Immutable", slug: "mutable-vs-immutable", xp: 40, difficulty: "medium" }
    ]
  },
  {
    id: 7,
    name: "Dictionaries",
    desc: "Work with key-value data structures.",
    exercises: [
      { name: "Dict Builder", slug: "dict-builder", xp: 35, difficulty: "medium" },
      { name: "Data Lookup", slug: "data-lookup", xp: 40, difficulty: "medium" },
      { name: "Looping Dictionaries", slug: "looping-dictionaries", xp: 35, difficulty: "medium" },
      { name: "Nested Dictionaries", slug: "nested-dictionaries", xp: 45, difficulty: "hard" }
    ]
  },
  {
    id: 8,
    name: "Python Best Practices",
    desc: "Write clean, readable, and efficient Python code.",
    exercises: [
      { name: "Refactor Script", slug: "refactor-script", xp: 45, difficulty: "hard" },
      { name: "Bug Hunter", slug: "bug-hunter", xp: 50, difficulty: "hard" },
      { name: "PEP8 Formatter", slug: "pep8-formatter", xp: 35, difficulty: "medium" },
      { name: "Optimize Logic", slug: "optimize-logic", xp: 45, difficulty: "hard" }
    ]
  }
];
export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(CourseChaptersTable).values({
            courseId: 4, 
            desc: item?.desc,
            exercises: item.exercises,
            name: item?.name,
            chapterId: item?.id
        })
    })
    return NextResponse.json('Success')
}
