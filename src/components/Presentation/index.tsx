"use client";

import dynamic from "next/dynamic";

import { ExtendedRevealOptions } from "../Reveal/types";

const RevealSlides = dynamic(() => import("../Reveal"), {
  ssr: false,
});

export const PresentationSlides = ({
  children,
  ...props
}: React.PropsWithChildren<ExtendedRevealOptions>) => {
  return <RevealSlides {...props}>{children}</RevealSlides>;
};
