import { FC } from "react";

import clsx from "clsx";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/shared/components/ui/hover-card";
import { Slider } from "@/src/shared/components/ui/slider";
import { Volume2, VolumeX } from "lucide-react";

type ChangeVolumeProps = {
  className?: string;
  volume: number;
  isMuted: boolean;
  toggleMute: () => void;
  handleVolumeChange: (value: number[]) => void;
};

export const ChangeVolume: FC<ChangeVolumeProps> = ({
  className,
  handleVolumeChange,
  toggleMute,
  volume,
  isMuted,
}) => {
  return (
    <div className={clsx("relative", className)}>
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <button
            onClick={toggleMute}
            className="p-3"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="text-primary" size={24} />
            ) : (
              <Volume2 className="text-primary" size={24} />
            )}
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          align="center"
          side="top"
          className="w-44 p-3 bg-background bg-opacity-90 rounded-lg shadow-lg ml-6"
          sideOffset={10}
        >
          <div className="flex gap-x-2">
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              trackClassName="h-1 bg-gray-700"
            />
            <p>{Math.round(volume * 100)}%</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
