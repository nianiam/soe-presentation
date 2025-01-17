"use client";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Fragment } from "@/components/Reveal/Fragment";
import { Slide } from "@/components/Reveal/Slide";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useSlides } from "@/hooks/useSlides";

const text = {
  component1: `export const Example = ({ children }: { children: React.ReactNode }) => {
  return (
    <>{children}</>
  )
}`,
  component2: `export const Example = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <>{children}</>
  )
}`,
  component3: `// Create a context
const CountContext = createContext(0);

export const Example = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    // "Provide" the value to any child
    <CountContext.Provider value={count}>{children}</CountContext.Provider>
  )
}`,
  component4: `// Create a context
const CountContext = createContext(0);

export const Example = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    // "Provide" the value to any child
    <CountContext.Provider value={count}>{children}</CountContext.Provider>
  )
}`,
  component5: `// Create a context
const CountContext = createContext(0);

export const Example = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    // "Provide" the value to any child
    <CountContext.Provider value={count}>{children}</CountContext.Provider>
  )
}`,
  component6: `// Create a context
const CountContext = createContext(0);

export const Example = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    // "Provide" the value to any child
    <CountContext.Provider value={count}>{children}</CountContext.Provider>
  )
}`,
  component7: `// Create a context
const CountContext = createContext(0);

export const Example = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    // "Provide" the value to any child
    <CountContext.Provider value={count}>{children}</CountContext.Provider>
  )
}`,
} as Record<string, string>;

const consumer = {
  component1: `import { Example } from ".";

export const Consumer = () => {
  return (
    <Example>
      Hello World
    </Example>
  ) 
}`,
  component2: `import { Example } from ".";

export const Consumer = () => {
  return (
    <Example>
      <WantsToCount /> // <-- Can't access count
      Hello World
    </Example>
  ) 
}`,
  component3: `import { Example } from ".";

export const Consumer = () => {
  return (
    <Example>
      <WantsToCount />
      Hello World
    </Example>
  ) 
}`,
  component4: `import { Example } from ".";

export const Consumer = () => {
  return (
    <Application>
      <Feature1>
        <Example>
          <WantsToCount />
          Hello World
        </Example>
      </Feature1>
      <Feature2>
        <AlsoWantsToCount /> // <-- But can't count :(
      </Feature2>
    </Application>
  )
}`,
  component5: `import { Example } from ".";

export const Consumer = () => {
  return (
    <Application>
      <Example>
        <Feature1>
          <WantsToCount />
          Hello World
        </Feature1>
        <Feature2>
          <AlsoWantsToCount /> // <-- Yay, can count!
        </Feature2>
      </Example>
    </Application>
  )
}`,
  component6: `import { Example } from ".";

export const Consumer = () => {
  return (
    <Application>
      <Example>
        <Feature1> // <-- Can have feature 1 specific context
          <WantsToCount />
          Hello World
        </Feature1>
        <Feature2>
          <AlsoWantsToCount /> // <-- Yay, can count!
        </Feature2>
      </Example>
    </Application>
  )
}`,
  component7: `import { Example } from ".";

export const Consumer = () => {
  return (
    <Application>
      <Example>
        <Feature1>
          <WantsToCount />
          Hello World
        </Feature1>
        <Feature2>
          <AlsoWantsToCount />
          <DoesntWantsToCount /> // <-- Renders on count...
        </Feature2>
      </Example>
    </Application>
  )
}`,
} as Record<string, string>;

const wantsToCount = `import { useContext } from "react";
import { CountContext } from ".";

export const WantsToCount = () => {
  const count = useContext(CountContext);

  return (
    <div>
      <h1>I love counting!</h1>
      <p>Count: {count}</p>
    </div>
  )
}`;

export const FeatureIsolationSlide = () => {
  const { fragment, x } = useSlides();
  const defaultName = "component1";
  const fragmentName = fragment.name ? fragment.name : defaultName;

  return (
    <Slide above data-transition="fade" className="p-20">
      <h1>Feature Isolation</h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-20 h-full">
        <div className="p-10">
          <h2 className="text-yellow-300">Component Composition</h2>
          <CodeBlock
            language="tsx"
            style={oneDark}
            showLineNumbers
            customStyle={{
              height: "calc(100%-2rem)",
            }}
            codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
          >
            {text[fragmentName]}
          </CodeBlock>
          <Fragment hidden name="component2" />
          <Fragment hidden name="component2" />
          <Fragment hidden name="component3" />
          <Fragment hidden name="component3" />
          <Fragment hidden name="component4" />
          <Fragment hidden name="component5" />
        </div>
        <div className="p-10">
          <h2 className="text-yellow-300">Component Use</h2>
          <div className="space-y-10">
            <CodeBlock
              language="tsx"
              style={oneDark}
              showLineNumbers
              customStyle={{
                height: "calc(100%-2rem)",
              }}
              codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
              lineProps={(n) => {
                const isLine =
                  n === 5 ||
                  (n > 6 && n < 12) ||
                  (n > 12 && n < 14) ||
                  n === 15;

                if (
                  isLine &&
                  fragment.name === "component5" &&
                  fragment.isShowing
                ) {
                  return {
                    className: "text-gray-600 [&>span]:text-gray-600",
                  };
                }

                const isRippedOutLine = n >= 11 && n <= 13;
                if (
                  isRippedOutLine &&
                  fragment.index === 6 &&
                  fragment.isShowing
                ) {
                  return {
                    className: "text-gray-600 [&>span]:text-gray-600",
                  };
                }

                const isDoesntWantsToCountLine = n === 13;
                if (
                  isDoesntWantsToCountLine &&
                  fragment.index === 7 &&
                  fragment.isShowing
                ) {
                  return {
                    className:
                      "bg-yellow-300 text-gray-600 [&>span]:text-gray-600",
                  };
                }

                const isExampleComponent = n === 6 || n === 15;
                if (
                  isExampleComponent &&
                  fragment.index === 8 &&
                  fragment.isShowing
                ) {
                  return {
                    className:
                      "bg-yellow-300 text-gray-600 [&>span]:text-gray-600",
                  };
                }

                return {};
              }}
              wrapLines
            >
              {consumer[fragmentName]}
            </CodeBlock>
            {x == 0 && fragment.index === 3 && (
              <CodeBlock
                language="tsx"
                style={oneDark}
                showLineNumbers
                customStyle={{
                  height: "calc(100%-2rem)",
                }}
                codeTagProps={{ className: "max-h-[calc(100%-2rem)]" }}
                lineProps={(n) => {
                  const isLine = n === 5;

                  if (isLine) {
                    return {
                      className: "bg-yellow-300/80 [&>span]:text-gray-800",
                    };
                  }

                  return {};
                }}
                wrapLines
              >
                {wantsToCount}
              </CodeBlock>
            )}
            <Fragment name="component6" />
            <Fragment name="component7" className="text-left">
              <p>Footguns with React context:</p>
              <ol>
                <li>Renders whole tree below the context provider</li>
                <li className="fragment" data-fragment-name="component7">
                  Has a component in the tree to maintain
                </li>
              </ol>
              <p
                className="fragment text-red-500"
                data-fragment-name="component7"
              >
                At this point, consider global state management!
                <span className="block">(Jotai, Zustand etc...)</span>
              </p>
            </Fragment>
          </div>
        </div>
      </div>
    </Slide>
  );
};
