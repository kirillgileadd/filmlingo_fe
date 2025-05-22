export type PhraseT = {
  id: number;
  original: string;
  translation: string;
  type: 'idiom' | 'phrasal_verb';
  createdAt: string;
  updatedAt: string;
};

export type GetUserPhrasesParamsT = {
  page: number;
  pageSize: number;
  order?: 'asc' | 'desc';
  orderValue?: keyof PhraseT;
};

export type GetUserPhrasesResT = {
  rows: PhraseT[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

export type PhraseSortSelectItemT = {
  id: number;
  label: string;
  order: 'asc' | 'desc';
  value: keyof PhraseT;
};
