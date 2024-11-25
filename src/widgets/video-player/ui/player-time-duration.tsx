import { FC } from "react";
import dayjs from "@/src/shared/lib/dayjs";

import clsx from "clsx";

type PlayerTimeDurationProps = {
  className?: string;
  currentTime: number;
  duration: number;
};

export const PlayerTimeDuration: FC<PlayerTimeDurationProps> = ({
  className,
  currentTime,
  duration,
}) => {
  const formatSecondsToHMS = (seconds: number) => {
    const formattedTime = dayjs.duration(seconds, "seconds").format("HH:mm:ss");

    return formattedTime;
  };

  return (
    <p className={clsx("px-3", className)}>
      {formatSecondsToHMS(currentTime)} / {formatSecondsToHMS(duration)}
    </p>
  );
};
