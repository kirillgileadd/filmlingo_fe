import { SubtitleT, VideoVariantT } from "@/src/entities/film/model/types";
import { useGetSubtitlesDataQuery } from "@/src/entities/subtitle";
import { useChangeVideoVariant } from "@/src/features/change-video-quality";
import { SubtitleSelect } from "@/src/features/subtitle-select/ui/subtitle-select";
import { SubtitlesList } from "@/src/features/subtitles-list";
import { TranslateTextHoverCard } from "@/src/features/tanslate-text";
import { Slider } from "@/src/shared/components/ui/slider";
import { Loader2, XIcon } from "lucide-react";
import React, { useState } from "react";
import { usePlaerControls } from "../model/usePlayerControls";
import { usePlayerCore } from "../model/usePlayerCore";
import { usePlayerKeyboadrControl } from "../model/usePlayerKeyboadrControl";
import { useSetTimeToStorage } from "../model/useSetTimeToStorage";
import { ChangeVolume } from "./change-volume";
import { PlayButton } from "./play-button";
import { PlayerControls } from "./player-controls";
import { PlayerFullscreenButton } from "./player-fullscreen-button";
import { PlayerSettings } from "./player-settings";
import { PlayerTimeDuration } from "./player-time-duration";

interface VideoPlayerProps {
  videoVariants: VideoVariantT[];
  subtitles: SubtitleT[];
  onClose: () => void;
  videoId: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  onClose,
  subtitles,
  videoVariants,
}) => {
  const [activeSubTrack, setActiveSubsTrack] = useState<number | null>(
    subtitles[0].id
  );
  const videoVariant = useChangeVideoVariant(videoVariants);
  const subtitlesQuery = useGetSubtitlesDataQuery(subtitles);

  const core = usePlayerCore(videoId, videoVariant.currentVideoVariant);
  const contorls = usePlaerControls();

  useSetTimeToStorage({
    videoId,
    videoRef: core.videoRef,
    isLoaded: core.isLoaded,
    setCurrentTime: core.setCurrentTime,
  });

  usePlayerKeyboadrControl({
    videoRef: core.videoRef,
    setVolume: core.setVolume,
    setIsPlaying: core.setIsPlaying,
    hideControls: contorls.resetHideControlsTimeout,
    setCurrentTime: core.setCurrentTime,
  });

  const handleChangeSubtitleTrack = (id: number | null) => {
    setActiveSubsTrack(id);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 ${
        contorls.showControls ? "cursor-auto" : "cursor-none"
      }`}
    >
      <div
        ref={core.modalRef}
        className="relative w-full h-full max-w-screen max-h-screen flex items-center justify-center"
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-white text-3xl z-10 transition-opacity duration-300 ${
            contorls.showControls
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
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
        />
        {core.isVideoLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="animate-spin" size={60} />
          </div>
        )}
        <SubtitlesList
          currentTime={core.currentTime}
          activeSubTrackId={activeSubTrack ?? 0}
          subtitleListRepository={{
            pauseVideo: core.pauseVideo,
            playVideo: core.playVideo,
          }}
          subtitles={subtitlesQuery.data ?? []}
          renderSubtitle={(word, fullPhrase, index) => (
            <TranslateTextHoverCard
              key={index}
              word={word}
              fullPhrase={fullPhrase}
            >
              {word}{" "}
            </TranslateTextHoverCard>
          )}
        />
        <PlayerControls showControls={contorls.showControls}>
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
              style={{ position: "relative", zIndex: 10 }}
              loadedPercentage={core.loadedPercentage}
            />
          </div>
          <SubtitleSelect
            handleChangeSubtitleTrack={handleChangeSubtitleTrack}
            subtitles={subtitlesQuery.data ?? []}
          />
          <PlayerSettings
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
