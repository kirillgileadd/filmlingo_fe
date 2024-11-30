import { FC } from "react";

import { Container } from "@/src/shared/components/ui/container";
import { WordsSwiper } from "@/src/widgets/words-swiper";
import clsx from "clsx";
import { LearningInTgBanner } from "./learning-in-tg-banner";

type LearningWordsPageProps = {
  className?: string;
};

export const LearningWordsPage: FC<LearningWordsPageProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <Container>
        <h3 className="text-3xl mb-4">Тернировка слов</h3>
        <LearningInTgBanner />
        <WordsSwiper />
      </Container>
    </div>
  );
};
