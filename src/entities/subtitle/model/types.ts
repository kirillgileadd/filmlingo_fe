export type SubtitlePhraseT = {
  id: number;
  original: string;
  translation: string;
  type: 'idiom' | 'phrasal_verb';
  createdAt: string;
  updatedAt: string;
};

export type SubtitleT = {
  createdAt: string | null;
  endTime: string | null;
  filmId: number;
  id: number;
  language: string;
  phrases: SubtitlePhraseT[] | null;
  translate: string | null;
  startTime: string | null;
  text: string;
  updatedAt: string | null;
  startSeconds: number;
  endSeconds: number;
  ai_translate: string | null;
  ai_translate_comment: string | null;
};

export interface SubtitleYoutubeT {
  duration: number;
  endSeconds: string;
  lang?: string;
  offset: number;
  startSeconds: string;
  text: string;
}
