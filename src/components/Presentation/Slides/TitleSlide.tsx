"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Slide } from "@/components/Reveal/Slide";
import { GoatFlipper } from "@/components/ui/GoatFlipper";
import { isometricCoordinate } from "@/utils";

import { isoRotX, isoScale } from "./IsometricSlide";

const grid = 200;

function generateCombinations(num1: number, num2: number, N: number) {
  if (num1 < 0 || num1 > 9 || num2 < 0 || num2 > 9) {
    throw new Error("Both numbers must be between 0 and 9.");
  }

  const combinations = [];
  for (let i = 0; i < N; i++) {
    const first = Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
    let second;
    do {
      second = Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
    } while (first === second); // Ensure the second number is different from the first

    combinations.push([first, second]);
  }

  return combinations;
}

export const TitleSlide = () => {
  const [cells, setCells] = useState(generateCombinations(2, 6, 7));

  useEffect(() => {
    const interval = setInterval(() => {
      setCells(generateCombinations(2, 6, 7));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Slide centered above className="relative">
      <h1 className="z-50 drop-shadow-sm">
        Presentations in React<span className="text-red-500">*</span>
      </h1>
      <h2 className="absolute bottom-6 right-8 text-6xl text-red-500">
        *Designing for fast iteration
      </h2>
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
                      rotateZ: -45,
                      scale: isoScale,
                      ...isometricCoordinate(grid, j, 0),
                    }}
                    className="absolute"
                  >
                    <GoatFlipper grid={grid} isCell={Array.isArray(isCell)} />
                  </motion.div>
                );
              })}
          </motion.div>
        ))}
    </Slide>
  );
};
