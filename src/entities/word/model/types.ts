export type WordT = {
  id: number;
  original: string;
  translation: string;
  sourceContext?: string | null;
  createdAt: string;
};

export type GetUserWordsParamsT = {
  page: number;
  pageSize: number;
  order?: 'asc' | 'desc';
  orderValue?: keyof WordT;
};

export type GetUserWordsResT = {
  rows: WordT[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

export type WordSortSelectItemT = {
  id: number;
  label: string;
  order: 'asc' | 'desc';
  value: keyof WordT;
};
