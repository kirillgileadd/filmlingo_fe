import {
  SubtitleVariantT,
  VideoVariantT,
} from '@/src/entities/film/model/types';
import { AddWordButton } from '@/src/features/add-word';
import { useChangeVideoVariant } from '@/src/features/change-video-quality';
import { SubtitleSelect } from '@/src/features/subtitle-select/ui/subtitle-select';
import { SubtitlesList } from '@/src/features/subtitles-list';
import { TranslateTextHoverCard } from '@/src/features/tanslate-text';
import { Slider } from '@/src/shared/components/ui/slider';
import { Loader2, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useAuthModal } from '../../auth';
import { usePlaerControls } from '../model/use-player-controls';
import { usePlayerCore } from '../model/use-player-core';
import { usePlayerKeyboardControl } from '../model/use-player-keyboadr-control';
import { useSetTimeToStorage } from '../model/use-set-time-to-storage';
import { ChangeVolume } from './change-volume';
import { PlayButton } from './play-button';
import { PlayerControls } from './player-controls';
import { PlayerFullscreenButton } from './player-fullscreen-button';
import { PlayerSettings } from './player-settings';
import { PlayerTimeDuration } from './player-time-duration';
import { useGetSubtitlesQuery } from '@/src/entities/subtitle';
import { AddPhraseButton } from '@/src/features/add-phrase';

interface VideoPlayerProps {
  videoVariants: VideoVariantT[];
  subtitlesVariants: SubtitleVariantT[];
  onClose: () => void;
  videoId: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  onClose,
  subtitlesVariants,
  videoVariants,
}) => {
  const authModal = useAuthModal();
  const [activeSubVariant, setActiveSubsVariant] =
    useState<SubtitleVariantT | null>(subtitlesVariants[0]);
  const videoVariant = useChangeVideoVariant(videoVariants);
  const subtitlesQuery = useGetSubtitlesQuery(videoId, activeSubVariant);

  const controls = usePlaerControls();
  const core = usePlayerCore(videoId, videoVariant.currentVideoVariant);

  const [subtitleShift, setSubtitleShift] = useState(0);

  useSetTimeToStorage({
    videoId,
    videoRef: core.videoRef,
    isLoaded: core.isLoaded,
    setCurrentTime: core.setCurrentTime,
  });

  usePlayerKeyboardControl({
    videoRef: core.videoRef,
    setVolume: core.setVolume,
    setIsPlaying: core.setIsPlaying,
    hideControls: controls.resetHideControlsTimeout,
    setCurrentTime: core.setCurrentTime,
    subtitlesQuery: subtitlesQuery.data ?? null,
  });

  const handleChangeSubtitleVariant = (language: string | null) => {
    const activeVariant = subtitlesVariants.find(
      (v) => v.language === language,
    );

    setActiveSubsVariant(activeVariant ?? null);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 ${
        controls.showControls ? 'cursor-auto' : 'cursor-none'
      }`}
    >
      <div
        ref={core.modalRef}
        className="relative w-full h-full max-w-screen max-h-screen flex items-center justify-center"
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-white text-3xl z-10 transition-opacity duration-300 ${
            controls.showControls
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Close modal"
        >
          <XIcon />
        </button>
        <video
          ref={core.videoRef}
          controls={false}
          className="bg-black aspect-video w-full video"
          onClick={core.togglePlayPause}
          onDoubleClick={core.toggleFullscreen}
        />
        {core.isVideoLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="animate-spin" size={60} />
          </div>
        )}
        <SubtitlesList
          subtitles={subtitlesQuery.data ?? []}
          currentTime={core.currentTime}
          subtitleShift={subtitleShift}
          subtitleListRepository={{
            pauseVideo: core.pauseVideo,
            playVideo: () => {
              if (!authModal.opened) {
                core.playVideo();
              }
            },
          }}
          renderSubtitle={(
            word,
            sourceContext,
            index,
            translate,
            ai_translate,
            ai_translate_comment,
            language,
            phrases,
          ) => (
            <TranslateTextHoverCard
              key={index}
              word={word}
              phrases={phrases}
              language={language}
              translate={translate}
              ai_translate={ai_translate}
              ai_translate_comment={ai_translate_comment}
              sourceContext={sourceContext}
              renderAddWord={({ sourceContext, translation, original }) => (
                <AddWordButton
                  sourceContext={sourceContext}
                  translation={translation}
                  original={original}
                  renderAuthForm={(trigger) => (
                    <div onClick={authModal.openAuth}>{trigger}</div>
                  )}
                />
              )}
              renderAddPhrase={({
                sourceContext,
                translation,
                original,
                type,
              }) => (
                <AddPhraseButton
                  sourceContext={sourceContext}
                  translation={translation}
                  original={original}
                  type={type}
                  renderAuthForm={(trigger) => (
                    <div onClick={authModal.openAuth}>{trigger}</div>
                  )}
                />
              )}
            >
              {word}{' '}
            </TranslateTextHoverCard>
          )}
        />
        <PlayerControls showControls={controls.showControls}>
          <PlayButton
            isPlaying={core.isPlaying}
            onClick={core.togglePlayPause}
          />
          <ChangeVolume
            isMuted={core.isMuted}
            handleVolumeChange={core.handleVolumeChange}
            volume={core.volume}
            toggleMute={core.toggleMute}
          />
          <PlayerTimeDuration
            currentTime={core.currentTime}
            duration={core.duration}
          />
          <div className="grow px-2 group py-2">
            <Slider
              value={[core.currentTime]}
              max={core.duration}
              onValueChange={core.handleSeek}
              trackClassName="h-1 bg-gray-700 group-hover:h-2 cursor-pointer transition-all duration-100"
              style={{ position: 'relative', zIndex: 10 }}
              loadedPercentage={core.loadedPercentage}
            />
          </div>
          <SubtitleSelect
            modalRef={core.modalRef.current ?? null}
            handleChangeSubtitleVariant={handleChangeSubtitleVariant}
            subtitlesVariants={subtitlesVariants ?? []}
          />
          <PlayerSettings
            subtitleShift={subtitleShift}
            handleChangeSubtitleShift={(value) => setSubtitleShift(value)}
            modalRef={core.modalRef.current ?? null}
            qualityItems={videoVariants}
            handleChangeQuality={videoVariant.handleChangeQuality}
            currentQualityLabel={videoVariant.currentVideoVariant.resolution}
          />
          <PlayerFullscreenButton
            isFullscreen={core.isFullscreen}
            onClick={core.toggleFullscreen}
          />
        </PlayerControls>
      </div>
    </div>
  );
};
