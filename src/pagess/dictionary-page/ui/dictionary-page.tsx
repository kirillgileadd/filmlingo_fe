"use client";

import { FC, useState } from "react";

import {
  SORT_WORDS_SELECT_ITEMS,
  SortWordsSelect,
  useGetUserWords,
  WordCard,
} from "@/src/entities/word";
import { PaginationCommon } from "@/src/shared/components/common/pagination-common";
import { Container } from "@/src/shared/components/ui/container";
import { useAuth } from "@/src/shared/lib/auth";
import { withClientOnly } from "@/src/shared/lib/withClientOnly";
import clsx from "clsx";
import { DictionaryPageError } from "./dictionary-page-error";
import { DictionaryPageNoAuth } from "./dictionary-page-no-auth";
import { DictionaryPageSkeleton } from "./dictionary-page-skeleton";

import styles from "./dictionary-page.module.scss";
import { Button } from "@/src/shared/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/src/shared/lib/const";

type DictionaryPageProps = {
  className?: string;
};

const DictionaryPageConponent: FC<DictionaryPageProps> = ({ className }) => {
  const [sort, setSort] = useState(SORT_WORDS_SELECT_ITEMS[0]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { isAuth } = useAuth();

  const wordsQuery = useGetUserWords({
    page,
    pageSize,
    order: sort.order,
    orderValue: sort.value,
  });

  if (!isAuth) {
    return <DictionaryPageNoAuth />;
  }

  if (wordsQuery.isLoading) {
    return <DictionaryPageSkeleton className={className} />;
  }

  if (wordsQuery.error) {
    return <DictionaryPageError />;
  }

  if (!wordsQuery.data) return null;


  return (
    <div className={clsx("pb-10", className)}>
      <Container className="m-auto" size="small">
        <div className="flex justify-between mb-4">
          <h3 className="text-3xl">Мой словарик</h3>
          <div className="flex gap-x-4">
            <SortWordsSelect value={sort} onChange={setSort} />
            <Link href={ROUTES.LEARNING}>
              <Button>Тренировать слова</Button>
            </Link>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Слово</th>
              <th>Фраза</th>
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
      </Container>
    </div>
  );
};

export const DictionaryPage = withClientOnly(DictionaryPageConponent);
