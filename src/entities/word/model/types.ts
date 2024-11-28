export type WordT = {
  id: number;
  original: string;
  translation: string;
  phrase?: string | null;
  creationAt: string;
};

export type GetUserWorsParamsT = {
  page: number;
  pageSize: number;
};

export type GetUserWorsResT = {
  rows: WordT[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};
