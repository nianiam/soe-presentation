"use client";

import { Slide } from "@/components/Reveal/Slide";

export const TitleSlide = () => {
  return (
    <>
      <Slide centered above>
        <h1 className="">
          Presentations in React<span className="text-red-500">*</span>
        </h1>
        <h2 className="absolute bottom-6 right-8 text-xl text-red-500">
          *Designing for fast iteration
        </h2>
      </Slide>
    </>
  );
};
