import { motion } from "motion/react";

import { isoRotX, isoScale } from "../Presentation/Slides/IsometricSlide";

type Point = {
  top: number;
  left: number;
};

interface Props extends React.ComponentProps<typeof motion.svg> {
  pointA: Point;
  pointB: Point;
  isometric?: boolean;
  color?: string;
}

export const Line = ({
  pointA,
  pointB,
  isometric,
  color,
  animate,
  initial,
  ...props
}: Props) => {
  const { top: y1, left: x1 } = pointA;
  const { top: y2, left: x2 } = pointB;

  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  const width = Math.abs(xDiff);
  const height = Math.abs(yDiff);

  // Position SVG so it fits both points
  const top = Math.min(y1, y2); // Top-left corner of the SVG
  const left = Math.min(x1, x2);

  const iso = isometric
    ? {
        rotateX: isoRotX,
        rotateZ: 45,
        scale: isoScale,
        transformOrigin: "top left",
      }
    : {};

  const initialProps = typeof initial === "object" ? initial : {};
  const animateProps = typeof animate === "object" ? animate : {};

  return (
    <motion.svg
      className="absolute"
      initial={{
        top,
        left,
        width,
        height,
        ...iso,
        ...initialProps,
      }}
      animate={{
        top,
        left,
        width,
        height,
        pointerEvents: "none", // Prevent interaction
        ...iso,
        ...animateProps,
      }}
      {...props}
    >
      <line
        x1={xDiff > 0 ? 0 : width} // Start from one side of the SVG
        y1={yDiff > 0 ? 0 : height}
        x2={xDiff > 0 ? width : 0} // End on the opposite side
        y2={yDiff > 0 ? height : 0}
        stroke={color ?? "black"}
        strokeWidth="2"
      />
    </motion.svg>
  );
};
