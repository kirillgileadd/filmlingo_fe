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
import { SubtitlePhraseT } from "@/src/entities/subtitle";

type TranslateTextHoverCardProps = {
  word: string;
  fullPhrase: string;
  phrases?: SubtitlePhraseT[] | null;
  children: ReactNode;
  renderAddWord: (params: {
    original: string;
    phrase: string;
    translation: string;
  }) => ReactNode;
};

export const TranslateTextHoverCard: FC<TranslateTextHoverCardProps> = ({
  word,
  fullPhrase,
  children,
  renderAddWord,
  phrases,
}) => {
  const modal = useModal();
  const [value, setValue] = useState("");
  const debounceWordTranslate = useDebounce(value, 500);
  const translateMutation = useTranslateTextMutation();
  const [currentWordTranslate, setCurrentWordTranslate] = useState("");
  const [currentPhraseTranslate, setCurrentPhraseTranslate] = useState("");
  const [
    currentHighlightedPhraseTranslate,
    setCurrentHighlightedPhraseTranslate,
  ] = useState<string | null>("");
  const [highlightedPhrase, setHighlightedPhrase] = useState<string | null>(
    null
  );

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

  const handleHighlightPhrase = async (word: string) => {
    if (phrases) {
      const matchedPhrase = phrases.find((phrase) =>
        phrase.original.includes(word)
      );
      if (matchedPhrase) {
        setHighlightedPhrase(matchedPhrase.original);
        setCurrentHighlightedPhraseTranslate(matchedPhrase.translate);
      } else {
        setHighlightedPhrase(null);
        setCurrentHighlightedPhraseTranslate(null);
      }
    }
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
          className="text-3xl px-1 hover:bg-foreground hover:text-secondary rounded inline-block relative"
          onMouseEnter={() => {
            handleTranslate(word);
            handleHighlightPhrase(word);
          }}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent side="top" sideOffset={20} className="w-120">
        <div className="flex flex-col ">
          <div className="flex justify-between gap-x-6 mb-3">
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
            <div>
              {renderAddWord({
                phrase: fullPhrase,
                original: debounceWordTranslate,
                translation: currentWordTranslate,
              })}
            </div>
          </div>
          {highlightedPhrase && currentHighlightedPhraseTranslate && (
            <div className="flex justify-between gap-6 items-center">
              <div className="mb-2">
                <p className="text-lg">
                  <span className="font-bold">{highlightedPhrase}</span> -{" "}
                  <span>{currentHighlightedPhraseTranslate}</span>
                </p>
              </div>
              <div>
                {renderAddWord({
                  phrase: fullPhrase,
                  original: highlightedPhrase,
                  translation: currentHighlightedPhraseTranslate,
                })}
              </div>
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
