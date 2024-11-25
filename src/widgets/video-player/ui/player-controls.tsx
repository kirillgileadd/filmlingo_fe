import { FC, ReactNode } from "react";

import clsx from "clsx";

type PlayerControlsProps = {
  className?: string;
  children: ReactNode;
  showControls: boolean;
};

export const PlayerControls: FC<PlayerControlsProps> = ({
  className,
  children,
  showControls,
}) => {
  return (
    <div
      className={clsx(
        `absolute bottom-6 left-6 right-6 transform z-10 flex items-center rounded-lg bg-background bg-opacity-50 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`,
        className
      )}
    >
      {children}
    </div>
  );
};
