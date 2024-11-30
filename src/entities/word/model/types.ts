export type WordT = {
  id: number;
  original: string;
  translation: string;
  phrase?: string | null;
  createdAt: string;
};

export type GetUserWorsParamsT = {
  page: number;
  pageSize: number;
  order?: "asc" | "desc";
  orderValue?: keyof WordT;
};

export type GetUserWorsResT = {
  rows: WordT[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

export type WordSortSelectItemT = {
  id: number;
  label: string;
  order: "asc" | "desc";
  value: keyof WordT;
};
