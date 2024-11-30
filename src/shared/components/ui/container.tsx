import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/lib/utils";

const containerVariants = cva("", {
  variants: {
    size: {
      default: "px-2 sm:px-24",
      small: "px-2 max-w-7xl sm:px-24",
      sm: "px-3",
      lg: "px-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(containerVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
