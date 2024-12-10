import { FC, useMemo } from "react";

import clsx from "clsx";
import dayjs from "dayjs";
import { WordT } from "../model/types";
import { RemoveUserWordButton } from "./remove-user-word-button";

type WordCardProps = {
  className?: string;
  word: WordT;
};

export const WordCard: FC<WordCardProps> = ({ className, word }) => {
  const highlightedPhrase = useMemo(() => {
    const regex = new RegExp(`(${word.original})`, "gi");

    const parts = word.phrase?.split(regex);

    return parts?.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold text-primary">
          {part}
        </span>
      ) : (
        part
      )
    );
  }, [word.phrase, word.original]);

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
      <td className="font-medium">{highlightedPhrase}</td>
      <td>{dayjs(word.createdAt).format("DD.MM.YYYY")}</td>
      <td>
        <RemoveUserWordButton wordId={word.id} />
      </td>
    </tr>
  );
};
