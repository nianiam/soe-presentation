import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { widthScale } from "./components/Presentation/Slides/IsometricSlide";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isometricCoordinate(grid: number, x: number, y: number) {
  // Requires the reference because we're starting in the center of the
  // screen
  const xOffset = ((x - y) * grid * widthScale) / 2;
  const yOffset = ((x + y) * grid) / 2;

  return { left: xOffset, top: yOffset };
}
