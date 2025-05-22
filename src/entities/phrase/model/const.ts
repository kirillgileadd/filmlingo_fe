import { PhraseSortSelectItemT } from './types';

export const SORT_PHRASES_SELECT_ITEMS: PhraseSortSelectItemT[] = [
  { id: 1, label: 'По дате добавления ⬇', order: 'desc', value: 'createdAt' },
  { id: 2, label: 'По дате добавления ⬆', order: 'asc', value: 'createdAt' },
];
