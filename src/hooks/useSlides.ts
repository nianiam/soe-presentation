import { useContext } from "react";

import { SlidesContext } from "@/components/Reveal";

export type SlideState = {
  x: number;
  y: number;
  f: number;
  overview: boolean;
  paused: boolean;
};

export const useSlides = (): SlideState => {
  const slides = useContext(SlidesContext);

  const { indexh: x, indexv: y, indexf: f, ...rest } = slides;

  return { x, y, f, ...rest };
};
