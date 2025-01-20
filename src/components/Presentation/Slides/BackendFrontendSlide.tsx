"use client";

import { Slide } from "@/components/Reveal/Slide";

export const BackendFrontendSlide = () => {
  return (
    <Slide above data-transition="fade" className="p-20">
      <h1 className="text-[8rem]">Building a back-end on the frontend</h1>
      <div className="w-[60%] mx-auto">
        <div className="w-1/2 mx-auto">
          <img src="/gromit1.gif" className="w-full h-full object-cover" />
        </div>
        <div className="text-left">SNAP!:</div>
        <ul className="[&>li]:text-6xl [&>li]:p-2">
          <li>Had no backend for the first 3 weeks (6 week project)</li>
          <li>Account setup in the test environment not a priority</li>
          <li>
            Waiting for BE changes to test/iterate on UI features in this time
            frame difficult
          </li>
        </ul>
      </div>
    </Slide>
  );
};
