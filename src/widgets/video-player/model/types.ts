export interface PlayerKeyboadrControlRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoRef: any;
  setCurrentTime: (time: number) => void;
  hideControls: () => void;
  setVolume: (voulme: number) => void;
  setIsPlaying: (value: boolean) => void;
}

export interface PlayerSaveTimeToStorageRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoRef: any;
  videoId: number;
  isLoaded: boolean;
  setCurrentTime: (time: number) => void;
}
