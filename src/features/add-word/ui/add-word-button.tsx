import { FC } from "react";

import clsx from "clsx";
import { Button } from "@/src/shared/components/ui/button";
import { BookCheckIcon, BookIcon, Loader2 } from "lucide-react";
import { useAddWord } from "../api/use-add-word";
import { AddWordBodyT } from "../model/types";
import { useCanAddWord } from "../model/use-can-add-word";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/shared/components/ui/tooltip";

type AddWordButtonProps = {
  className?: string;
} & AddWordBodyT;

export const AddWordButton: FC<AddWordButtonProps> = ({
  className,
  original,
  phrase,
  translation,
}) => {
  const canAddWord = useCanAddWord();
  const addWordMutation = useAddWord();

  const handleAddWord = async () => {
    await addWordMutation.mutateAsync({ original, phrase, translation });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            disabled={!canAddWord}
            variant="secondary"
            size="icon"
            className={clsx("", className)}
            onClick={handleAddWord}
          >
            {addWordMutation.isPending && <Loader2 className="animate-spin" />}
            {addWordMutation.isSuccess && <BookCheckIcon />}
            {addWordMutation.isIdle && <BookIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={26}>
          {canAddWord ? (
            <p>Добавить в словарик</p>
          ) : (
            <p>Войдите, \\n чтобы использовать словарик</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
