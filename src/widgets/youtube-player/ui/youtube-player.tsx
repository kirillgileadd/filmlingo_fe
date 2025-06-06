import { AddWordButton } from '@/src/features/add-word';
import { SubtitlesList } from '@/src/features/subtitles-list';
import { TranslateTextHoverCard } from '@/src/features/tanslate-text';
import { XIcon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { SubtitleT } from '@/src/entities/subtitle';
import { YoutubePlayerSettings } from '@/src/widgets/youtube-player/ui/youtube-player-settings';
import { useAuthModal } from '@/src/widgets/auth';

export type YoutubePlayerProps = {
  videoId: string;
  onClose: () => void;
  youtubeSubtitles: SubtitleT[];
};

export const YoutubePlayer: FC<YoutubePlayerProps> = ({
  videoId,
  onClose,
  youtubeSubtitles,
}) => {
  const authModal = useAuthModal();
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    const playerInstance = event.target;
    setPlayer(playerInstance);
    setCurrentTime(playerInstance.getCurrentTime());
  };

  const playVideo = () => {
    if (player) {
      player.playVideo();
    }
  };

  const pauseVideo = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // controls: 0, // Убирает элементы управления
      autoplay: 1, // Автозапуск видео
      modestbranding: 1,
    },
  };

  // Обработчик изменения состояния плеера
  const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === window.YT?.PlayerState.PLAYING) {
      console.log('Video is playing');
      console.log(window.YT);
    } else if (event.data === window.YT?.PlayerState.PAUSED) {
      console.log('Video is paused');
    }

    if (player) {
      setCurrentTime(player.getCurrentTime());
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [player]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="relative w-full h-full max-w-screen max-h-screen flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl z-10"
          aria-label="Close modal"
        >
          <XIcon />
        </button>
        <YouTube
          videoId={videoId} // Замените на ваш ID видео
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        />
        <SubtitlesList
          currentTime={currentTime}
          subtitleListRepository={{ pauseVideo, playVideo }}
          subtitles={youtubeSubtitles ?? []}
          renderSubtitle={(
            word,
            sourceContext,
            index,
            translate,
            ai_translate,
            ai_translate_comment,
            language,
            phrases,
          ) => (
            <TranslateTextHoverCard
              key={index}
              phrases={phrases}
              language={language}
              translate={translate}
              ai_translate={ai_translate}
              ai_translate_comment={ai_translate_comment}
              sourceContext={sourceContext}
              word={word}
              renderAddWord={({ sourceContext, translation, original }) => (
                <AddWordButton
                  sourceContext={sourceContext}
                  translation={translation}
                  original={original}
                  renderAuthForm={(trigger) => (
                    <div onClick={authModal.openAuth}>{trigger}</div>
                  )}
                />
              )}
            >
              {word}{' '}
            </TranslateTextHoverCard>
          )}
        />
        <YoutubePlayerSettings />
      </div>
    </div>
  );
};
