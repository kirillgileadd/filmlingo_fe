import { WordT } from '@/src/entities/word';

export type GetRandomWordRes = {
  words: WordT[];
  totalCount: string;
  returnedCount: string;
};
