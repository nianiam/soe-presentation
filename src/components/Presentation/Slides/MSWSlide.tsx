"use client";

import { motion } from "motion/react";

import { Fragment } from "@/components/Reveal/Fragment";
import { Slide } from "@/components/Reveal/Slide";
import { useSlides } from "@/hooks/useSlides";
import { cn } from "@/utils";

export const MSWSlide = () => {
  const { fragment } = useSlides();

  return (
    <Slide above data-transition="fade" className="p-20">
      <h1 className="text-[8rem] pb-8">Building a back-end on the frontend</h1>
      <div className="grid grid-cols-2 gap-10 h-full">
        <div className="w-3/4 mx-auto">
          <h2 className="text-yellow-300 text-7xl">
            <pre className="inline text-orange-600 bg-gray-800 p-2 rounded-lg lowercase m-0 text-7xl">
              msw
            </pre>{" "}
            - Mock Service Worker
          </h2>
          <ul className="[&>li]:text-6xl [&>li]:py-2">
            <li>Intercepts HTTP requests and returns custom responses</li>
            <li>Very commonly used during testing</li>
            <li className="fragment">
              <span className="italic font-bold text-yellow-300">Can</span> be
              used on the client
            </li>

            <div className="fragment">
              <blockquote className="w-full text-5xl rounded-lg p-8">
                "mock APIs in testing, to{" "}
                <span
                  className={cn(fragment.index >= 2 ? "text-green-500" : "")}
                >
                  debug network while developing
                </span>
                ,{" "}
                <span className={cn(fragment.index >= 3 ? "text-red-500" : "")}>
                  to present their work across teams
                </span>
                , to monitor the outgoing traffic, etc."
              </blockquote>
              <p className="text-2xl text-right text-blue-500">
                https://mswjs.io/docs/getting-started
              </p>
            </div>
          </ul>
          <Fragment hidden name="quote-highlight" />
          <Fragment hidden name="quote-highlight" />
        </div>
        <div className="w-3/4 mx-auto fragment">
          <div className="text-5xl grid gap-6 justify-items-center">
            <div className="py-6 px-20 border-2 rounded-lg">Request</div>
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-t-[50px] border-t-green-700 border-r-[25px] border-r-transparent "></div>
            <div className="py-6 px-20 border-2 rounded-lg relative">
              External API
              {fragment.name === "mocked" && fragment.isShowing && (
                <motion.div
                  className="absolute top-0 left-1/2 py-6 px-20 border-2 border-gray-700 text-orange-600 bg-gray-800 rounded-lg"
                  initial={{
                    opacity: 0,
                    scale: 10,
                    rotateZ: 20,
                    translateX: "-50%",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateZ: 5,
                    transition: {
                      duration: 1,
                      type: "spring",
                    },
                  }}
                >
                  Handlers
                </motion.div>
              )}
            </div>
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-t-[50px] border-t-green-700 border-r-[25px] border-r-transparent "></div>
            <div className="py-6 px-20 border-2 rounded-lg relative">
              Response
              {fragment.name === "mocked" && fragment.isShowing && (
                <motion.div
                  className="absolute top-0 left-1/2 py-6 px-20 border-2 border-gray-700 text-orange-600 bg-gray-800 rounded-lg"
                  initial={{
                    opacity: 0,
                    scale: 10,
                    rotateZ: 20,
                    translateX: "-50%",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateZ: 5,
                    transition: {
                      duration: 1,
                      type: "spring",
                      delay: 0.2,
                    },
                  }}
                >
                  Mocked Response
                </motion.div>
              )}
            </div>
          </div>
          <Fragment hidden name="mocked" />
        </div>
      </div>
    </Slide>
  );
};
