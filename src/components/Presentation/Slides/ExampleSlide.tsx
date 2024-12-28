"use client";

import { Slide } from "@/components/Reveal/Slide";
import { useSlideControls } from "@/hooks/useSlideControls";
import { useSlides } from "@/hooks/useSlides";

export const ExampleSlide = () => {
  const slides = useSlides();
  const controls = useSlideControls();

  return (
    <>
      <Slide centered>
        {slides.x === 0 && slides.fragment.index === 2 && (
          <div className="absolute top-10 left-10">
            I appear whilst the <strong>third</strong> fragment is focussed!
          </div>
        )}
        {slides.fragment.isShowing && slides.fragment.name === "tester" && (
          <div className="absolute top-20 left-10">
            I appear whilst the fragment named "tester" is focussed!
          </div>
        )}

        <h1>Example Slide</h1>
        <button onClick={() => controls.go(0, 0, 2)}>
          Go to fragment 3 on the first slide
        </button>
        <p className="fragment">
          Fragment{" "}
          <span className="fragment custom fade-in">
            <span className="fragment custom fragment-bold fragment-underline">
              1
            </span>
          </span>
        </p>
        <p className="fragment" data-fragment-name="tester">
          Fragment 2
        </p>
        <p className="fragment">Fragment 3</p>
        <div className="fragment">Fragment 4</div>
      </Slide>
    </>
  );
};
