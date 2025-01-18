"use client";

import {
  Button,
  Card,
  Container,
  Grid,
  octopusTheme,
  Typography,
} from "@krakentech/coral";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { Slide } from "@/components/Reveal/Slide";
import { useSlides } from "@/hooks/useSlides";
import { cn } from "@/utils";

export const isoRotX = 54.736;
export const isoScale = 1.2247;

export const widthScale = 1.732;

const initialLeft = "50%";
const initialTop = "50%";

const variants = {
  dimensions: (grid: number) => ({
    width: grid,
    height: grid,
  }),
  isometric: {
    rotateX: isoRotX,
    rotateZ: 45,
  },
  scaled: {
    scale: isoScale,
  },
} satisfies Variants;

const colors = ["bg-red-300", "bg-green-300", "bg-blue-300", "bg-purple-300"];

export const IsometricSlide = () => {
  const { x, fragment } = useSlides();
  const [grid, setGrid] = useState(200);
  const [variant, setVariant] = useState<(keyof typeof variants)[]>([
    "dimensions",
  ]);
  const reference = {
    x: initialLeft,
    y: `calc(${initialTop} - ${grid / 2}px)`,
  };

  const isIsometric = variant.includes("isometric");
  const isScaled = variant.includes("scaled");

  useEffect(() => {
    if (x === 4) {
      if (fragment.index === -1) {
        setVariant(["dimensions"]);
      }

      if (fragment.name === "isometric" && fragment.isShowing) {
        setVariant(["dimensions", "isometric"]);
      }

      if (fragment.name === "scaled" && fragment.isShowing) {
        setVariant(["dimensions", "isometric", "scaled"]);
      }

      if (fragment.name === "coordinate-grid-increase") {
        if (fragment.isShowing) {
          setGrid(300);
        } else {
          setGrid(200);
        }
      }

      if (fragment.name === "coordinate-grid-decrease") {
        if (fragment.isShowing) {
          setGrid(150);
        } else {
          setGrid(300);
        }
      }
    }
  }, [fragment.index, fragment.isShowing, fragment.name, x]);

  const isometricCoordinate = useCallback(
    (x: number, y: number) => {
      // Requires the reference because we're starting in the center of the
      // screen
      const xOffset = reference?.x
        ? `calc(${reference.x} + ${((x - y) * grid * widthScale) / 2}px)`
        : ((x - y) * grid * widthScale) / 2;

      const yOffset = reference?.y
        ? `calc(${reference.y} + ${((x + y) * grid) / 2}px)`
        : ((x + y) * grid) / 2;

      return { left: xOffset, top: yOffset };
    },
    [grid, reference.x, reference.y],
  );

  return (
    <Slide
      above
      data-transition="fade"
      className="grid grid-rows-[150px_1fr] place-content-center place-items-center"
    >
      <h1 className="m-0 z-20">3D and Perspective</h1>
      <div className="w-full h-full relative">
        {x === 4 && fragment.index < 12 && (
          <>
            <motion.div
              initial={"dimensions"}
              custom={grid}
              variants={variants}
              animate={variant}
              style={{
                position: "absolute",
                top: initialTop,
                left: initialLeft,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="border-2 border-gray-300 z-20"
            >
              <div className="absolute bottom-[calc(100%+20px)] left-0 w-full">
                {fragment.name === "scaled" && fragment.isShowing && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-full text-[2.5rem] text-red-500">{`x ${isoScale}`}</div>
                )}
                <div className="text-[2.5rem]">{`${isIsometric && !isScaled ? Number(grid / isoScale).toFixed(2) : grid} px`}</div>
                <div className="border-l border-r border-gray-300 h-3 w-0 mx-auto"></div>
                <div className="border-t-2 border-l-2 border-r-2 border-gray-300 h-3"></div>
              </div>
            </motion.div>
            {fragment.index >= 2 && fragment.index < 7 && (
              <>
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  initial={{
                    top: `calc(50% + ${grid / 2}px + 20px)`,
                    width: grid * widthScale,
                  }}
                  animate={{
                    top: `calc(50% + ${grid / 2}px + 20px)`,
                    width: grid * widthScale,
                  }}
                >
                  <div className="border-b-2 border-l-2 border-r-2 border-gray-300 h-3"></div>
                  <div className="text-[2.5rem]">
                    {`${isIsometric && isScaled ? Number(grid * widthScale).toFixed(2) : grid} px`}
                    <span className="text-red-500 px-2 text-[2rem]">
                      {`(${grid} px * √3)`}
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute"
                  initial={{
                    left: `calc(50% - ${(grid * widthScale) / 2}px - 20px)`,
                    top: `calc(50% - ${grid / 2}px)`,
                    height: grid,
                  }}
                  animate={{
                    left: `calc(50% - ${(grid * widthScale) / 2}px - 20px)`,
                    top: `calc(50% - ${grid / 2}px)`,
                    height: grid,
                  }}
                >
                  <div className="border-b-2 border-l-2 border-t-2 border-gray-300 w-3 h-full"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-full text-[1.5rem] text-nowrap pr-2">{`${isIsometric && isScaled ? grid : Number(grid / 1.4141)} px`}</div>
                </motion.div>
              </>
            )}
            {fragment.name?.includes("coordinate") && (
              <>
                <motion.div
                  className="absolute rounded-full size-8 bg-red-500 z-30"
                  style={{ translateX: "-50%", translateY: "-50%" }}
                  variants={{
                    scale: {
                      rotateX: isoRotX,
                      rotateZ: -45,
                      scale: isoScale,
                      opacity: 1,
                    },
                    coordinate1: {
                      ...isometricCoordinate(0, 0),
                    },
                    coordinate2: {
                      ...isometricCoordinate(0, 1),
                    },
                    coordinate3: {
                      ...isometricCoordinate(1, 1),
                    },
                    coordinate4: {
                      ...isometricCoordinate(1, 0),
                    },
                    coordinate5: {
                      ...isometricCoordinate(3, 1),
                    },
                    "coordinate-grid-increase": {
                      ...isometricCoordinate(0, 0),
                    },
                    "coordinate-grid-decrease": {
                      ...isometricCoordinate(0, 0),
                    },
                  }}
                  initial={{
                    ...isometricCoordinate(0, 0),
                    opacity: 0,
                  }}
                  animate={
                    fragment.name?.includes("coordinate")
                      ? ["scale", fragment.name]
                      : ["scale", "coordinate1"]
                  }
                >
                  <div className="absolute -top-12 text-[2.5rem] text-nowrap text-blue-500">
                    {(() => {
                      switch (fragment.name) {
                        case "coordinate1":
                          return "0, 0";
                        case "coordinate2":
                          return "0, 1";
                        case "coordinate3":
                          return "1, 1";
                        case "coordinate4":
                          return "1, 0";
                        case "coordinate5":
                          return "3, 1";
                        case "coordinate-grid-increase":
                          return "0, 0";
                        case "coordinate-grid-decrease":
                          return "0, 0";
                        default:
                          return "0, 0";
                      }
                    })()}
                  </div>
                </motion.div>
              </>
            )}
          </>
        )}
        {fragment.index >= 7 &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  ...isometricCoordinate(0, i),
                }}
              >
                {Array(10)
                  .fill(0)
                  .map((_, j) => (
                    <motion.div
                      key={j}
                      style={{
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      initial={{
                        width: grid,
                        height: grid,
                        opacity: 0,
                      }}
                      animate={{
                        width: grid,
                        height: grid,
                        opacity: 1,
                        rotateX: isoRotX,
                        rotateZ: -45,
                        scale: isoScale,
                        ...isometricCoordinate(j, 0),
                      }}
                      className="absolute border border-gray-700 border-dashed"
                    />
                  ))}
              </motion.div>
            ))}
        {fragment.index >= 7 &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  ...isometricCoordinate(0, -i),
                }}
              >
                {Array(10)
                  .fill(0)
                  .map((_, j) => (
                    <motion.div
                      key={j}
                      style={{
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      initial={{
                        width: grid,
                        height: grid,
                        opacity: 0,
                      }}
                      animate={{
                        width: grid,
                        height: grid,
                        opacity: 1,
                        rotateX: isoRotX,
                        rotateZ: -45,
                        scale: isoScale,
                        ...isometricCoordinate(j, 0),
                      }}
                      className="absolute border border-gray-700 border-dashed"
                    />
                  ))}
              </motion.div>
            ))}
        {fragment.index >= 7 &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  ...isometricCoordinate(0, i),
                }}
              >
                {Array(10)
                  .fill(0)
                  .map((_, j) => (
                    <motion.div
                      key={j}
                      style={{
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      initial={{
                        width: grid,
                        height: grid,
                        opacity: 0,
                      }}
                      animate={{
                        width: grid,
                        height: grid,
                        opacity: 1,
                        rotateX: isoRotX,
                        rotateZ: -45,
                        scale: isoScale,
                        ...isometricCoordinate(-j, 0),
                      }}
                      className="absolute border border-gray-700 border-dashed"
                    />
                  ))}
              </motion.div>
            ))}
        {fragment.index >= 7 &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  ...isometricCoordinate(0, -i),
                }}
              >
                {Array(10)
                  .fill(0)
                  .map((_, j) => (
                    <motion.div
                      key={j}
                      style={{
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      initial={{
                        width: grid,
                        height: grid,
                        opacity: 0,
                      }}
                      animate={{
                        width: grid,
                        height: grid,
                        opacity: 1,
                        rotateX: isoRotX,
                        rotateZ: -45,
                        scale: isoScale,
                        ...isometricCoordinate(-j, 0),
                      }}
                      className="absolute border border-gray-700 border-dashed"
                    />
                  ))}
              </motion.div>
            ))}
        {fragment.index >= 10 && fragment.index < 12 && (
          <motion.div
            className="absolute bg-blue-300 rounded-2xl z-10"
            style={{
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{
              ...isometricCoordinate(-3, 3),
              width: grid * 2,
              height: grid * 2,
              rotateX: isoRotX,
              rotateZ: 45,
              scale: isoScale,
              opacity: 0,
            }}
            animate={{
              ...isometricCoordinate(-3, 3),
              rotateX: isoRotX,
              rotateZ: 45,
              scale: isoScale,
              width: grid * 2,
              height: grid * 2,
              opacity: 1,
            }}
          />
        )}
        <>
          <AnimatePresence>
            {fragment.index === 11 &&
              [
                [-3.25, 2],
                [-3.5, 1],
                [-3.75, 0],
                [-4, -1],
                [-3, -1.25],
                [-2, -1.5],
                [-1, -1.75],
                [0, -2],
                [-0.25, -3],
                [-0.5, -4],
                [-0.75, -5],
                [-1, -6],
                [-1.25, -7],
              ].map(([x, y], i) => (
                <motion.div
                  key={i}
                  className={cn("absolute rounded-2xl z-10", colors[i % 4])}
                  exit={{
                    opacity: 0,
                    transition: {
                      delay: 0.025 * i,
                    },
                  }}
                  style={{
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  initial={{
                    ...isometricCoordinate(x, y),
                    width: grid * 2,
                    height: grid * 2,
                    rotateX: isoRotX,
                    rotateZ: 45,
                    scale: isoScale,
                    opacity: 0,
                  }}
                  animate={{
                    ...isometricCoordinate(x, y),
                    rotateX: isoRotX,
                    rotateZ: 45,
                    scale: isoScale,
                    width: grid * 2,
                    height: grid * 2,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.1 * i,
                  }}
                />
              ))}
          </AnimatePresence>
        </>
        {fragment.index >= 12 && (
          <motion.div
            className="absolute rounded-2xl z-10 text-3xl"
            style={{
              transformOrigin: "left",
              rotateX: isoRotX,
              rotateZ: -45,
              scale: isoScale,
              width: grid * 5,
              height: grid * 4,
            }}
            initial={{
              ...isometricCoordinate(-2, 0),
              opacity: 0,
            }}
            animate={{
              ...isometricCoordinate(-2, 0),
              opacity: 1,
            }}
          >
            <Container fullWidth fullHeight theme="dark" padding="xxxl">
              <Typography variant="h1">Epic Coral Stuff</Typography>
              <Typography variant="h2">Sub-epic stuff</Typography>
              <Container marginX="auto" maxWidth={grid * 3.2}>
                <Grid templateColumns={`repeat(3,${grid}px)`} gap="md">
                  <Card padding="none">
                    <Card.Header>Coral Card</Card.Header>
                    <Card.Image src="/jason.gif" height={grid} />
                    <Card.Body padding="small">
                      Hey there, i'm a coral card
                    </Card.Body>
                  </Card>
                  <Card padding="none">
                    <Card.Header>Coral Card</Card.Header>
                    <Card.Image src="/sugar.gif" height={grid} />
                    <Card.Body padding="small">
                      Hey there, i'm a coral card
                    </Card.Body>
                  </Card>
                  <Card padding="none">
                    <Card.Header>Coral Card</Card.Header>
                    <Card.Image src="/vader.gif" height={grid} />
                    <Card.Body padding="small">
                      Hey there, i'm a coral card
                    </Card.Body>
                  </Card>
                </Grid>
              </Container>
            </Container>
          </motion.div>
        )}
        {fragment.name === "coordinate-coral-dialogue" &&
          fragment.isShowing && (
            <motion.div
              className="absolute rounded-2xl z-20 text-3xl"
              style={{
                transformOrigin: "left",
                rotateX: isoRotX,
                rotateZ: -45,
                scale: isoScale,
                width: grid * 5,
                height: grid * 4,
              }}
              initial={{
                ...isometricCoordinate(-2.25, -0.25),
                opacity: 0,
              }}
              animate={{
                ...isometricCoordinate(-2.25, -0.25),
                opacity: 1,
              }}
            >
              <div
                className="opacity-60"
                style={{
                  width: grid * 5,
                  height: grid * 4,
                  backgroundColor: octopusTheme.color.base.main,
                }}
              />
              <div
                className="absolute top-0 left-0 flex items-center justify-center"
                style={{
                  width: grid * 5,
                  height: grid * 4,
                }}
              >
                <Container width={grid * 2} height={grid * 2} margin="auto">
                  <Card padding="none">
                    <Card.Header>Dialog Header</Card.Header>
                    <Card.Image src="/dwight.gif" height={grid} />
                    <Card.Body padding="small">
                      <Button>Close me</Button>
                    </Card.Body>
                  </Card>
                </Container>
              </div>
            </motion.div>
          )}
      </div>
      <div className="fragment hidden" data-fragment-name={"isometric"} />
      <div className="fragment hidden" data-fragment-name={"scaled"} />
      <div className="fragment hidden" data-fragment-name={"grid-dimensions"} />
      <div className="fragment hidden" data-fragment-name={"coordinate1"} />
      <div className="fragment hidden" data-fragment-name={"coordinate2"} />
      <div className="fragment hidden" data-fragment-name={"coordinate3"} />
      <div className="fragment hidden" data-fragment-name={"coordinate4"} />
      <div className="fragment hidden" data-fragment-name={"coordinate-grid"} />
      <div className="fragment hidden" data-fragment-name={"coordinate5"} />
      <div
        className="fragment hidden"
        data-fragment-name={"coordinate-grid-increase"}
      />
      <div
        className="fragment hidden"
        data-fragment-name={"coordinate-grid-decrease"}
      />
      <div
        className="fragment hidden"
        data-fragment-name={"coordinate-example-layer1"}
      />
      <div
        className="fragment hidden"
        data-fragment-name={"coordinate-coral"}
      />
      <div
        className="fragment hidden"
        data-fragment-name={"coordinate-coral-dialogue"}
      />
    </Slide>
  );
};
