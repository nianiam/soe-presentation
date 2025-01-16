"use client";

import { CoralThemeProvider, GlobalCss } from "@krakentech/coral";
import { ReactNode } from "react";

export const CoralProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <CoralThemeProvider>
      <GlobalCss />
      {children}
    </CoralThemeProvider>
  );
};
