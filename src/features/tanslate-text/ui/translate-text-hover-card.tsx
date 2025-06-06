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
};

export const TranslateTextHoverCard: FC<TranslateTextHoverCardProps> = ({
  word,
  sourceContext,
  children,
  renderAddWord,
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_165_29)">
                      <path
                        d="M0.012886 7.45242C0.012886 3.34357 3.34352 0.0129395 7.45237 0.0129395H23.5463C27.6565 0.0129395 30.9871 3.34357 30.9871 7.45242V31.0001H7.45237C3.34352 31.0001 0.012886 27.6694 0.012886 23.5606V7.45242Z"
                        fill="#74AA9C"
                      />
                      <path
                        d="M14.267 3.8537C11.7158 3.8537 9.44946 5.49389 8.65964 7.91617L8.3749 9.57955V15.0928C8.3749 15.3685 8.51663 15.6133 8.7537 15.7551L13.1924 18.3128V10.7366H13.1937V10.3771L17.6865 7.78217C18.1209 7.53067 18.5941 7.35883 19.0841 7.26901L18.6515 5.80183C17.5357 4.55461 15.9394 3.84597 14.267 3.8537ZM14.267 5.36762L14.2592 5.37535C15.2861 5.37535 16.2731 5.72968 17.0629 6.3855C17.0307 6.40096 16.9675 6.4409 16.9212 6.46409L12.2763 9.1389C12.0392 9.2729 11.8975 9.52544 11.8975 9.80117V16.0798L9.89913 14.9279V9.73803C9.89784 7.32736 11.8524 5.37149 14.267 5.36762Z"
                        fill="white"
                      />
                      <path
                        d="M24.9694 8.60905C23.6939 6.39973 21.1402 5.25707 18.6476 5.78421L17.0647 6.3693L12.2901 9.12593C12.0513 9.2638 11.9101 9.50894 11.9059 9.78512L11.9102 14.908L18.4714 11.1199L18.4721 11.121L18.7834 10.9413L23.277 13.5347C23.7121 13.7851 24.0975 14.109 24.4202 14.4884L25.4746 13.3803C25.9968 11.7904 25.8123 10.0535 24.9694 8.60905ZM23.6583 9.36602L23.6478 9.36319C24.1612 10.2525 24.3478 11.2844 24.1748 12.2963C24.1453 12.2761 24.0791 12.2414 24.0359 12.2129L19.397 9.5277C19.1624 9.38939 18.8728 9.39292 18.6341 9.53078L13.1966 12.6701L13.195 10.3635L17.6895 7.76857C19.7766 6.56212 22.4477 7.2769 23.6583 9.36602Z"
                        fill="white"
                      />
                      <path
                        d="M26.2025 20.2552C27.478 18.0459 27.1908 15.2631 25.4879 13.3679L24.1898 12.2896L19.4151 9.533C19.1764 9.39514 18.8935 9.39548 18.6522 9.52992L14.2178 12.0951L20.779 15.8832L20.7784 15.8843L21.0897 16.064L21.0906 21.2524C21.0912 21.7544 21.0034 22.2501 20.8362 22.7193L22.3231 23.0783C23.9611 22.7356 25.373 21.7074 26.2025 20.2552ZM24.8914 19.4983L24.8885 19.4877C24.3751 20.377 23.5748 21.0546 22.6119 21.4107C22.6146 21.3751 22.6116 21.3004 22.6147 21.2486L22.6207 15.8887C22.6232 15.6164 22.4753 15.3674 22.2365 15.2295L16.7991 12.0902L18.7959 10.9355L23.2904 13.5304C25.3788 14.7346 26.0953 17.4053 24.8914 19.4983Z"
                        fill="white"
                      />
                      <path
                        d="M16.733 27.1463C19.2842 27.1463 21.5505 25.5061 22.3404 23.0838L22.6251 21.4204V15.9072C22.6251 15.6315 22.4834 15.3867 22.2463 15.2449L17.8076 12.6872V20.2634H17.8063V20.6229L13.3135 23.2178C12.8791 23.4693 12.4059 23.6412 11.9159 23.731L12.3485 25.1982C13.4643 26.4454 15.0606 27.154 16.733 27.1463ZM16.733 25.6324L16.7408 25.6246C15.7139 25.6246 14.7269 25.2703 13.9371 24.6145C13.9693 24.599 14.0325 24.5591 14.0788 24.5359L18.7237 21.8611C18.9608 21.7271 19.1025 21.4746 19.1025 21.1988V14.9202L21.1009 16.0721V21.262C21.1022 23.6726 19.1476 25.6285 16.733 25.6324Z"
                        fill="white"
                      />
                      <path
                        d="M6.03056 22.3909C7.30612 24.6003 9.85976 25.7429 12.3524 25.2158L13.9353 24.6307L18.7099 21.8741C18.9487 21.7362 19.0899 21.4911 19.0941 21.2149L19.0898 16.092L12.5286 19.8801L12.5279 19.879L12.2166 20.0587L7.72295 17.4653C7.28794 17.2149 6.90253 16.891 6.57975 16.5116L5.5254 17.6197C5.00318 19.2096 5.18767 20.9465 6.03056 22.3909ZM7.34166 21.634L7.35222 21.6368C6.83878 20.7475 6.65215 19.7156 6.8252 18.7037C6.85469 18.7239 6.92085 18.7586 6.96413 18.7871L11.603 21.4723C11.8376 21.6106 12.1272 21.6071 12.3659 21.4692L17.8034 18.3299L17.805 20.6365L13.3105 23.2314C11.2234 24.4379 8.55227 23.7231 7.34166 21.634Z"
                        fill="white"
                      />
                      <path
                        d="M4.79753 10.7448C3.52197 12.9541 3.80922 15.7369 5.51207 17.6321L6.81023 18.7104L11.5849 21.467C11.8236 21.6049 12.1065 21.6045 12.3478 21.4701L16.7822 18.9049L10.221 15.1168L10.2216 15.1157L9.91032 14.936L9.90945 9.7476C9.90884 9.24565 9.99661 8.74994 10.1638 8.28068L8.67694 7.92168C7.03893 8.26437 5.62703 9.29256 4.79753 10.7448ZM6.10862 11.5017L6.11145 11.5123C6.62489 10.623 7.42522 9.94541 8.38809 9.58932C8.38537 9.62495 8.3884 9.6996 8.38529 9.75136L8.37932 15.1113C8.37683 15.3836 8.52467 15.6326 8.76346 15.7705L14.2009 18.9098L12.2041 20.0645L7.70959 17.4696C5.62125 16.2654 4.9047 13.5947 6.10862 11.5017Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_165_29">
                        <rect width="31" height="31" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_165_29)">
                      <path
                        d="M0.012886 7.45242C0.012886 3.34357 3.34352 0.0129395 7.45237 0.0129395H23.5463C27.6565 0.0129395 30.9871 3.34357 30.9871 7.45242V31.0001H7.45237C3.34352 31.0001 0.012886 27.6694 0.012886 23.5606V7.45242Z"
                        fill="#74AA9C"
                      />
                      <path
                        d="M14.267 3.8537C11.7158 3.8537 9.44946 5.49389 8.65964 7.91617L8.3749 9.57955V15.0928C8.3749 15.3685 8.51663 15.6133 8.7537 15.7551L13.1924 18.3128V10.7366H13.1937V10.3771L17.6865 7.78217C18.1209 7.53067 18.5941 7.35883 19.0841 7.26901L18.6515 5.80183C17.5357 4.55461 15.9394 3.84597 14.267 3.8537ZM14.267 5.36762L14.2592 5.37535C15.2861 5.37535 16.2731 5.72968 17.0629 6.3855C17.0307 6.40096 16.9675 6.4409 16.9212 6.46409L12.2763 9.1389C12.0392 9.2729 11.8975 9.52544 11.8975 9.80117V16.0798L9.89913 14.9279V9.73803C9.89784 7.32736 11.8524 5.37149 14.267 5.36762Z"
                        fill="white"
                      />
                      <path
                        d="M24.9694 8.60905C23.6939 6.39973 21.1402 5.25707 18.6476 5.78421L17.0647 6.3693L12.2901 9.12593C12.0513 9.2638 11.9101 9.50894 11.9059 9.78512L11.9102 14.908L18.4714 11.1199L18.4721 11.121L18.7834 10.9413L23.277 13.5347C23.7121 13.7851 24.0975 14.109 24.4202 14.4884L25.4746 13.3803C25.9968 11.7904 25.8123 10.0535 24.9694 8.60905ZM23.6583 9.36602L23.6478 9.36319C24.1612 10.2525 24.3478 11.2844 24.1748 12.2963C24.1453 12.2761 24.0791 12.2414 24.0359 12.2129L19.397 9.5277C19.1624 9.38939 18.8728 9.39292 18.6341 9.53078L13.1966 12.6701L13.195 10.3635L17.6895 7.76857C19.7766 6.56212 22.4477 7.2769 23.6583 9.36602Z"
                        fill="white"
                      />
                      <path
                        d="M26.2025 20.2552C27.478 18.0459 27.1908 15.2631 25.4879 13.3679L24.1898 12.2896L19.4151 9.533C19.1764 9.39514 18.8935 9.39548 18.6522 9.52992L14.2178 12.0951L20.779 15.8832L20.7784 15.8843L21.0897 16.064L21.0906 21.2524C21.0912 21.7544 21.0034 22.2501 20.8362 22.7193L22.3231 23.0783C23.9611 22.7356 25.373 21.7074 26.2025 20.2552ZM24.8914 19.4983L24.8885 19.4877C24.3751 20.377 23.5748 21.0546 22.6119 21.4107C22.6146 21.3751 22.6116 21.3004 22.6147 21.2486L22.6207 15.8887C22.6232 15.6164 22.4753 15.3674 22.2365 15.2295L16.7991 12.0902L18.7959 10.9355L23.2904 13.5304C25.3788 14.7346 26.0953 17.4053 24.8914 19.4983Z"
                        fill="white"
                      />
                      <path
                        d="M16.733 27.1463C19.2842 27.1463 21.5505 25.5061 22.3404 23.0838L22.6251 21.4204V15.9072C22.6251 15.6315 22.4834 15.3867 22.2463 15.2449L17.8076 12.6872V20.2634H17.8063V20.6229L13.3135 23.2178C12.8791 23.4693 12.4059 23.6412 11.9159 23.731L12.3485 25.1982C13.4643 26.4454 15.0606 27.154 16.733 27.1463ZM16.733 25.6324L16.7408 25.6246C15.7139 25.6246 14.7269 25.2703 13.9371 24.6145C13.9693 24.599 14.0325 24.5591 14.0788 24.5359L18.7237 21.8611C18.9608 21.7271 19.1025 21.4746 19.1025 21.1988V14.9202L21.1009 16.0721V21.262C21.1022 23.6726 19.1476 25.6285 16.733 25.6324Z"
                        fill="white"
                      />
                      <path
                        d="M6.03056 22.3909C7.30612 24.6003 9.85976 25.7429 12.3524 25.2158L13.9353 24.6307L18.7099 21.8741C18.9487 21.7362 19.0899 21.4911 19.0941 21.2149L19.0898 16.092L12.5286 19.8801L12.5279 19.879L12.2166 20.0587L7.72295 17.4653C7.28794 17.2149 6.90253 16.891 6.57975 16.5116L5.5254 17.6197C5.00318 19.2096 5.18767 20.9465 6.03056 22.3909ZM7.34166 21.634L7.35222 21.6368C6.83878 20.7475 6.65215 19.7156 6.8252 18.7037C6.85469 18.7239 6.92085 18.7586 6.96413 18.7871L11.603 21.4723C11.8376 21.6106 12.1272 21.6071 12.3659 21.4692L17.8034 18.3299L17.805 20.6365L13.3105 23.2314C11.2234 24.4379 8.55227 23.7231 7.34166 21.634Z"
                        fill="white"
                      />
                      <path
                        d="M4.79753 10.7448C3.52197 12.9541 3.80922 15.7369 5.51207 17.6321L6.81023 18.7104L11.5849 21.467C11.8236 21.6049 12.1065 21.6045 12.3478 21.4701L16.7822 18.9049L10.221 15.1168L10.2216 15.1157L9.91032 14.936L9.90945 9.7476C9.90884 9.24565 9.99661 8.74994 10.1638 8.28068L8.67694 7.92168C7.03893 8.26437 5.62703 9.29256 4.79753 10.7448ZM6.10862 11.5017L6.11145 11.5123C6.62489 10.623 7.42522 9.94541 8.38809 9.58932C8.38537 9.62495 8.3884 9.6996 8.38529 9.75136L8.37932 15.1113C8.37683 15.3836 8.52467 15.6326 8.76346 15.7705L14.2009 18.9098L12.2041 20.0645L7.70959 17.4696C5.62125 16.2654 4.9047 13.5947 6.10862 11.5017Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_165_29">
                        <rect width="31" height="31" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
