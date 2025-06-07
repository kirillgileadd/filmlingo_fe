import clsx from 'clsx';
import { FC, useState } from 'react';
import {
  SORT_WORDS_SELECT_ITEMS,
  SortWordsSelect,
  useGetUserWords,
  WordCard,
} from '@/src/entities/word';
import { DictionaryPageSkeleton } from './dictionary-page-skeleton';
import { DictionaryPageError } from './dictionary-page-error';
import { appSessionStore } from '@/src/shared/session';
import Link from 'next/link';
import { ROUTES } from '@/src/shared/lib/const';
import { Button } from '@/src/shared/components/ui/button';
import styles from './dictionary-page.module.scss';
import { PaginationCommon } from '@/src/shared/components/common/pagination-common';

type WordsTabProps = {
  className?: string;
};

export const WordsTab: FC<WordsTabProps> = ({ className }) => {
  const session = appSessionStore.useSession();
  const [sort, setSort] = useState(SORT_WORDS_SELECT_ITEMS[0]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const wordsQuery = useGetUserWords(
    {
      page,
      pageSize,
      order: sort.order,
      orderValue: sort.value,
    },
    !!session,
  );

  if (wordsQuery.isLoading) {
    return <DictionaryPageSkeleton className={className} />;
  }

  if (wordsQuery.error) {
    return <DictionaryPageError />;
  }

  if (wordsQuery.data?.rows.length === 0) {
    return (
      <div className={clsx('pb-10', className)}>
        <div>
          <p className="text-xl mb-4">Вы еще не добавили слова в словарик</p>
          <Link href={ROUTES.HOME}>
            <Button>Начать смотреть !</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!wordsQuery.data) return null;

  return (
    <div className={clsx('', className)}>
      <div className="flex gap-x-4">
        <SortWordsSelect value={sort} onChange={setSort} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Слово</th>
            <th>Контекст</th>
            <th>Дата добавления</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {wordsQuery.data?.rows.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </tbody>
      </table>
      <PaginationCommon
        currentPage={page}
        onPageChange={setPage}
        totalPages={wordsQuery.data.totalPages}
      />
    </div>
  );
};
