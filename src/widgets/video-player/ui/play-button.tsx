import { FC, HTMLAttributes } from "react";

import clsx from "clsx";
import { Pause, PlayIcon } from "lucide-react";

type PlayButtonProps = {
  className?: string;
  isPlaying: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const PlayButton: FC<PlayButtonProps> = ({
  className,
  isPlaying,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx("p-3 play-button", className)}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? (
        <Pause className="text-primary" size={24} />
      ) : (
        <PlayIcon className="text-primary" size={24} />
      )}
    </button>
  );
};
