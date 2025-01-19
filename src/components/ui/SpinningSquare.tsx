import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";

const variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  },
  rotateX: {
    rotateX: 360,
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 2,
    },
  },
  rotateY: {
    rotateY: 360,
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 2,
    },
  },
  rotateZ: {
    rotateZ: 360,
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 2,
    },
  },
} satisfies Variants;

type Direction = "x" | "y" | "z";

export const SpinningSquare = ({
  direction,
  additionalDirections,
}: {
  direction: Direction;
  additionalDirections?: Direction[];
}) => {
  const [animate, setAnimate] = useState([`rotate${direction.toUpperCase()}`]);

  useEffect(() => {
    if (additionalDirections) {
      setAnimate((prev) => [
        ...prev,
        ...additionalDirections.map((d) => `rotate${d.toUpperCase()}`),
      ]);
    }
  }, [additionalDirections]);

  return (
    <>
      <h2 className="text-yellow-300">
        Rotate{" "}
        {additionalDirections
          ? [direction, ...additionalDirections].join(", ")
          : direction.toUpperCase()}
      </h2>

      <motion.div
        className="border-2 border-gray-300 w-[200px] h-[200px]"
        variants={variants}
        initial={"initial"}
        animate={animate}
      />
    </>
  );
};
