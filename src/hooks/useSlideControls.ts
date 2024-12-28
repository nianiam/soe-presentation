import { useContext } from "react";

import { RevealContext } from "@/components/Providers/RevealContext";

export interface GoToSlideControl {
  x: number;
  y?: number;
  f?: number;
}

export const useSlideControls = () => {
  const reveal = useContext(RevealContext);

  if (!reveal) {
    console.warn("Reveal instance not found, controls will not work.");
  }

  return {
    next: () => reveal?.next(),
    prev: () => reveal?.prev(),
    first: () => reveal?.slide(0),
    last: () => reveal?.slide(reveal?.getTotalSlides() - 1),
    /**
     * Go to a specific slide and fragment.
     *
     * @summary Slides and fragments are zero indexed. If you enter a number
     * **greater** than the total number of slides/fragments, it will take you
     * to the last slide/fragment.
     */
    go: ({ x, y, f }: GoToSlideControl) => reveal?.slide(x, y, f),
  };
};
