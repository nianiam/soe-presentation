"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { Fragment } from "@/components/Reveal/Fragment";
import { Slide } from "@/components/Reveal/Slide";

import { isoRotX, isoScale } from "./IsometricSlide";

const yScale = 0.864;

export const IsometricIntroSlide = () => {
  const [size] = useState(200);

  return (
    <Slide above data-transition="fade" className="p-20">
      <h1>Isometric Projection</h1>
      <div className="relative mx-auto w-80 h-80 left-40">
        {/* Top */}
        <motion.div
          className="bg-gray-300 absolute"
          animate={{
            width: size,
            height: size,
            left: 0,
            top: 0,
            rotateX: isoRotX,
            rotateZ: 45,
            scale: isoScale,
            transformOrigin: "top left",
          }}
        >
          <div className="absolute bottom-0 right-0 border-r-[4px] border-r-red-500 size-full border-b-[4px] border-b-blue-500" />
        </motion.div>
        {/* Left */}
        <motion.div
          className="bg-gray-400 absolute"
          animate={{
            width: size / yScale,
            height: size,
            translateY: size,
            translateX: 0,
            skewX: -30,
            rotateZ: 90,
            scale: yScale,
            transformOrigin: "top left",
          }}
        >
          <div className="absolute bottom-0 left-0 border-l-[6px] border-l-blue-500 border-t-[4px] border-t-green-500 size-full" />
        </motion.div>
        {/* right */}
        <motion.div
          className="bg-gray-700 absolute"
          animate={{
            width: size / yScale,
            height: size,
            translateY: size / 2,
            translateX: size * yScale,
            skewX: 30,
            rotateZ: 90,
            scale: yScale,
            transformOrigin: "top left",
          }}
        >
          <div className="absolute bottom-0 left-0 border-l-[6px] border-l-red-500 border-b-[4px] border-b-green-500 size-full" />
        </motion.div>
      </div>
      <Fragment className="mx-auto mt-96">
        <ol>
          <li>X, Y and Z scale is affected equally</li>
          <li>No distortions due to perspective</li>
          <li>Depth easily shown using height</li>
        </ol>
      </Fragment>
      <p className="fragment text-red-500">Predictable!</p>
    </Slide>
  );
};
