import { FC } from "react";

import clsx from "clsx";

type WordCardProps = {
  className?: string;
};

export const WordCard: FC<WordCardProps> = ({ className }) => {
  return <div className={clsx("", className)}></div>;
};
