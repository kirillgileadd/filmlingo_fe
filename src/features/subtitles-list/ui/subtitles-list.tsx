import { FC, ReactNode } from "react";

import { ParsedSubtitleT } from "@/src/entities/subtitle";
import { SubtitlesListRepository } from "../model/types";
import clsx from "clsx";

type SubtitlesListProps = {
  className?: string;
  renderSubtitle: (
    word: string,
    fullPhrase: string,
    index: number
  ) => ReactNode;
  subtitles: ParsedSubtitleT[];
  activeSubTrackId: number;
  currentTime: number;
  subtitleListRepository: SubtitlesListRepository;
};

export const SubtitlesList: FC<SubtitlesListProps> = ({
  className,
  subtitles,
  activeSubTrackId,
  currentTime,
  renderSubtitle,
  subtitleListRepository,
}) => {
  const getCurrentSubtitlesData = (): ParsedSubtitleT | null => {
    if (!subtitles) return null;

    return subtitles.find((item) => activeSubTrackId === item.id) ?? null;
  };

  const getCurrentSubtitles = (track: ParsedSubtitleT | null) => {
    if (!track) return;

    return track.data.filter(
      (subtitle) =>
        currentTime >= subtitle.startSeconds &&
        currentTime <= subtitle.endSeconds
    );
  };

  const currentTrack = getCurrentSubtitlesData();
  const currentSubtitles = getCurrentSubtitles(currentTrack);

  if (!currentTrack) return;
  if (!currentSubtitles) return <></>;

  return (
    <div
      className={clsx(
        "absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 text-white",
        className
      )}
    >
      {currentSubtitles.map((subtitle) => (
        <div
          onMouseEnter={subtitleListRepository.pauseVideo}
          onMouseLeave={subtitleListRepository.playVideo}
          key={subtitle.id}
          className="pt-20"
        >
          <div className="subtitle py-2 px-4 rounded bg-black bg-opacity-50">
            {subtitle.text.split(/\s+|\n+/).map((word, index) => (
              <>{renderSubtitle(word, subtitle.text, index)}</>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
