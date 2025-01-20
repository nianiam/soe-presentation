"use client";
import { LayoutGroup, motion } from "motion/react";

import { Slide } from "@/components/Reveal/Slide";
import { useSlides } from "@/hooks/useSlides";
import { cn } from "@/utils";

export const HandlersAndReactSlide = () => {
  const { fragment } = useSlides();
  return (
    <Slide above data-transition="fade" className="p-20">
      <h1>Handlers and React</h1>
      <div className="border-2 border-gray-500 w-3/4 h-3/4 mx-auto rounded-2xl overflow-hidden">
        <div className="bg-gray-500 h-10" />
        <div className="p-10 h-full">
          <motion.ul
            layout
            style={{
              width: "75%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              height: "calc(100%)",
              paddingBottom: "40px",
            }}
          >
            <LayoutGroup>
              {fragment.index >= 0 && fragment.isShowing && (
                <motion.li
                  layout
                  className="border-2 border-blue-600 rounded-2xl grid grid-cols-2 gap-5 p-5 relative"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div className="absolute bottom-[80%] text-blue-600 rounded-2xl text-center text-6xl px-4">
                    <pre>msw</pre>
                  </div>
                  <motion.div
                    className="py-6 px-20 border-2 border-gray-700 text-orange-600 bg-gray-800 rounded-2xl text-center text-6xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    Handlers
                  </motion.div>
                  <motion.div
                    className="py-6 px-20 border-2 border-gray-700 text-orange-600 bg-gray-800 rounded-2xl text-center text-6xl relative"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    Mocked Responses
                    {fragment.name === "global-state" && fragment.isShowing && (
                      <motion.div
                        className="absolute top-0 left-0 py-6 px-20 w-full border-2 border-pink-500 text-yellow-100 bg-pink-800 rounded-lg"
                        initial={{
                          opacity: 0,
                          scale: 10,
                          rotateZ: 20,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotateZ: 2,
                          transition: {
                            duration: 1,
                            type: "spring",
                            delay: 0.2,
                          },
                        }}
                      >
                        Global State
                      </motion.div>
                    )}
                  </motion.div>
                </motion.li>
              )}
              <motion.li
                layout
                className="flex items-center justify-center border-2 border-yellow-300 rounded-2xl flex-1 relative p-20"
              >
                <div className="absolute bottom-[97%] left-0.5 text-yellow-300 rounded-2xl text-center text-6xl px-4">
                  <pre>React App</pre>
                </div>
                {fragment.index >= 1 && fragment.isShowing && (
                  <>
                    <div className="absolute left-0 top-0">
                      <pre className="text-yellow-300">
                        {"<GlobalStateProvider store={globalState}>"}
                      </pre>
                    </div>
                    <div className="absolute left-0 bottom-0">
                      <pre className="text-yellow-300">
                        {"</GlobalStateProvider>"}
                      </pre>
                    </div>
                  </>
                )}
                {fragment.index >= 0 && fragment.isShowing && (
                  <div className="absolute left-[72.5%] w-0 h-0 bottom-[102%] border-l-[15px] border-l-transparent border-t-[20px] border-t-orange-600 border-r-[15px] border-r-transparent "></div>
                )}
                {fragment.index >= 1 && fragment.isShowing && (
                  <div className="absolute left-[75%] w-0 h-0 bottom-[102%] border-l-[15px] border-l-transparent border-b-[20px] border-b-pink-600 border-r-[15px] border-r-transparent "></div>
                )}
                <ul>
                  <li className="fragment" data-fragment-name="show-msw">
                    Can read{" "}
                    <span
                      className={cn(
                        fragment.index >= 1 &&
                          fragment.isShowing &&
                          "line-through",
                      )}
                    >
                      mocked responses
                    </span>
                    {fragment.index >= 1 &&
                      fragment.isShowing &&
                      " global state"}
                  </li>
                  <li className="fragment" data-fragment-name="global-state">
                    Can write to global state in mutations or{" "}
                    <pre className="inline text-5xl border-gray-700 text-orange-600 bg-gray-800 p-2 rounded-lg">
                      POST
                    </pre>{" "}
                    requests
                  </li>
                </ul>
              </motion.li>
            </LayoutGroup>
          </motion.ul>
        </div>
      </div>
    </Slide>
  );
};
