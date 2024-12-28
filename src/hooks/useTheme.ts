import { useContext } from "react";

import { ThemeContext } from "@/components/Providers/ThemeContext";

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return [theme, setTheme];
};
