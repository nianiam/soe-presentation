"use client";

import { cn } from "@/utils";

export interface SlideProps extends React.ComponentProps<"section"> {
  centered?: boolean;
  children: React.ReactNode;
}

export const Slide = ({
  children,
  className,
  centered,
  ...props
}: SlideProps) => {
  return (
    <section
      className={cn(
        "w-full h-full",
        centered && "flex flex-col justify-center items-center",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
