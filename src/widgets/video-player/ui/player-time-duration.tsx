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
  const formatSecondsToDynamicFormat = (seconds: number) => {
    const duration = dayjs.duration(seconds, "seconds");

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const secondsPart = duration.seconds();

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        secondsPart
      ).padStart(2, "0")}`;
    }

    if (minutes > 0) {
      return `${minutes}:${String(secondsPart).padStart(2, "0")}`;
    }

    return `0:${String(secondsPart).padStart(2, "0")}`;
  };

  return (
    <p className={clsx("px-3", className)}>
      {formatSecondsToDynamicFormat(currentTime)} /{" "}
      {formatSecondsToDynamicFormat(duration)}
    </p>
  );
};
