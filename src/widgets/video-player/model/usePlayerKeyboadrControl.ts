import { useEffect } from "react";
import { PlayerKeyboadrControlRepository } from "./types";

export const usePlayerKeyboadrControl = (
  repository: PlayerKeyboadrControlRepository
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!repository.videoRef.current) return;

      switch (event.key) {
        case "ArrowRight":
          const newTimeForward = Math.min(
            repository.videoRef.current.currentTime + 10,
            repository.videoRef.current.duration
          );
          repository.videoRef.current.currentTime = newTimeForward;
          repository.setCurrentTime(newTimeForward);
          break;

        case "ArrowLeft":
          const newTimeBackward = Math.max(
            repository.videoRef.current.currentTime - 10,
            0
          );
          repository.videoRef.current.currentTime = newTimeBackward;
          repository.setCurrentTime(newTimeBackward);
          break;

        case "ArrowDown":
          const newVolumeDown =
            repository.videoRef.current.volume > 0.1
              ? repository.videoRef.current.volume - 0.1
              : 0;
          repository.videoRef.current.volume = newVolumeDown;
          repository.setVolume(newVolumeDown);
          break;

        case "ArrowUp":
          const newVolumeUp =
            repository.videoRef.current.volume < 0.9
              ? repository.videoRef.current.volume + 0.1
              : 1;
          repository.videoRef.current.volume = newVolumeUp;
          repository.setVolume(newVolumeUp);
          break;

        case " ":
          event.preventDefault();
          if (repository.videoRef.current.paused) {
            repository.videoRef.current.play();
            repository.setIsPlaying(true);
          } else {
            repository.videoRef.current.pause();
            repository.hideControls();
            repository.setIsPlaying(false);
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [repository.setIsPlaying, repository.setCurrentTime, repository.videoRef]);
};
