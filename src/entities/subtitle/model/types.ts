export type SubtitlePhraseT = {
  original: string;
  translate: string;
};

export type SubtitleT = {
  createdAt: string | null;
  endTime: string | null;
  filmId: number;
  id: number;
  language: string;
  phrases: SubtitlePhraseT[] | null;
  startTime: string | null;
  text: string;
  updatedAt: string | null;
  startSeconds: number;
  endSeconds: number;
};

export interface SubtitleYoutubeT {
  duration: number;
  endSeconds: number;
  lang?: string;
  offset: number;
  startSeconds: number;
  text: string;
}
