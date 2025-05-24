import { FC, useMemo } from 'react';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { PhraseT } from '../model/types';
import { RemoveUserPhraseButton } from './remove-user-phrase-button';

type PhraseCardProps = {
  className?: string;
  phrase: PhraseT;
};

export const PhraseCard: FC<PhraseCardProps> = ({ className, phrase }) => {
  const highlightedPhrase = useMemo(() => {
    const regex = new RegExp(`(${phrase.original})`, 'gi');

    const parts = phrase.sourceContext?.split(regex);

    return parts?.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold text-primary">
          {part}
        </span>
      ) : (
        part
      ),
    );
  }, [phrase.sourceContext, phrase.original]);

  return (
    <tr className={clsx('', className)}>
      <td>
        <div>
          <p className="text-lg font-medium">{phrase.original.toLowerCase()}</p>
          <p className="text-sm text-gray-400">
            {phrase.translation.toLowerCase()}
          </p>
        </div>
      </td>
      <td className="font-medium">{highlightedPhrase}</td>
      <td>{dayjs(phrase.createdAt).format('DD.MM.YYYY')}</td>
      <td>
        <RemoveUserPhraseButton phraseId={phrase.id} />
      </td>
    </tr>
  );
};
