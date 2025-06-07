import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

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
import Image from 'next/image';

type TranslateTextHoverCardProps = {
  word: string;
  sourceContext: string;
  phrases?: SubtitlePhraseT[] | null;
  ai_translate: string | null;
  ai_translate_comment: string | null;
  children: ReactNode;
  translate: string | null;
  language: string;
  renderAddWord: (params: {
    original: string;
    sourceContext: string;
    translation: string;
  }) => ReactNode;
  renderAddPhrase: (params: {
    original: string;
    sourceContext: string;
    translation: string;
    type: 'idiom' | 'phrasal_verb';
  }) => ReactNode;
};

export const TranslateTextHoverCard: FC<TranslateTextHoverCardProps> = ({
  word,
  sourceContext,
  children,
  renderAddWord,
  renderAddPhrase,
  phrases,
  translate,
  ai_translate_comment,
  ai_translate,
  language,
}) => {
  const modal = useModal();
  const [value, setValue] = useState('');
  const translateMutation = useTranslateTextMutation();
  const [currentWordTranslate, setCurrentWordTranslate] = useState('');
  const [currentSubtitleTranslate, setCurrentSubtitleTranslate] = useState('');
  const [phrase, setPhrase] = useState<SubtitlePhraseT | null>(null);

  const parsedWord = useMemo(() => {
    return word.replace(/[^\p{L}\p{N}'-]+/gu, '').toLowerCase();
  }, [word]);

  useEffect(() => {
    const translate = async () => {
      if (value) {
        const data = await translateMutation.mutateAsync({
          targetLang: language === 'ru' ? 'en' : 'ru',
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
      text: sourceContext,
    });

    setCurrentSubtitleTranslate(data);
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
        phrase.original.toLowerCase().includes(word),
      );

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
      closeDelay={20}
    >
      <HoverCardTrigger asChild={true}>
        <span
          className="text-4xl px-1 hover:bg-foreground hover:text-secondary rounded inline-block relative"
          onMouseEnter={() => {
            debouncedTranslate(parsedWord);
            handleHighlightPhrase(parsedWord);
          }}
          onMouseLeave={cancelTranslate}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <div className="absolute left-0 right-0 top-full h-5 z-40"></div>
      <HoverCardContent
        side="top"
        sideOffset={20}
        className="w-120 before:absolute before:bottom-[-20px] before:left-0 before:w-full before:h-[20px] before:content-['']"
      >
        <div className="flex flex-col">
          <div className="flex justify-between gap-x-6 mb-1.5">
            {translateMutation.isPending && modal.isOpen ? (
              <Loader2Icon className="animate-spin mb-2" />
            ) : (
              <div className="mb-2">
                {language === 'ru' && (
                  <>
                    <p className="text-2xl">{currentWordTranslate}</p>
                    <p className="text-md text-gray-400">{parsedWord}</p>
                  </>
                )}
                {language === 'en' && (
                  <>
                    <p className="text-2xl">{parsedWord}</p>
                    <p className="text-md text-gray-400">
                      {currentWordTranslate}
                    </p>
                  </>
                )}
              </div>
            )}
            <div>
              {renderAddWord({
                sourceContext: sourceContext,
                original: value,
                translation: currentWordTranslate,
              })}
            </div>
          </div>
          {phrase && (
            <div className="border-t pt-3 mb-3">
              <div className="flex justify-between gap-6 items-start">
                <div>
                  <p className="text-xs text-gray-400 mb-2">
                    {getPhaseTypeLabel(phrase.type)}
                  </p>

                  <div>
                    <p className="text-2xl">{phrase.original}</p>
                    <p className="text-md text-gray-400">
                      {phrase.translation}
                    </p>
                  </div>
                </div>
                <div>
                  {renderAddPhrase({
                    sourceContext: sourceContext,
                    original: phrase.original,
                    translation: phrase.translation,
                    type: phrase.type,
                  })}
                </div>
              </div>
            </div>
          )}
          {translate && (
            <div>
              <div className="border-t pt-3 mb-3">
                <p className="text-xs text-gray-400">Художественный перевод</p>
                <p className="text-md text-gray-400">{translate}</p>
              </div>
            </div>
          )}
          {ai_translate && (
            <div>
              <div className="border-t pt-3 mb-3">
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-xs text-gray-400">Перевод от Ghat GPT</p>
                  <Image
                    src={'/chat-gpt.svg'}
                    width={24}
                    height={24}
                    alt="chat-gpt.svg"
                  />
                </div>
                <p className="text-md text-gray-400">{ai_translate}</p>
              </div>
            </div>
          )}
          {ai_translate_comment && (
            <div>
              <div className="border-t pt-3 mb-3">
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-xs text-gray-400">
                    Комментарий от Ghat GPT
                  </p>
                  <Image
                    src={'/chat-gpt.svg'}
                    width={24}
                    height={24}
                    alt="chat-gpt.svg"
                  />
                </div>
                <p className="text-md text-gray-400">{ai_translate_comment}</p>
              </div>
            </div>
          )}
          {currentSubtitleTranslate ? (
            <div className="border-t pt-3 mb-3">
              <p className="text-md text-gray-400">
                {currentSubtitleTranslate}
              </p>
            </div>
          ) : (
            <Button
              color="red"
              onClick={translateSubtitle}
              variant="destructive"
              size="sm"
              className="w-fit"
            >
              Перевести с помощью Yandex
            </Button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
