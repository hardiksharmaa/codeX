import { ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import {db} from "@/config/db"
import { auth } from "@clerk/nextjs/server";

const DATA = [

  {
    courseId: 3,
    chapterId: 1,
    exerciseId: "style-the-page",
    exerciseName: "Style the Page",
    exercisesContent: {
      content: `
      <div style="line-height:1.6">
        <p>CSS gives life to plain HTML. Without CSS, every page looks dull and unstyled.</p>
        <p>In this exercise, you will apply basic styles to change text color, font, and background.</p>
        <p>CSS rules consist of <strong>selectors</strong> and <strong>declarations</strong>.</p>
        <p>Each declaration contains a property and a value.</p>
        <p>This is your first step toward designing beautiful web pages.</p>
      </div>
      `,
      task: `
      <div>
        <p>Add CSS to make the <code>body</code> background color <strong>#111</strong>
        and text color <strong>white</strong>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>body { background-color: #111; color: white; }</code></p>
      </div>
      `,
      starterCode: {
        "/style.css": `body {\n\n}`
      },
      regex: "background-color:\\s*#111[\\s\\S]*color:\\s*white",
      output: "Background dark with white text",
      hintXp: 20
    }
  },

  {
    courseId: 3,
    chapterId: 1,
    exerciseId: "css-power-up",
    exerciseName: "CSS Power-Up",
    exercisesContent: {
      content: `
      <div>
        <p>CSS allows you to enhance readability and layout.</p>
        <p>Font size, spacing, and alignment can drastically improve user experience.</p>
      </div>
      `,
      task: `
      <div>
        <p>Set paragraph font size to <strong>18px</strong> and line-height to <strong>1.8</strong>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Target <code>p</code> and set <code>font-size</code> and <code>line-height</code>.</p>
      </div>
      `,
      starterCode: {
        "/style.css": `p {\n\n}`
      },
      regex: "font-size:\\s*18px[\\s\\S]*line-height:\\s*1.8",
      output: "Readable paragraph text",
      hintXp: 25
    }
  },

  {
    courseId: 3,
    chapterId: 1,
    exerciseId: "inline-vs-external",
    exerciseName: "Inline vs External",
    exercisesContent: {
      content: `
      <div>
        <p>CSS can be written inline, internally, or externally.</p>
        <p>External CSS is the most scalable and professional approach.</p>
      </div>
      `,
      task: `
      <div>
        <p>Move inline styles into an external CSS rule for <code>h1</code>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Create a CSS rule for <code>h1</code> instead of inline styles.</p>
      </div>
      `,
      starterCode: {
        "/style.css": `h1 {\n\n}`
      },
      regex: "h1\\s*\\{",
      output: "External CSS rule created",
      hintXp: 20
    }
  },

  {
    courseId: 3,
    chapterId: 1,
    exerciseId: "css-file-linking",
    exerciseName: "CSS File Linking",
    exercisesContent: {
      content: `
      <div>
        <p>CSS files must be linked correctly for styles to apply.</p>
        <p>The <code>&lt;link&gt;</code> tag is placed inside the <code>&lt;head&gt;</code>.</p>
      </div>
      `,
      task: `
      <div>
        <p>Link <code>style.css</code> to your HTML file.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>.</p>
      </div>
      `,
      starterCode: {
        "/index.html": `<head>\n\n</head>`
      },
      regex: "<link[^>]*stylesheet[^>]*style.css",
      output: "CSS file linked",
      hintXp: 25
    }
  },

  {
    courseId: 3,
    chapterId: 2,
    exerciseId: "class-hunter",
    exerciseName: "Class Hunter",
    exercisesContent: {
      content: `
      <div>
        <p>Classes allow styling multiple elements efficiently.</p>
      </div>
      `,
      task: `
      <div>
        <p>Style elements with class <code>.card</code> to have padding <strong>16px</strong>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>.card { padding: 16px; }</code></p>
      </div>
      `,
      starterCode: {
        "/style.css": `.card {\n\n}`
      },
      regex: "\\.card[\\s\\S]*padding:\\s*16px",
      output: "Card padding applied",
      hintXp: 25
    }
  },

  {
    courseId: 3,
    chapterId: 2,
    exerciseId: "id-boss-fight",
    exerciseName: "ID Boss Fight",
    exercisesContent: {
      content: `
      <div>
        <p>ID selectors are powerful and override class styles.</p>
      </div>
      `,
      task: `
      <div>
        <p>Style <code>#main</code> to have background <strong>#222</strong>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>#main { background-color: #222; }</code></p>
      </div>
      `,
      starterCode: {
        "/style.css": `#main {\n\n}`
      },
      regex: "#main[\\s\\S]*#222",
      output: "ID style applied",
      hintXp: 30
    }
  },

  {
    courseId: 3,
    chapterId: 2,
    exerciseId: "specificity-battle",
    exerciseName: "Specificity Battle",
    exercisesContent: {
      content: `
      <div>
        <p>When multiple rules apply, CSS uses specificity to decide.</p>
      </div>
      `,
      task: `
      <div>
        <p>Override a class style using an ID selector.</p>
      </div>
      `,
      hint: `
      <div>
        <p>ID selectors have higher specificity than classes.</p>
      </div>
      `,
      starterCode: {
        "/style.css": `.box {}\n#box {}`
      },
      regex: "#box",
      output: "Specificity override successful",
      hintXp: 35
    }
  },

  {
    courseId: 3,
    chapterId: 2,
    exerciseId: "selector-combo",
    exerciseName: "Selector Combo",
    exercisesContent: {
      content: `
      <div>
        <p>Combining selectors allows precise targeting.</p>
      </div>
      `,
      task: `
      <div>
        <p>Style <code>div p</code> to color <strong>lightblue</strong>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use a descendant selector.</p>
      </div>
      `,
      starterCode: {
        "/style.css": `div p {\n\n}`
      },
      regex: "div\\s+p",
      output: "Combined selector applied",
      hintXp: 30
    }
  },

  {
    courseId: 3,
    chapterId: 2,
    exerciseId: "override-the-styles",
    exerciseName: "Override the Styles",
    exercisesContent: {
      content: `
      <div>
        <p>Sometimes styles must be forcefully overridden.</p>
      </div>
      `,
      task: `
      <div>
        <p>Override color using <code>!important</code>.</p>
      </div>
      `,
      hint: `
      <div>
        <p>Use <code>color: red !important;</code></p>
      </div>
      `,
      starterCode: {
        "/style.css": `.text {\n\n}`
      },
      regex: "!important",
      output: "Style overridden",
      hintXp: 40
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
