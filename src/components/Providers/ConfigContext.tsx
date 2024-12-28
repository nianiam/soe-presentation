import { createContext, type Dispatch, SetStateAction } from "react";

import { RevealOptions } from "../Reveal/types";

export const ConfigContext = createContext<{
  config: RevealOptions;
  setConfig: Dispatch<SetStateAction<RevealOptions>>;
}>({ config: {}, setConfig: () => {} });
