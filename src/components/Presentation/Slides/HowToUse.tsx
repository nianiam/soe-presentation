"use client";

import { Fragment } from "@/components/Reveal/Fragment";
import { Slide } from "@/components/Reveal/Slide";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useSlides } from "@/hooks/useSlides";

const fragments = [
  '    <p className="fragment">Hi i\'m a paragraph fragment</p>',
  `    <ol className="fragment">
      <li>I'm not a fragment</li>`,
  `      <li className="fragment" data-fragment-name="name-example">
         I'm a fragment and have a name
      </li>`,
  `      <li className="fragment" data-fragment-name="janky-backwards">
         Janky backwards behaviour
      </li>`,
];

export const HowToUse = () => {
  const { x, y, fragment } = useSlides();

  const extraLines = fragments.slice(
    0,
    fragment.index < 0 ? 0 : fragment.index + 1,
  );

  return (
    <Slide above data-transition="fade">
      {y >= 1 && (
        <div className="absolute top-10 left-10 text-4xl border border-green-300 rounded-lg w-[200px] text-center z-50">
          <div className="px-10 py-5 border-b border-green-300 bg-green-600/10">
            Slide State
          </div>
          <div className="grid grid-cols-2 border-b border-green-300 text-5xl">
            <div className="p-5 border-r border-green-300 text-center">
              <span>X: </span>
              {x}
            </div>
            <div className="p-5 text-center">
              <span>Y: </span>
              {y}
            </div>
          </div>
          <div className="px-10 py-5 bg-green-600/10">
            <span>Fragment</span>
          </div>
          <div className="p-5 text-center">{fragment.index ?? "N/A"}</div>
          {fragment.name && (
            <div className="p-5 text-center">{fragment.name}</div>
          )}
          {fragment.name && (
            <div className="p-5 text-center">
              isShowing: {fragment.isShowing ? "true" : "false"}
            </div>
          )}
        </div>
      )}
      <Slide data-transition="fade" className="p-20">
        <h1>How to use reveal</h1>
        <div className="grid grid-cols-3 py-30 justify-items-center h-3/4 w-3/4 mx-auto">
          <div className="p-10 fragment">
            <h3 className="text-yellow-300">Horizontal slide</h3>
            <CodeBlock
              language="tsx"
              customStyle={{
                height: "calc(100%-2rem)",
              }}
              codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
            >
              {`<section>
  Slide content!
</section>`}
            </CodeBlock>
          </div>
          <div className="p-10 fragment">
            <h3 className="text-yellow-300">Vertical slide</h3>
            <CodeBlock
              language="tsx"
              customStyle={{
                height: "calc(100%-2rem)",
              }}
              codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
            >
              {`<section>
  <section>
    Top Slide content!
  </section>
  <section>
    Bottom Slide content!
  </section>
</section>`}
            </CodeBlock>
          </div>
          <div className="p-10 fragment" data-fragment-name="fragments">
            <h3 className="text-yellow-300">Fragments</h3>
            <CodeBlock
              language="tsx"
              customStyle={{
                height: "calc(100%-2rem)",
              }}
              codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
              lineProps={(n) => {
                if (n === 2) {
                  return {
                    className:
                      "bg-yellow-300 text-gray-600 [&>span]:text-gray-600",
                  };
                }

                return {};
              }}
            >
              {`<section>
  <div className="fragment">
    <h1>Fragments</h1>
    <CodeBlock>
    ...
    </CodeBlock>
  </div>
</section>`}
            </CodeBlock>
          </div>
        </div>
      </Slide>
      <Slide data-transition="slide" className="p-20">
        <h1>Slide State</h1>
        <div className="w-[80%] mx-auto flex gap-10">
          <CodeBlock
            language="tsx"
            customStyle={{
              fontSize: "1.5rem",
              height: "100%",
            }}
            codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
            lineProps={(n) => {
              if (fragment.index === 0 && !(n === 10)) {
                return {
                  className: "text-gray-600 [&>span]:text-gray-600",
                };
              }

              if (fragment.index === 1 && !(n >= 11 && n <= 13)) {
                return {
                  className: "text-gray-600 [&>span]:text-gray-600",
                };
              }

              if (fragment.index === 2 && !(n >= 13 && n <= 15)) {
                return {
                  className: "text-gray-600 [&>span]:text-gray-600",
                };
              }

              if (fragment.index === 3 && !(n >= 16 && n <= 18)) {
                return {
                  className: "text-gray-600 [&>span]:text-gray-600",
                };
              }

              return {};
            }}
          >
            {`<section>
  <section>
  ...Top Slide content
  </section>
  <section>
    <h1>Slide State</h1>
    <CodeBlock>
    ...
    </CodeBlock>${extraLines.length > 0 ? "\n" : ""}${extraLines.join("\n")}${fragment.index > 0 ? "\n    </ol>" : ""}
  </section>
</section>`}
          </CodeBlock>
          <div className="text-5xl">
            <p className="fragment py-10">Hi i'm a paragraph fragment</p>
            <ol className="fragment [&>li]:py-4">
              <li>
                I'm <span className="font-bold underline">not</span> a fragment!
                (but my parent is)
              </li>
              <li className="fragment" data-fragment-name="name-example">
                I'm a fragment <span className="font-bold underline">and</span>{" "}
                have a name
              </li>
              <li className="fragment" data-fragment-name="janky-backwards">
                Janky backwards behaviour
                <ul>
                  <li className="py-4 text-4xl">
                    Use{" "}
                    <pre className="inline text-orange-600 bg-gray-800 p-2 rounded-lg">
                      isShowing
                    </pre>{" "}
                    to check if you're going backwards or forwards
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </Slide>
      <Slide data-transition="slide" className="p-20">
        <h1>Hidden Fragments</h1>
        <div className="w-1/2 mx-auto">
          <CodeBlock
            language="tsx"
            customStyle={{
              height: "calc(100%-2rem)",
            }}
            codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
            lineProps={(n) => {
              if (fragment.index === 0 && !(n === 5)) {
                return {
                  className: "text-gray-600 [&>span]:text-gray-600",
                };
              }

              if (fragment.index === 1 && !(n === 6)) {
                return {
                  className: "text-gray-600 [&>span]:text-gray-600",
                };
              }

              if (fragment.index === 2 && !(n === 7)) {
                return {
                  className: "text-gray-600 [&>span]:text-gray-600",
                };
              }
              return {};
            }}
          >
            {`<section>
    <CodeBlock>
    ...
    </CodeBlock>${
      y === 2 && fragment.index >= 0
        ? `\n  <div className="fragment hidden" /> // <-- Tailwind`
        : ""
    }${
      y === 2 && fragment.index >= 1
        ? "\n  <div className='fragment' style={{ display: 'hidden' }} />"
        : ""
    }${
      y === 2 && fragment.index >= 2
        ? '\n  <Fragment hidden name="hidden-fragment" />'
        : ""
    }
</section>`}
          </CodeBlock>
          <div className="fragment hidden" />
          <div className="fragment" style={{ display: "hidden" }} />
          <Fragment hidden name="hidden-fragment" />
          <p className="fragment py-10">
            Useful for co-ordinating your own React state with slide position!
          </p>
        </div>
      </Slide>
    </Slide>
  );
};
