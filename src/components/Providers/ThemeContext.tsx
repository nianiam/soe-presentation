import { createContext, Dispatch, SetStateAction } from "react";

import { Theme } from "../Reveal/types";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}>({ theme: "black", setTheme: () => {} });
