import { FC, ReactNode, useCallback, useMemo } from 'react';

import { Button } from '@/src/shared/components/ui/button';
import clsx from 'clsx';
import { BookCheckIcon, BookIcon, Loader2 } from 'lucide-react';
import { useAddPhrase } from '../api/use-add-phrase';
import { AddPhraseBodyT } from '../model/types';
import { useCanAddPhrase } from '../model/use-can-add-phrase';

type AddPhraseButtonProps = {
  className?: string;
  renderAuthForm: (trigger: ReactNode) => ReactNode;
} & AddPhraseBodyT;

export const AddPhraseButton: FC<AddPhraseButtonProps> = ({
  className,
  original,
  sourceContext,
  translation,
  type,
  renderAuthForm,
}) => {
  const canAddPhrase = useCanAddPhrase();
  const addPhraseMutation = useAddPhrase();

  const handleAddPhrase = useCallback(() => {
    addPhraseMutation.mutate({ original, sourceContext, translation, type });
  }, [addPhraseMutation, original, sourceContext, translation]);

  const renderButton = useMemo(() => {
    return (
      <Button
        variant="secondary"
        size="icon"
        onClick={handleAddPhrase}
        className={clsx('', className)}
      >
        {addPhraseMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : addPhraseMutation.isSuccess ? (
          <BookCheckIcon />
        ) : (
          <BookIcon />
        )}
      </Button>
    );
  }, [
    addPhraseMutation.isPending,
    addPhraseMutation.isSuccess,
    className,
    handleAddPhrase,
  ]);

  if (!canAddPhrase) {
    return renderAuthForm(renderButton);
  }

  return renderButton;
};
