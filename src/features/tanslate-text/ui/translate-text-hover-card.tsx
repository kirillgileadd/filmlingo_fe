import { FC, ReactNode, useEffect, useState } from "react";

import { Button } from "@/src/shared/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/shared/components/ui/hover-card";
import { useDebounce } from "@/src/shared/lib/useDebounce";
import { useModal } from "@/src/shared/lib/useModal";
import { Loader2Icon } from "lucide-react";
import { useTranslateTextMutation } from "../api/use-translate-text-mutation";

type TranslateTextHoverCardProps = {
  word: string;
  fullPhrase: string;
  children: ReactNode;
};

export const TranslateTextHoverCard: FC<TranslateTextHoverCardProps> = ({
  word,
  fullPhrase,
  children,
}) => {
  const modal = useModal();
  const [value, setValue] = useState("");
  const debounceWordTranslate = useDebounce(value, 500);
  const translateMutation = useTranslateTextMutation();
  const [currentWordTranslate, setCurrentWordTranslate] = useState("");
  const [currentPhraseTranslate, setCurrentPhraseTranslate] = useState("");

  useEffect(() => {
    const translate = async () => {
      if (debounceWordTranslate) {
        const data = await translateMutation.mutateAsync({
          targetLang: "ru",
          text: debounceWordTranslate,
        });

        setCurrentWordTranslate(data);
      }
    };

    translate();
  }, [debounceWordTranslate]);

  const translateAllPhrase = async () => {
    const data = await translateMutation.mutateAsync({
      targetLang: "ru",
      text: fullPhrase,
    });

    setCurrentPhraseTranslate(data);
  };

  const handleTranslate = (value: string) => {
    setValue(value);
  };

  return (
    <HoverCard
      open={modal.isOpen}
      onOpenChange={modal.toggleModal}
      openDelay={500}
      closeDelay={500}
    >
      <HoverCardTrigger asChild={true}>
        <span
          className="text-3xl px-1 hover:bg-primary hover:text-secondary rounded inline-block relative"
          onMouseEnter={() => handleTranslate(word)}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent side="top" sideOffset={20} className="w-120">
        <div className="flex flex-col ">
          {translateMutation.isPending && modal.isOpen ? (
            <Loader2Icon className="animate-spin mb-2" />
          ) : (
            <div className="mb-2">
              <p className="text-2xl">{currentWordTranslate}</p>
              {currentPhraseTranslate && (
                <p className="text-sm mt-1">{currentPhraseTranslate}</p>
              )}
            </div>
          )}
          <Button onClick={translateAllPhrase} size="sm" className="w-fit">
            Перевести всю фразу
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
