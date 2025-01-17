"use client";

import { cn } from "@/utils";

export interface FragmentProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  name?: string;
  hidden?: boolean;
}

export const Fragment = ({
  children,
  className,
  name,
  hidden,
  ...props
}: FragmentProps) => {
  return (
    <div
      className={cn("fragment", hidden && "hidden", className)}
      data-fragment-name={name}
      {...props}
    >
      {children}
    </div>
  );
};
