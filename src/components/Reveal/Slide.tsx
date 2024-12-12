"use client";

import { cn } from "@/utils";

export interface SlideProps extends React.ComponentProps<"section"> {
  centered?: boolean;
  above?: boolean;
  children: React.ReactNode;
}

export const Slide = ({
  children,
  className,
  centered,
  above = true,
  ...props
}: SlideProps) => {
  return (
    <section
      className={cn(
        "w-full h-full",
        above && "z-10",
        centered && "flex flex-col justify-center items-center",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
