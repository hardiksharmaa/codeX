import { ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import {db} from "@/config/db"
import { auth } from "@clerk/nextjs/server";

const DATA = [

  {
    courseId: 4,
    chapterId: 1,
    exerciseId: "hello-python",
    exerciseName: "Hello Python",
    exercisesContent: {
      content: `
      <div>
        <p>Python is a beginner-friendly yet powerful programming language.</p>
        <p>Your journey starts with writing your very first Python statement.</p>
        <p>The <code>print()</code> function is used to display output on the screen.</p>
      </div>
      `,
      task: `
      <div>
        <p>Use <code>print()</code> to display the text <strong>Hello, Python!</strong></p>
      </div>
      `,
      hint: `
      <div>
        <p>Syntax: <code>print("Hello, Python!")</code></p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `print\$begin:math:text$\[\"\'\]Hello\, Python\!\[\"\'\]\\$end:math:text$`,
      output: `Hello, Python!`,
      hintXp: 20
    }
  },

  {
    courseId: 4,
    chapterId: 1,
    exerciseId: "print-power",
    exerciseName: "Print Power",
    exercisesContent: {
      content: `
      <div>
        <p>The <code>print()</code> function can display text, numbers, and variables.</p>
        <p>You can print multiple values at once.</p>
      </div>
      `,
      task: `
      <div>
        <p>Print your name and age in a single <code>print()</code> statement.</p>
      </div>
      `,
      hint: `
      <div>
        <p>You can separate values using commas inside <code>print()</code>.</p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `print\$begin:math:text$\.\*\?\,\.\*\?\\$end:math:text$`,
      output: `Name Age`,
      hintXp: 20
    }
  },

  {
    courseId: 4,
    chapterId: 1,
    exerciseId: "python-playground",
    exerciseName: "Python Playground",
    exercisesContent: {
      content: `
      <div>
        <p>Python allows you to experiment freely with expressions.</p>
        <p>You can perform calculations directly.</p>
      </div>
      `,
      task: `
      <div>
        <p>Print the result of <strong>5 + 10</strong>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Try <code>print(5 + 10)</code></p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `print\$begin:math:text$\\\\s\*5\\\\s\*\\\\\+\\\\s\*10\\\\s\*\\$end:math:text$`,
      output: `15`,
      hintXp: 25
    }
  },

  {
    courseId: 4,
    chapterId: 1,
    exerciseId: "run-first-script",
    exerciseName: "Run Your First Script",
    exercisesContent: {
      content: `
      <div>
        <p>A Python script is a file containing Python code.</p>
        <p>Running scripts helps automate tasks.</p>
      </div>
      `,
      task: `
      <div>
        <p>Write a script that prints <strong>Python is running!</strong></p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>print()</code> inside your script.</p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `print\$begin:math:text$\[\"\'\]Python is running\!\[\"\'\]\\$end:math:text$`,
      output: `Python is running!`,
      hintXp: 25
    }
  },

  {
    courseId: 4,
    chapterId: 2,
    exerciseId: "variable-vault",
    exerciseName: "Variable Vault",
    exercisesContent: {
      content: `
      <div>
        <p>Variables store data for later use.</p>
        <p>Python variables do not need explicit type declarations.</p>
      </div>
      `,
      task: `
      <div>
        <p>Create a variable <code>x</code> with value <strong>10</strong> and print it.</p>
      </div>
      `,
      hint: `
      <div>
        <p><code>x = 10</code> then <code>print(x)</code></p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `x\\s*=\\s*10[\\s\\S]*print\$begin:math:text$x\\$end:math:text$`,
      output: `10`,
      hintXp: 25
    }
  },

  {
    courseId: 4,
    chapterId: 2,
    exerciseId: "type-identifier",
    exerciseName: "Type Identifier",
    exercisesContent: {
      content: `
      <div>
        <p>Python provides the <code>type()</code> function.</p>
        <p>It helps identify the data type of a variable.</p>
      </div>
      `,
      task: `
      <div>
        <p>Create a variable with any value and print its type.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>print(type(variable))</code></p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `type\\(`,
      output: `Data type printed`,
      hintXp: 30
    }
  },

  {
    courseId: 4,
    chapterId: 2,
    exerciseId: "type-conversion",
    exerciseName: "Type Conversion",
    exercisesContent: {
      content: `
      <div>
        <p>Python allows conversion between data types.</p>
        <p>This is useful when working with user input.</p>
      </div>
      `,
      task: `
      <div>
        <p>Convert the string <strong>"10"</strong> into an integer and print it.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>int("10")</code></p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `int\\(["']10["']\\)`,
      output: `10`,
      hintXp: 30
    }
  },

  {
    courseId: 4,
    chapterId: 2,
    exerciseId: "dynamic-typing",
    exerciseName: "Dynamic Typing",
    exercisesContent: {
      content: `
      <div>
        <p>Python is dynamically typed.</p>
        <p>The same variable can hold different data types.</p>
      </div>
      `,
      task: `
      <div>
        <p>Assign a number to a variable, then reassign a string to it and print both.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Reuse the same variable name with different values.</p>
      </div>
      `,
      starterCode: {
        "/main.py": ``
      },
      regex: `=.*\\n.*=.*`,
      output: `Variable reassigned`,
      hintXp: 35
    }
  }
];


export async function GET(req: NextRequest) {
  try {

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const values = DATA.map((item) => ({
      courseId: item.courseId,
      chapterId: item.chapterId,
      exerciseId: item.exerciseId,
      exerciseName: item.exerciseName,
      exercisesContent: item.exercisesContent,
    }));

    await db
      .insert(ExerciseTable)
      .values(values)
      .onConflictDoNothing();

    return NextResponse.json(
      { success: true, inserted: values.length },
      { status: 201 }
    );

  } catch (error) {
    console.error("Exercise seed error:", error);
    return NextResponse.json(
      { error: "Failed to insert exercises" },
      { status: 500 }
    );
  }
}
