import { Fragment } from "@/components/Reveal/Fragment";
import { Slide } from "@/components/Reveal/Slide";

export const HowToReveal = () => {
  return (
    <Slide above data-transition="fade" className="p-20">
      <h1>How</h1>
      <div className="grid grid-cols-2 gap-20 h-full">
        <div className="p-10">
          <Fragment>
            <h2 className="text-yellow-300">Reveal.js</h2>
            <img src="/reveal.png" className="w-80 h-80 mx-auto" />
            <p>https://revealjs.com/</p>
            <ol className="mt-20">
              <li className="fragment">Orchestrate slides</li>
              <li className="fragment">Orchestrate timeline</li>
              <li className="fragment">Animate slide transitions</li>
              <li className="fragment">Apply themes</li>
            </ol>
          </Fragment>
        </div>
        <div className="p-10">
          <Fragment>
            <h2 className="text-yellow-300">Next.js compatible template</h2>
            <p className="text-blue-400">
              https://github.com/nianiam/reveal-next-template
            </p>
            <ol>
              <li className="fragment">Next.js 15 with App Router</li>
              <li className="fragment">Integrate Reveal API into react</li>
              <li className="fragment">useSlides hook for slide state</li>
              <li className="fragment">Fragment naming</li>
              <li className="fragment">Tailwind Support</li>
            </ol>
          </Fragment>
          <Fragment className="mt-32">
            <h2 className="text-yellow-300">This presentation!</h2>
            <p className="text-blue-400">
              https://github.com/nianiam/soe-presentaion
            </p>
            <ol>
              <li>react-syntax-highlighter</li>
              <li>motion animations (framer-motion)</li>
            </ol>
          </Fragment>
        </div>
      </div>
    </Slide>
  );
};
