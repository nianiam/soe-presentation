"use client";

import "reveal.js/dist/reveal.css";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Reveal from "reveal.js";

import { ConfigContext } from "../Providers/ConfigContext";
import { RevealContext } from "../Providers/RevealContext";
import {
  type RevealSlideState,
  SlidesContext,
} from "../Providers/SlidesContext";
import { ThemeContext } from "../Providers/ThemeContext";
import { defaultConfig } from "./defaultConfig";
import { type ExtendedRevealOptions, RevealOptions } from "./types";

export const RevealSlides = ({
  theme: initialTheme,
  initialState = defaultConfig.initialState,
  children,
  ...initialConfig
}: ExtendedRevealOptions) => {
  const [config, setConfig] = useState<RevealOptions>(initialConfig ?? {});
  const [theme, setTheme] = useState(initialTheme ?? "black");
  const [slideState, setSlideState] = useState<RevealSlideState>(initialState);
  const revealDiv = useRef<HTMLDivElement | null>(null);
  const reveal = useRef<Reveal.Api | null>(null);

  // Stringify config check for changes
  const configStr = JSON.stringify(config);

  // We can't set the react state within the event emitters. Bind a function to
  // the component which sets the state.
  const updateSlideState = useCallback(
    (state: RevealSlideState | undefined) => {
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
          updateSlideState(reveal.current.getState());
        }

        // Add event listeners for moving around slides and fragments
        reveal.current.on("slidechanged", () => {
          updateSlideState(reveal.current?.getState());
        });
        reveal.current.on("fragmentshown", (event) => {
          if (!reveal.current) return;

          // @ts-expect-error Reveal.js types do not include their custom events
          const fragmentName = event?.fragment?.attributes["data-fragment-name"]
            ?.value as string | undefined;

          updateSlideState({
            ...reveal.current.getState(),
            fragmentName,
            isShowing: true,
          });
        });
        reveal.current.on("fragmenthidden", (event) => {
          if (!reveal.current) return;

          // @ts-expect-error Reveal.js types do not include their custom events
          const fragmentName = event?.fragment?.attributes["data-fragment-name"]
            ?.value as string | undefined;

          updateSlideState({
            ...reveal.current?.getState(),
            fragmentName,
            isShowing: false,
          });
        });
        reveal.current.on("overviewshown", () => {
          updateSlideState(reveal.current?.getState());
        });
        reveal.current.on("overviewhidden", () => {
          updateSlideState(reveal.current?.getState());
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
  }, [config, initialState, updateSlideState]);

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
