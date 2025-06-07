import { PhraseT } from '@/src/entities/phrase';
import { AxiosError } from 'axios';

export type AddPhraseBodyT = {
  original: string;
  translation: string;
  sourceContext: string;
  type: 'idiom' | 'phrasal_verb';
};

export type AddPhraseResT = PhraseT;

export type AddPhraseErrorT = AxiosError<{ message: string }>;
