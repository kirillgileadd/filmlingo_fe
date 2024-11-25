import { FC, HTMLAttributes } from "react";

import clsx from "clsx";
import { Maximize, Minimize } from "lucide-react";

type PlayerFullscreenButtonProps = {
  className?: string;
  isFullscreen: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const PlayerFullscreenButton: FC<PlayerFullscreenButtonProps> = ({
  className,
  isFullscreen,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx("p-3", className)}
      aria-label={isFullscreen ? "Exit fullscreen" : "Go fullscreen"}
    >
      {isFullscreen ? (
        <Minimize className="text-primary" size={24} />
      ) : (
        <Maximize className="text-primary" size={24} />
      )}
    </button>
  );
};
