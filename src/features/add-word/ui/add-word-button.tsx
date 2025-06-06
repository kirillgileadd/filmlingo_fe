import { FC, ReactNode, useCallback, useMemo } from 'react';

import { Button } from '@/src/shared/components/ui/button';
import clsx from 'clsx';
import { BookCheckIcon, BookIcon, Loader2 } from 'lucide-react';
import { useAddWord } from '../api/use-add-word';
import { AddWordBodyT } from '../model/types';
import { useCanAddWord } from '../model/use-can-add-word';

type AddWordButtonProps = {
  className?: string;
  renderAuthForm: (trigger: ReactNode) => ReactNode;
} & AddWordBodyT;

export const AddWordButton: FC<AddWordButtonProps> = ({
  className,
  original,
  sourceContext,
  translation,
  renderAuthForm,
}) => {
  const canAddWord = useCanAddWord();
  const addWordMutation = useAddWord();

  const handleAddWord = useCallback(() => {
    addWordMutation.mutate({ original, sourceContext, translation });
  }, [addWordMutation, original, sourceContext, translation]);

  const renderButton = useMemo(() => {
    return (
      <Button
        variant="secondary"
        size="icon"
        onClick={handleAddWord}
        className={clsx('', className)}
      >
        {addWordMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : addWordMutation.isSuccess ? (
          <BookCheckIcon />
        ) : (
          <BookIcon />
        )}
      </Button>
    );
  }, [
    addWordMutation.isPending,
    addWordMutation.isSuccess,
    className,
    handleAddWord,
  ]);

  if (!canAddWord) {
    return renderAuthForm(renderButton);
  }

  return renderButton;
};
