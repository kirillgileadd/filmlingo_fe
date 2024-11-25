import { FC } from "react";

import { Feedback } from "@/src/widgets/feedback/ui/feedback";
import { FilmsList } from "@/src/widgets/films-list/ui/films-list";
import clsx from "clsx";

type HomePageProps = {
  className?: string;
};

export const HomePage: FC<HomePageProps> = ({ className }) => {
  return (
    <div className={clsx("", className)}>
      <Feedback className="mb-4" />
      <FilmsList />
    </div>
  );
};
