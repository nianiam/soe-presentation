"use client";

import { motion } from "motion/react";

import { Fragment } from "@/components/Reveal/Fragment";
import { Slide } from "@/components/Reveal/Slide";
import { useSlides } from "@/hooks/useSlides";

export const WhySlide = () => {
  const { fragment, x } = useSlides();

  return (
    <Slide
      above
      data-transition="fade"
      className="grid grid-rows-[33%_66%] gap-20 p-20"
    >
      <div>
        <h1>Motivation</h1>
        <ol>
          <li className="fragment">Browsers significantly more powerful</li>
          <li className="fragment">
            We already build out Front ends, why not re-use them?
          </li>
          <li className="fragment">Fun?</li>
        </ol>
      </div>
      <div className="fragment">
        <h1>Inspiration</h1>
        <div className="mt-6 text-yellow-300">
          Design decisions in SNAP made it easy to extract individual pieces
        </div>
        {x === 1 && fragment.index >= 2 && fragment.isShowing && (
          <motion.div className="relative w-full mt-16 h-[250px]">
            {Array(29)
              .fill(0)
              .map((_, i) => {
                let top = 0;
                let width = 400;
                let height = 200;
                let left = `calc((100% - 400px)/28 * ${i}`;
                let rotateY = 65;
                let rotateX = -10;
                let zIndex = i;

                const isMap =
                  i === 5 && fragment.name === "map" && fragment.isShowing;
                const isMocks =
                  i === 7 && fragment.name === "mocks" && fragment.isShowing;
                const is3d =
                  i === 15 && fragment.name === "3d" && fragment.isShowing;

                if (isMap || isMocks || is3d) {
                  top = -350;
                  width = 600;
                  height = 400;
                  left = `calc((100% - 800px)/28 * ${i}`;
                  rotateY = 0;
                  rotateX = 0;
                  zIndex = 30;
                }

                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      opacity: 0,
                      top: 100,
                      left: `calc((100% - 400px)/28 * ${i}`,
                      rotateY: 65,
                      rotateX: -10,
                      width: 400,
                      height: 200,
                      zIndex,
                    }}
                    animate={{
                      opacity: 1,
                      rotateY,
                      rotateX,
                      width,
                      height,
                      top,
                      left,
                      zIndex,
                    }}
                    transition={{
                      delay: 0.015 * i,
                    }}
                  >
                    {/* eslint-disable-next-line */}
                    <img
                      src={`/snap-slides/${i + 1}.jpeg`}
                      className="w-full h-full object-cover border-2 drop-shadow-xl"
                    />
                  </motion.div>
                );
              })}
          </motion.div>
        )}
        {/* <div className="fragment hidden" /> */}
        <Fragment hidden name="map" />
        <Fragment hidden name="mocks" />
        <Fragment hidden name="3d" />
      </div>
    </Slide>
  );
};
