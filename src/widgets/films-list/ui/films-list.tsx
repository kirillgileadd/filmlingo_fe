'use client';

import { FC } from 'react';

import { FilmCard, useGetFilmsQuery } from '@/src/entities/film';
import { Container } from '@/src/shared/components/ui/container';
import clsx from 'clsx';
import { FrownIcon } from 'lucide-react';
import { FilmsListSkeleton } from './films-list-skeleton';

type FilmsListProps = {
  className?: string;
};

export const FilmsList: FC<FilmsListProps> = ({ className }) => {
  const filmsQuery = useGetFilmsQuery();

  if (filmsQuery.isLoading) {
    return <FilmsListSkeleton />;
  }

  if (filmsQuery.error) {
    return (
      <Container className="flex justify-center flex-col items-center gap-y-4 h-full mt-14">
        <FrownIcon size={60} />
        <h4 className="text-2xl">Не удалось загрузить список фильмов</h4>
      </Container>
    );
  }

  return (
    <div className={clsx('', className)}>
      <Container>
        <div className="mb-4 grid gap-4 w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {filmsQuery.data?.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      </Container>
    </div>
  );
};
