"use client";

import { useEffect, useState } from "react";

import { Slide } from "@/components/Reveal/Slide";
import { useSlides } from "@/hooks/useSlides";

export const ExampleSlide = () => {
  const slides = useSlides();
  const [showPopup, setShowpopup] = useState(false);

  useEffect(() => {
    if (slides.x === 0 && slides.f === 2) {
      setShowpopup(true);
    } else {
      setShowpopup(false);
    }
  }, [slides.f, slides.x]);

  return (
    <>
      <Slide centered>
        {showPopup && (
          <div className="absolute top-10 left-10">
            I appear whilst the third fragment is focussed!
          </div>
        )}
        <h1>Example Slide</h1>
        <p className="fragment">Fragment 1</p>
        <p className="fragment">Fragment 2</p>
        <p className="fragment">Fragment 3</p>
        <div className="fragment">Fragment 4</div>
      </Slide>
    </>
  );
};
