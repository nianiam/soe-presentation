import { createContext } from "react";

import { defaultConfig } from "../Reveal/defaultConfig";

export const SlidesContext = createContext<Reveal.RevealState>(
  defaultConfig.initialState,
);
