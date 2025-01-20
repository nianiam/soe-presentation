import { AnimatePresence, motion } from "motion/react";

function getRandomNumber(N: number) {
  if (N < 1) {
    throw new Error("N must be greater than or equal to 1.");
  }
  return Math.floor(Math.random() * N) + 1;
}

export const Flipper = ({
  folder,
  images,
  grid,
  isCell,
}: {
  folder: string;
  images: number;
  grid: number;
  isCell: boolean;
}) => {
  const N = getRandomNumber(images);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <AnimatePresence>
        {isCell && (
          <motion.div
            className="h-full w-full p-10 rounded-3xl overflow-hidden"
            initial={{
              width: grid,
              height: grid,
              opacity: 0,
              rotateY: 0,
              rotateZ: 180,
            }}
            animate={{
              width: grid,
              height: grid,
              opacity: 1,
              rotateX: 180,
              rotateZ: 180,
              transition: {
                duration: 0.75,
                type: "spring",
                bounce: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              rotateX: 0,
              rotateZ: 180,
            }}
          >
            <img
              src={`/${folder}/${N}.gif`}
              style={{
                height: grid,
                width: grid,
              }}
              className="max-w-full max-h-full object-cover m-0 rounded-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
