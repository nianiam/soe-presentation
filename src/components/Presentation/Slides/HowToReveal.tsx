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
            <ol className="mt-20 text-6xl [&>li]:py-2">
              <li>Navigate slides</li>
              <li>Orchestrate timeline</li>
              <li>Animate slide transitions</li>
              <li>Apply themes</li>
            </ol>
          </Fragment>
        </div>
        <div className="p-10">
          <Fragment>
            <h2 className="text-yellow-300 text-7xl">
              Next.js compatible template
            </h2>
            <p className="text-blue-400 text-5xl">
              https://github.com/nianiam/reveal-next-template
            </p>
            <ol className="text-6xl [&>li]:py-2">
              <li className="fragment">Next.js 15 with App Router</li>
              <li className="fragment">Integrate Reveal API into react</li>
              <li className="fragment">
                <pre className="inline text-orange-600 bg-gray-800 p-2 rounded-lg">
                  useSlides
                </pre>{" "}
                hook for slide state
              </li>
              <li className="fragment">Fragment naming</li>
              <li className="fragment">Tailwind Support</li>
            </ol>
          </Fragment>
          <Fragment className="mt-20">
            <h2 className="text-yellow-300 text-7xl">This presentation!</h2>
            <p className="text-blue-400 text-5xl">
              https://github.com/nianiam/soe-presentaion
            </p>
            <ol className="text-6xl [&>li]:py-2">
              <li>react-syntax-highlighter</li>
              <li>motion animations (framer-motion)</li>
            </ol>
          </Fragment>
        </div>
      </div>
    </Slide>
  );
};
