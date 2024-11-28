"use client";

import { FC, useState } from "react";

import { useGetUserWords, WordCard } from "@/src/entities/word";
import { PaginationCommon } from "@/src/shared/components/common/pagination-common";
import { Container } from "@/src/shared/components/ui/container";
import { useAuth } from "@/src/shared/lib/auth";
import { withClientOnly } from "@/src/shared/lib/withClientOnly";
import clsx from "clsx";
import { DictionaryPageError } from "./dictionary-page-error";
import { DictionaryPageNoAuth } from "./dictionary-page-no-auth";
import { DictionaryPageSkeleton } from "./dictionary-page-skeleton";

type DictionaryPageProps = {
  className?: string;
};

const DictionaryPageConponent: FC<DictionaryPageProps> = ({ className }) => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { isAuth } = useAuth();
  const wordsQuery = useGetUserWords({ page, pageSize });

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
    <div className={clsx("", className)}>
      <Container className="m-auto" size="small">
        <h3 className="text-3xl mb-4">Мой словарик</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th>Слово</th>
              <th>Фраза</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {wordsQuery.data?.rows.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                removeUserWord={() => <div>rem</div>}
              />
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
