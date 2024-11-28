import { FC, ReactNode } from "react";

import clsx from "clsx";
import { WordT } from "../model/types";

type WordCardProps = {
  className?: string;
  word: WordT;
  removeUserWord: (wordId: number) => ReactNode;
};

export const WordCard: FC<WordCardProps> = ({
  className,
  word,
  removeUserWord,
}) => {
  return (
    <tr className={clsx("", className)}>
      <td>
        <div>
          <p className="text-lg font-medium">{word.original.toLowerCase()}</p>
          <p className="text-sm text-gray-400">
            {word.translation.toLowerCase()}
          </p>
        </div>
      </td>
      <td className="font-medium">{word.phrase}</td>
      <td>{word.creationAt}</td>
      <td>{removeUserWord(word.id)}</td>
    </tr>
  );
};
