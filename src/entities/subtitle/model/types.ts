export type SubtitleJST = {
  endSeconds: number;
  endTime: string;
  id: string;
  startSeconds: number;
  startTime: string;
  text: string;
};

export type SubtitlePhraseT = {
  original: string;
  translate: string;
};

export type SubtitleT = {
  createdAt: string;
  endTime: string;
  filmId: number;
  id: number;
  language: string;
  phrases: SubtitlePhraseT[] | null;
  startTime: string;
  text: string;
  updatedAt: string;
  startSeconds: number;
  endSeconds: number;
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
