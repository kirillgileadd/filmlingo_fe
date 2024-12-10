import { FC, ReactNode } from "react";

import {
  SubtitlePhraseT,
  SubtitleT,
  useGetSubtitlesQuery,
} from "@/src/entities/subtitle";
import clsx from "clsx";
import { SubtitlesListRepository } from "../model/types";
import { SubtitleVariantT } from "@/src/entities/film/model/types";
import { Loader2 } from "lucide-react";

type SubtitlesListProps = {
  className?: string;
  renderSubtitle: (
    word: string,
    fullPhrase: string,
    index: number,
    phrases?: SubtitlePhraseT[] | null
  ) => ReactNode;
  filmId: number;
  acitveSubtitle: SubtitleVariantT | null;
  currentTime: number;
  subtitleListRepository: SubtitlesListRepository;
};

export const SubtitlesList: FC<SubtitlesListProps> = ({
  className,
  currentTime,
  renderSubtitle,
  subtitleListRepository,
  acitveSubtitle,
  filmId,
}) => {
  const subtitlesQuery = useGetSubtitlesQuery(filmId, acitveSubtitle);

  const getCurrentSubtitles = (track: SubtitleT[]) => {
    return track?.filter((subtitle) => {
      return (
        currentTime >= subtitle.startSeconds &&
        currentTime <= subtitle.endSeconds
      );
    });
  };

  const currentSubtitles = getCurrentSubtitles(subtitlesQuery.data ?? []);

  return (
    <div
      className={clsx(
        "absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 text-white",
        className
      )}
    >
      {subtitlesQuery.isLoading ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        currentSubtitles.map((subtitle) => (
          <div
            onMouseEnter={subtitleListRepository.pauseVideo}
            onMouseLeave={subtitleListRepository.playVideo}
            key={subtitle.id}
            className="pt-3"
          >
            <div className="subtitle py-2 px-4 rounded bg-black bg-opacity-50">
              {subtitle.text
                .split(/\s+|\n+/)
                .map((word, index) =>
                  renderSubtitle(word, subtitle.text, index, subtitle?.phrases)
                )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
