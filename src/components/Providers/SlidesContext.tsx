import { createContext } from "react";
import Reveal from "reveal.js";

import { defaultConfig } from "../Reveal/defaultConfig";

export interface RevealSlideState extends Reveal.RevealState {
  fragmentName?: string;
  isShowing?: boolean;
}

export const SlidesContext = createContext<RevealSlideState>(
  defaultConfig.initialState,
);
