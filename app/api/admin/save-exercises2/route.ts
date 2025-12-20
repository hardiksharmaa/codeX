import { ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import {db} from "@/config/db"
import { auth } from "@clerk/nextjs/server";

const DATA = [
  {
    courseId: 1,
    exerciseId: "hello-component",
    exerciseName: "Hello Component",
    chapterId: 1,
    exercisesContent: {
      content: "<div style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p>Welcome to React! Your first step is creating a simple React component.</p><p>React applications are built using <strong>components</strong>, which are reusable pieces of UI.</p><p>A component is usually a JavaScript function that returns JSX.</p><p>JSX looks like HTML but runs inside JavaScript.</p><p>This exercise helps you build your very first React component.</p></div>",
      task: "<div><p>Create a React functional component named <code>Hello</code> that returns a heading with the text <strong>Hello React</strong>.</p></div>",
      hint: "<div><p>Use <code>function Hello() { return &lt;h1&gt;Hello React&lt;/h1&gt;; }</code></p></div>",
      starterCode: {
        "/App.jsx": "export default function App() {\n  return (\n    <div>\n    </div>\n  );\n}"
      },
      regex: "<h1>\\s*Hello React\\s*</h1>",
      output: "<h1>Hello React</h1>",
      hintXp: 20
    }
  },

  {
    courseId: 1,
    exerciseId: "jsx-playground",
    exerciseName: "JSX Playground",
    chapterId: 1,
    exercisesContent: {
      content: "<div style='font-family:Arial,sans-serif;padding:20px;'><p>JSX allows you to write HTML-like syntax inside JavaScript.</p><p>Behind the scenes, JSX gets transformed into JavaScript function calls.</p><p>You can embed JavaScript expressions using curly braces <code>{ }</code>.</p></div>",
      task: "<div><p>Inside the component, render a paragraph that shows the result of <strong>5 + 5</strong> using JSX.</p></div>",
      hint: "<div><p>Use <code>{5 + 5}</code> inside JSX.</p></div>",
      starterCode: {
        "/App.jsx": "export default function App() {\n  return (\n    <div>\n    </div>\n  );\n}"
      },
      regex: "<p>\\s*10\\s*</p>",
      output: "<p>10</p>",
      hintXp: 25
    }
  },

  {
    courseId: 1,
    exerciseId: "component-mindset",
    exerciseName: "Component Mindset",
    chapterId: 1,
    exercisesContent: {
      content: "<div style='padding:20px;'><p>React encourages thinking in components.</p><p>Each UI piece should be isolated and reusable.</p><p>Small components make apps easier to maintain.</p></div>",
      task: "<div><p>Create a component named <code>Header</code> that returns an <code>&lt;h2&gt;</code> with text <strong>Welcome</strong>.</p></div>",
      hint: "<div><p>Create a function named <code>Header</code> and return JSX.</p></div>",
      starterCode: {
        "/Header.jsx": "export default function Header() {\n  return (\n    <div>\n    </div>\n  );\n}"
      },
      regex: "<h2>\\s*Welcome\\s*</h2>",
      output: "<h2>Welcome</h2>",
      hintXp: 20
    }
  },

  {
    courseId: 1,
    exerciseId: "virtual-dom-intro",
    exerciseName: "Virtual DOM Intro",
    chapterId: 1,
    exercisesContent: {
      content: "<div style='padding:20px;'><p>React uses a Virtual DOM to efficiently update the UI.</p><p>It compares changes and updates only what is necessary.</p></div>",
      task: "<div><p>Render a paragraph explaining Virtual DOM with text <strong>Virtual DOM improves performance</strong>.</p></div>",
      hint: "<div><p>Use a <code>&lt;p&gt;</code> tag.</p></div>",
      starterCode: {
        "/App.jsx": "export default function App() {\n  return (\n    <div>\n    </div>\n  );\n}"
      },
      regex: "<p>\\s*Virtual DOM improves performance\\s*</p>",
      output: "<p>Virtual DOM improves performance</p>",
      hintXp: 25
    }
  },
  {
    courseId: 1,
    exerciseId: "props-delivery",
    exerciseName: "Props Delivery",
    chapterId: 2,
    exercisesContent: {
      content: "<div style='padding:20px;'><p>Props allow components to receive data.</p><p>They make components dynamic and reusable.</p></div>",
      task: "<div><p>Create a component that displays <strong>Hello, John</strong> using props.</p></div>",
      hint: "<div><p>Access props like <code>props.name</code>.</p></div>",
      starterCode: {
        "/Greeting.jsx": "export default function Greeting(props) {\n  return (\n    <div>\n    </div>\n  );\n}"
      },
      regex: "Hello,\\s*John",
      output: "Hello, John",
      hintXp: 30
    }
  },

  {
    courseId: 1,
    exerciseId: "reusable-card",
    exerciseName: "Reusable Card",
    chapterId: 2,
    exercisesContent: {
      content: "<div style='padding:20px;'><p>Reusable components save time and reduce duplication.</p></div>",
      task: "<div><p>Create a Card component that accepts <strong>title</strong> as a prop and displays it inside an <code>&lt;h3&gt;</code>.</p></div>",
      hint: "<div><p>Use <code>{props.title}</code>.</p></div>",
      starterCode: {
        "/Card.jsx": "export default function Card(props) {\n  return (\n    <div>\n    </div>\n  );\n}"
      },
      regex: "<h3>.*</h3>",
      output: "<h3>Card Title</h3>",
      hintXp: 35
    }
  },

  {
    courseId: 1,
    exerciseId: "props-validation",
    exerciseName: "Props Validation",
    chapterId: 2,
    exercisesContent: {
      content: "<div style='padding:20px;'><p>PropTypes help catch bugs by validating props.</p></div>",
      task: "<div><p>Add PropTypes validation for a <strong>name</strong> prop.</p></div>",
      hint: "<div><p>Use <code>Component.propTypes</code>.</p></div>",
      starterCode: {
        "/Profile.jsx": "import PropTypes from 'prop-types';\n\nexport default function Profile(props) {\n  return <p>{props.name}</p>;\n}\n"
      },
      regex: "PropTypes\\.string",
      output: "PropTypes.string",
      hintXp: 30
    }
  },

  {
    courseId: 1,
    exerciseId: "component-composition",
    exerciseName: "Component Composition",
    chapterId: 2,
    exercisesContent: {
      content: "<div style='padding:20px;'><p>Components can be composed together to build complex UIs.</p></div>",
      task: "<div><p>Render a <strong>Header</strong> component inside <strong>App</strong>.</p></div>",
      hint: "<div><p>Use <code>&lt;Header /&gt;</code>.</p></div>",
      starterCode: {
        "/App.jsx": "import Header from './Header';\n\nexport default function App() {\n  return (\n    <div>\n    </div>\n  );\n}"
      },
      regex: "<Header\\s*/>",
      output: "<Header />",
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
