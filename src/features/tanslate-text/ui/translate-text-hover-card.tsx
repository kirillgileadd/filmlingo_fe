import { FC, ReactNode, useEffect, useState } from 'react';

import { Button } from '@/src/shared/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/src/shared/components/ui/hover-card';
import { useDebouncedCallback } from '@/src/shared/lib/useDebounce';
import { useModal } from '@/src/shared/lib/useModal';
import { Loader2Icon } from 'lucide-react';
import { useTranslateTextMutation } from '../api/use-translate-text-mutation';
import { SubtitlePhraseT } from '@/src/entities/subtitle';

type TranslateTextHoverCardProps = {
  word: string;
  fullSubtitle: string;
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
  fullSubtitle,
  children,
  renderAddWord,
  phrases,
}) => {
  const modal = useModal();
  const [value, setValue] = useState('');
  const translateMutation = useTranslateTextMutation();
  const [currentWordTranslate, setCurrentWordTranslate] = useState('');
  const [currentPhraseTranslate, setSubtitleTranslate] = useState('');
  const [phrase, setPhrase] = useState<SubtitlePhraseT | null>(null);

  useEffect(() => {
    const translate = async () => {
      if (value) {
        const data = await translateMutation.mutateAsync({
          targetLang: 'ru',
          text: value,
        });

        setCurrentWordTranslate(data);
      }
    };

    translate();
  }, [value]);

  const translateSubtitle = async () => {
    const data = await translateMutation.mutateAsync({
      targetLang: 'ru',
      text: fullSubtitle,
    });

    setSubtitleTranslate(data);
  };

  const handleTranslate = (value: string) => {
    setValue(value);
  };

  const [debouncedTranslate, cancelTranslate] = useDebouncedCallback(
    handleTranslate,
    200,
  );

  const handleHighlightPhrase = async (word: string) => {
    if (phrases) {
      const matchedPhrase = phrases.find((phrase) =>
        phrase.original.includes(word),
      );
      console.log(matchedPhrase, 'matchedPhrase');

      if (matchedPhrase) {
        setPhrase(matchedPhrase);
      } else {
        setPhrase(null);
      }
    }
  };

  const getPhaseTypeLabel = (type: 'idiom' | 'phrasal_verb') => {
    if (type === 'idiom') {
      return 'Слово используется как часть идиомы';
    }

    if (type === 'phrasal_verb') {
      return 'Слово используется как часть фразового глагола';
    }
  };

  return (
    <HoverCard
      open={modal.isOpen}
      onOpenChange={modal.toggleModal}
      openDelay={200}
      closeDelay={200}
    >
      <HoverCardTrigger asChild={true}>
        <span
          className="text-3xl px-1 hover:bg-foreground hover:text-secondary rounded inline-block relative"
          onMouseEnter={() => {
            debouncedTranslate(word);
            handleHighlightPhrase(word);
          }}
          onMouseLeave={cancelTranslate}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent side="top" sideOffset={20} className="w-120">
        <div className="flex flex-col">
          <div className="flex justify-between gap-x-6 mb-1.5">
            {translateMutation.isPending && modal.isOpen ? (
              <Loader2Icon className="animate-spin mb-2" />
            ) : (
              <div className="mb-2">
                <p className="text-2xl">{word}</p>
                <p className="text-md text-gray-400">{currentWordTranslate}</p>
              </div>
            )}
            <div>
              {renderAddWord({
                phrase: fullSubtitle,
                original: value,
                translation: currentWordTranslate,
              })}
            </div>
          </div>
          {phrase && (
            <div className="border-t pt-3 mb-3">
              <p className="text-xs text-gray-400 mb-2">
                {getPhaseTypeLabel(phrase.type)}
              </p>

              <div className="flex justify-between gap-6 items-center">
                <div>
                  <p className="text-2xl">{phrase.original}</p>
                  <p className="text-md text-gray-400">{phrase.translation}</p>
                </div>
                <div>
                  {/*{renderAddWord({*/}
                  {/*  phrase: fullPhrase,*/}
                  {/*  original: highlightedPhrase,*/}
                  {/*  translation: currentHighlightedPhraseTranslate,*/}
                  {/*})}*/}
                </div>
              </div>
            </div>
          )}
          {currentPhraseTranslate ? (
            <div className="border-t pt-3 mb-3">
              <p className="text-md text-gray-400">{currentPhraseTranslate}</p>
            </div>
          ) : (
            <Button onClick={translateSubtitle} size="sm" className="w-fit">
              Перевести весь субтитр
            </Button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
