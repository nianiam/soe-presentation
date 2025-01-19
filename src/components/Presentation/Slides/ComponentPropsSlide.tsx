"use client";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Slide } from "@/components/Reveal/Slide";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useSlides } from "@/hooks/useSlides";

export const ComponentPropsSlide = () => {
  const { fragment } = useSlides();

  return (
    <Slide above data-transition="fade" className="p-20">
      <h1>Feature Isolation</h1>
      <div className="grid grid-cols-2 gap-10 h-full">
        <div className="p-10">
          <h2 className="text-yellow-300">Component Model</h2>
          <CodeBlock
            language="tsx"
            style={oneDark}
            showLineNumbers
            customStyle={{
              height: "calc(100%-2rem)",
            }}
            codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
            lineProps={(n) => {
              if (
                fragment.index === 2 &&
                fragment.isShowing &&
                (n === 2 || n === 3 || n === 8)
              ) {
                return {
                  className:
                    "bg-yellow-300 text-gray-700 [&>span]:text-gray-700",
                };
              }

              if (
                fragment.index === 3 &&
                fragment.isShowing &&
                (n === 1 || n === 9 || n === 10)
              ) {
                return {
                  className:
                    "bg-yellow-300 text-gray-700 [&>span]:text-gray-700",
                };
              }

              return {};
            }}
          >
            {`const MyAwesomeComponent = () => {
  const [state1, setState1] = useState<Type1>(...);
  const [state2, setState2] = useState<Type2>(...);

  // Some other code

  return (
    <div className="flex">
      <ChildComponent1 state={state1} />
      <ChildComponent2 state={state2} />
    </div>
  )
}`}
          </CodeBlock>
          <div className="text-left p-10 fragment text-5xl">
            <ol className="[&>li]:py-2">
              <li>Fundamental principle of react</li>
              <li>Business logic can be used to inform UI state</li>
              <li>
                Passing state as "props" to other components allows for
                component re-use
              </li>
            </ol>
          </div>
        </div>
        <div className="p-10 text-left fragment">
          <h2 className="text-yellow-300">Fundamental, But...</h2>
          <ol className="[&>li]:py-4 px-10 max-w-[700px] text-5xl">
            <li className="fragment">
              Easy to{" "}
              <span className="italic text-red-500">
                <span className="font-bold underline">unintentionally</span>{" "}
                link business logic with UI state
              </span>
              <ul className="py-6 [&>li]:py-2 text-5xl">
                <li>state1 and state2 "come with" this flex box</li>
                <li>Arguably separate</li>
                <li>
                  Can be sometimes be tricky to de-couple the two as complexity
                  grows
                </li>
              </ul>
            </li>
            <li className="fragment">
              Locks in a component hierarchy
              <ul className="py-6 [&>li]:py-2 text-5xl">
                <li>
                  Children must be defined inside the{" "}
                  <span className="bold underline">file</span> of the parent to
                  consume that state
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </Slide>
  );
};
