"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Slide } from "@/components/Reveal/Slide";
import { Flipper } from "@/components/ui/Flipper";
import { isometricCoordinate } from "@/utils";

import { isoRotX, isoScale } from "./IsometricSlide";
import { generateCombinations } from "./TitleSlide";

const grid = 250;
const IMAGES = 15;

export const ThanksSlide = () => {
  const [cells, setCells] = useState(generateCombinations(3, 7, IMAGES));

  useEffect(() => {
    const interval = setInterval(() => {
      setCells(generateCombinations(3, 7, IMAGES));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Slide centered above>
      <h1 className="z-50 drop-shadow-sm">Thanks for listening!</h1>
      <h2 className="text-6xl z-50 text-red-500">Questions?</h2>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              ...isometricCoordinate(grid, 0, -i + 4),
            }}
          >
            {Array(10)
              .fill(0)
              .map((_, j) => {
                const isCell = cells.find((combinations) => {
                  return combinations[0] === i && combinations[1] === j;
                });

                return (
                  <motion.div
                    key={j}
                    style={{
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    initial={{
                      width: grid,
                      height: grid,
                      opacity: 0,
                    }}
                    animate={{
                      width: grid,
                      height: grid,
                      opacity: 1,
                      rotateX: isoRotX,
                      rotateZ: 45,
                      scale: isoScale,
                      ...isometricCoordinate(grid, j, 0),
                    }}
                    className="absolute"
                  >
                    <Flipper
                      images={15}
                      folder="clap"
                      grid={grid}
                      isCell={Array.isArray(isCell)}
                    />
                  </motion.div>
                );
              })}
          </motion.div>
        ))}
    </Slide>
  );
};
