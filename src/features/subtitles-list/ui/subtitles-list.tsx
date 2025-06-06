import { FC, ReactNode } from 'react';

import { SubtitlePhraseT, SubtitleT } from '@/src/entities/subtitle';
import clsx from 'clsx';
import { SubtitlesListRepository } from '../model/types';
import { Loader2 } from 'lucide-react';

type SubtitlesListProps = {
  className?: string;
  renderSubtitle: (
    word: string,
    sourceContext: string,
    index: number,
    translate: string | null,
    ai_translate: string | null,
    ai_translate_comment: string | null,
    language: string,
    phrases?: SubtitlePhraseT[] | null,
  ) => ReactNode;
  currentTime: number;
  subtitleListRepository: SubtitlesListRepository;
  subtitles: SubtitleT[];
};

export const SubtitlesList: FC<SubtitlesListProps> = ({
  className,
  currentTime,
  renderSubtitle,
  subtitleListRepository,
  subtitles,
}) => {
  const getCurrentSubtitle = (track: SubtitleT[]) => {
    return (
      track?.find((subtitle) => {
        return (
          currentTime >= subtitle.startSeconds &&
          currentTime <= subtitle.endSeconds
        );
      }) ?? null
    );
  };

  const currentSubtitle = getCurrentSubtitle(subtitles);

  return (
    <div
      className={clsx(
        'absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 text-white',
        className,
      )}
    >
      {!subtitles ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        currentSubtitle && (
          <div
            onMouseEnter={subtitleListRepository.pauseVideo}
            onMouseLeave={subtitleListRepository.playVideo}
            key={currentSubtitle.id}
            className="pt-3"
          >
            <div className="subtitle py-2 px-4 rounded bg-black bg-opacity-50">
              {currentSubtitle.text
                .split(/\s+|\n+/)
                .map((word, index) =>
                  renderSubtitle(
                    word,
                    currentSubtitle.text,
                    index,
                    currentSubtitle.translate,
                    currentSubtitle.ai_translate,
                    currentSubtitle.ai_translate_comment,
                    currentSubtitle.language,
                    currentSubtitle?.phrases,
                  ),
                )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
