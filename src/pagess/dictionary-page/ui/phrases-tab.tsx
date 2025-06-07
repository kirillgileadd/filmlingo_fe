import clsx from 'clsx';
import { FC, useState } from 'react';
import {
  PhraseCard,
  SORT_PHRASES_SELECT_ITEMS,
  SortPhrasesSelect,
  useGetUserPhrases,
} from '@/src/entities/phrase';
import { DictionaryPageSkeleton } from './dictionary-page-skeleton';
import { DictionaryPageError } from './dictionary-page-error';
import { appSessionStore } from '@/src/shared/session';
import Link from 'next/link';
import { ROUTES } from '@/src/shared/lib/const';
import { Button } from '@/src/shared/components/ui/button';
import styles from './dictionary-page.module.scss';
import { PaginationCommon } from '@/src/shared/components/common/pagination-common';

type PhrasesTabProps = {
  className?: string;
};

export const PhrasesTab: FC<PhrasesTabProps> = ({ className }) => {
  const session = appSessionStore.useSession();
  const [sort, setSort] = useState(SORT_PHRASES_SELECT_ITEMS[0]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const phrasesQuery = useGetUserPhrases(
    {
      page,
      pageSize,
      order: sort.order,
      orderValue: sort.value,
    },
    !!session,
  );

  if (phrasesQuery.isLoading) {
    return <DictionaryPageSkeleton className={className} />;
  }

  if (phrasesQuery.error) {
    return <DictionaryPageError />;
  }

  if (phrasesQuery.data?.rows.length === 0) {
    return (
      <div className={clsx('pb-10', className)}>
        <div>
          <p className="text-xl mb-4">Вы еще не добавили фразы в словарик</p>
          <Link href={ROUTES.HOME}>
            <Button>Начать смотреть !</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!phrasesQuery.data) return null;

  return (
    <div className={clsx('', className)}>
      <div className="flex gap-x-4">
        <SortPhrasesSelect value={sort} onChange={setSort} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Фраза</th>
            <th>Контекст</th>
            <th>Дата добавления</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {phrasesQuery.data?.rows.map((phrase) => (
            <PhraseCard key={phrase.id} phrase={phrase} />
          ))}
        </tbody>
      </table>
      <PaginationCommon
        currentPage={page}
        onPageChange={setPage}
        totalPages={phrasesQuery.data.totalPages}
      />
    </div>
  );
};
