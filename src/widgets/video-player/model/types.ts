import { MutableRefObject } from "react";

export interface PlayerKeyboadrControlRepository {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  setCurrentTime: (time: number) => void;
  hideControls: () => void;
  setVolume: (voulme: number) => void;
  setIsPlaying: (value: boolean) => void;
}

export interface PlayerSaveTimeToStorageRepository {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  videoId: number;
  isLoaded: boolean;
  setCurrentTime: (time: number) => void;
}
