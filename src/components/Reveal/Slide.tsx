"use client";

import { cn } from "@/utils";

export interface SlideProps extends React.ComponentProps<"section"> {
  above?: boolean;
  centered?: boolean;
  children: React.ReactNode;
}

export const Slide = ({
  children,
  className,
  above,
  centered,
  ...props
}: SlideProps) => {
  return (
    <section
      className={cn(
        "w-full h-full",
        centered && "flex flex-col justify-center items-center",
        above && "z-10",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
