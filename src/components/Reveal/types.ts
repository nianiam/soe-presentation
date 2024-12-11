import type Reveal from "reveal.js";

export type Theme =
  | "black"
  | "white"
  | "league"
  | "beige"
  | "sky"
  | "night"
  | "serif"
  | "simple"
  | "solarized"
  | "blood"
  | "moon"
  | "night"
  | "none";

export type RevealOptions = Omit<Reveal.Options, "plugins" | "dependencies">;

export interface ExtendedRevealOptions extends RevealOptions {
  theme?: Theme;
  initialState?: Reveal.RevealState;
  children?: React.ReactNode;
}

export interface SlideChangedEvent extends Event {
  previousSlide: HTMLElement;
  currentSlide: HTMLElement;
}
