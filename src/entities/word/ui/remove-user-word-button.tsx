import { FC } from "react";

import clsx from "clsx";
import { useRemoveUserWord } from "../api/use-remove-user-word";
import { Button } from "@/src/shared/components/ui/button";
import { Loader2, Trash2Icon } from "lucide-react";

type RemoveUserWordButtonProps = {
  className?: string;
  wordId: number;
};

export const RemoveUserWordButton: FC<RemoveUserWordButtonProps> = ({
  className,
  wordId,
}) => {
  const removeUserWordMutation = useRemoveUserWord();

  const handleRemove = () => {
    removeUserWordMutation.mutate(wordId);
  };

  return (
    <Button
      size="icon"
      variant="outline"
      className={clsx("", className)}
      onClick={handleRemove}
    >
      {removeUserWordMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Trash2Icon />
      )}
    </Button>
  );
};
