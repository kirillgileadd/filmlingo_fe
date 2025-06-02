import { useCallback, useEffect } from 'react';
import { CURRENT_VIDEO_TIME } from './const';
import { PlayerSaveTimeToStorageRepository } from './types';

export const useSetTimeToStorage = (
  repository: PlayerSaveTimeToStorageRepository,
) => {
  const handleSetCurrentTimeToStorage = useCallback(
    (currentTime: number) => {
      const storageObj = {
        id: repository.videoId,
        currentTime: currentTime,
      };

      localStorage.setItem(CURRENT_VIDEO_TIME, JSON.stringify(storageObj));
    },
    [repository.videoId],
  );

  useEffect(() => {
    if (!repository.videoRef?.current) return;

    const video = repository.videoRef.current;
    if (!video) return;
    if (!repository.isLoaded) return;

    const handleTimeUpdate = () => {
      repository.setCurrentTime(video.currentTime);
      handleSetCurrentTimeToStorage(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [handleSetCurrentTimeToStorage, repository, repository.isLoaded]);
};
