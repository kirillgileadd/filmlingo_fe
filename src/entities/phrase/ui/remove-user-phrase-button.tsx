import { FC } from 'react';

import clsx from 'clsx';
import { useRemoveUserPhrase } from '../api/use-remove-user-phrase';
import { Button } from '@/src/shared/components/ui/button';
import { Loader2, Trash2Icon } from 'lucide-react';

type RemoveUserPhraseButtonProps = {
  className?: string;
  wordId: number;
};

export const RemoveUserPhraseButton: FC<RemoveUserPhraseButtonProps> = ({
  className,
  wordId,
}) => {
  const removeUserPhraseMutation = useRemoveUserPhrase();

  const handleRemove = () => {
    removeUserPhraseMutation.mutate(wordId);
  };

  return (
    <Button
      size="icon"
      variant="outline"
      className={clsx('', className)}
      onClick={handleRemove}
    >
      {removeUserPhraseMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Trash2Icon />
      )}
    </Button>
  );
};
