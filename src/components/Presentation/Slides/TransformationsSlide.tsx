"use client";

import { Fragment } from "@/components/Reveal/Fragment";
import { Slide } from "@/components/Reveal/Slide";
import { SpinningSquare } from "@/components/ui/SpinningSquare";
import { useSlides } from "@/hooks/useSlides";

export const TransformationsSlide = () => {
  const { fragment } = useSlides();

  const isDizzy = fragment.name === "dizzy" && fragment.isShowing;

  return (
    <Slide above data-transition="fade" className="p-20">
      <h1>3D and Perspective</h1>
      <div className="grid grid-cols-3 grid-rows-2 gap-10 h-3/4">
        <Fragment className="flex flex-col items-center">
          <SpinningSquare
            direction="x"
            additionalDirections={isDizzy ? ["y"] : undefined}
          />
        </Fragment>
        <Fragment className="flex flex-col items-center">
          <SpinningSquare
            direction="y"
            additionalDirections={isDizzy ? ["x"] : undefined}
          />
        </Fragment>
        <Fragment className="flex flex-col items-center">
          <SpinningSquare
            direction="z"
            additionalDirections={isDizzy ? ["x", "y"] : undefined}
          />
        </Fragment>
        <Fragment name="dizzy" className="col-span-3">
          <img src="/dizzy.gif" alt="Dizzy" className="mx-auto" />
        </Fragment>
      </div>
    </Slide>
  );
};
