"use client";

import { Slide } from "@/components/Reveal/Slide";

export const BackendFrontendSlide = () => {
  return (
    <Slide above data-transition="fade" className="p-20">
      <h1 className="text-[8rem]">Building a back-end on the frontend</h1>
      <div className="w-[40%] mx-auto">
        <div className="w-full mx-auto">
          <img src="/gromit1.gif" className="w-full h-full object-cover" />
        </div>
        <div className="text-left">SNAP!:</div>
        <ul className="[&>li]:text-6xl [&>li]:p-2">
          <li>Had no backend for the first 3 weeks</li>
          <li>Never had a test environment</li>
          <li>Tested features in prod on a number of occasions</li>
        </ul>
      </div>
    </Slide>
  );
};
