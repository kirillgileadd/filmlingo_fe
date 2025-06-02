import { WordSortSelectItemT } from './types';

export const SORT_WORDS_SELECT_ITEMS: WordSortSelectItemT[] = [
  { id: 1, label: 'По дате добавления ⬇', order: 'desc', value: 'createdAt' },
  { id: 2, label: 'По дате добавления ⬆', order: 'asc', value: 'createdAt' },
];
