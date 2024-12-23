"use client";

import "reveal.js/dist/reveal.css";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Reveal from "reveal.js";

import { defaultConfig } from "./defaultConfig";
import { type ExtendedRevealOptions, RevealOptions, type Theme } from "./types";

type SetState<T> = Dispatch<SetStateAction<T>>;

export const RevealContext = createContext<Reveal.Api | null>(null);
export const SlidesContext = createContext<Reveal.RevealState>(
  defaultConfig.initialState,
);
export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: SetState<Theme>;
}>({ theme: "black", setTheme: () => {} });
export const ConfigContext = createContext<{
  config: RevealOptions;
  setConfig: SetState<RevealOptions>;
}>({ config: {}, setConfig: () => {} });

export const RevealSlides = ({
  theme: initialTheme,
  initialState = defaultConfig.initialState,
  children,
  ...initialConfig
}: ExtendedRevealOptions) => {
  const [config, setConfig] = useState<RevealOptions>(initialConfig ?? {});
  const [theme, setTheme] = useState(initialTheme ?? "black");
  const [slideState, setSlideState] =
    useState<Reveal.RevealState>(initialState);
  const revealDiv = useRef<HTMLDivElement | null>(null);
  const reveal = useRef<Reveal.Api | null>(null);

  // Stringify config check for changes
  const configStr = JSON.stringify(config);

  // We can't set the react state within the event emitters. Bind a function to
  // the component which sets the state.
  const updateReactState = useCallback(
    (state: Reveal.RevealState | undefined) => {
      if (!state) return;

      setSlideState(state);
    },
    [],
  );

  useEffect(() => {
    // only initialise once
    if (reveal.current) return;

    reveal.current = new Reveal(revealDiv.current!, {
      ...defaultConfig,
      ...config,
    });

    reveal.current.initialize().then(() => {
      if (reveal.current) {
        if (initialState) {
          reveal.current.setState(initialState);
        }

        // Add event listeners for moving around slides and fragments
        reveal.current.on("slidechanged", () => {
          updateReactState(reveal.current?.getState());
        });
        reveal.current.on("fragmentshown", () => {
          updateReactState(reveal.current?.getState());
        });
        reveal.current.on("fragmenthidden", () => {
          updateReactState(reveal.current?.getState());
        });
        reveal.current.on("overviewshown", () => {
          updateReactState(reveal.current?.getState());
        });
        reveal.current.on("overviewhidden", () => {
          updateReactState(reveal.current?.getState());
        });
      }

      console.log("Reveal initialized");
    });

    return () => {
      if (!reveal.current) return;

      try {
        reveal.current.destroy();
        reveal.current = null;
      } catch (_error) {
        console.warn("Reveal.destroy() call failed.");
      }
    };
  }, [config, initialState, updateReactState]);

  // Update reveal if the configuration props are changed
  useEffect(() => {
    if (reveal.current?.isReady()) {
      reveal.current.configure(config);
      reveal.current.layout();
    }
    // We explicitly stringify the config to avoid unnecessary triggers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configStr]);

  useLayoutEffect(() => {
    if (!theme || theme === "none") return;

    // Dynamically import the theme CSS file
    import(`reveal.js/dist/theme/${theme}.css`)
      .then(() => {
        try {
          reveal.current!.layout();
        } catch (_) {
          console.warn("Reveal.layout() call failed.");
        }
      })
      .catch((err) => {
        console.warn("Failed CSS import: ", err);
      });
  }, [theme]);

  // Adjust layout after _every_ render.
  // There are many things that can cause the layout to change,
  // including changes in the parent, configuration options,
  // container size, and changes in the child elements.
  useLayoutEffect(() => {
    console.log("layout adjust");
    if (reveal.current?.isReady()) {
      reveal.current.layout();
    }
  });

  return (
    <div className="reveal" ref={revealDiv}>
      <div className="slides">
        <RevealContext.Provider value={reveal.current}>
          <ConfigContext.Provider value={{ config, setConfig }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <SlidesContext.Provider value={slideState}>
                {children}
              </SlidesContext.Provider>
            </ThemeContext.Provider>
          </ConfigContext.Provider>
        </RevealContext.Provider>
      </div>
    </div>
  );
};

export default RevealSlides;
