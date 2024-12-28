import { useContext } from "react";

import { SlidesContext } from "@/components/Providers/SlidesContext";

export type SlideState = {
  x: number;
  y: number;
  overview: boolean;
  paused: boolean;
  fragment: {
    index: number;
    name?: string;
    isShowing?: boolean;
  };
};

export const useSlides = (): SlideState => {
  const slides = useContext(SlidesContext);

  const {
    indexh: x,
    indexv: y,
    indexf: index,
    fragmentName: name,
    isShowing,
    ...rest
  } = slides;

  return { x, y, ...rest, fragment: { index, name, isShowing } };
};
