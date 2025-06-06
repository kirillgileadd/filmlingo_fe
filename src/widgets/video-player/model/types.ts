import { MutableRefObject } from 'react';
import { SubtitleT } from '@/src/entities/subtitle';

export interface PlayerKeyboardControlRepository {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  setCurrentTime: (time: number) => void;
  hideControls: () => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (value: boolean) => void;
  subtitlesQuery: SubtitleT[] | null;
}

export interface PlayerSaveTimeToStorageRepository {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  videoId: number;
  isLoaded: boolean;
  setCurrentTime: (time: number) => void;
}
