export type SubtitleJST = {
  endSeconds: number;
  endTime: string;
  id: string;
  startSeconds: number;
  startTime: string;
  text: string;
};

export interface SubtitleYoutubeT {
  text: string;
  duration: number;
  offset: number;
  endSeconds: number;
  startSeconds: number;
  lang?: string;
}

export type ParsedSubtitleT = {
  id: number;
  data: SubtitleJST[];
  language: string;
  languageLabel: string;
};
