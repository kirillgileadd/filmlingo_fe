import { useEffect } from "react";
import { CURRENT_VIDEO_TIME } from "./const";
import { PlayerSaveTimeToStorageRepository } from "./types";

export const useSetTimeToStorage = (
  repository: PlayerSaveTimeToStorageRepository
) => {
  useEffect(() => {
    const video = repository.videoRef.current;
    if (!video) return;
    if (!repository.isLoaded) return;

    const handleTimeUpdate = () => {
      repository.setCurrentTime(video.currentTime);
      handleSetCurrentTimeToStorage(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [repository.isLoaded]);

  const handleSetCurrentTimeToStorage = (currentTime: number) => {
    const storageObj = {
      id: repository.videoId,
      currentTime: currentTime,
    };

    localStorage.setItem(CURRENT_VIDEO_TIME, JSON.stringify(storageObj));
  };
};
