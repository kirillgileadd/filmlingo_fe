'use client';

import { FC } from 'react';

import { Container } from '@/src/shared/components/ui/container';
import { WordsSwiper } from '@/src/widgets/words-swiper';
import clsx from 'clsx';
import { LearningInTgBanner } from './learning-in-tg-banner';
import { useBreakpoint } from '@/src/shared/lib/use-breakpoint';

type LearningWordsPageProps = {
  className?: string;
};

export const LearningWordsPage: FC<LearningWordsPageProps> = ({
  className,
}) => {
  const { sm } = useBreakpoint();
  return (
    <div className={clsx('', className)}>
      <Container>
        {!sm && <h3 className="text-3xl mb-4">Тернировка слов</h3>}
        {!sm && <LearningInTgBanner />}
        <WordsSwiper />
      </Container>
    </div>
  );
};
