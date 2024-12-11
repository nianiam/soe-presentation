import { useContext } from "react";

import { ThemeContext } from "@/components/Reveal";

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return [theme, setTheme];
};
