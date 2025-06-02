'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';

import { YoutubePlayer } from '@/src/widgets/youtube-player';
import { useModal } from '@/src/shared/lib/useModal';
import { Button } from '@/src/shared/components/ui/button';
import { useGetYoutubeSubtitleQuery } from '@/src/entities/subtitle';
import { Input } from '@/src/shared/components/ui/input';
import { Container } from '@/src/shared/components/ui/container';
import { Loader2 } from 'lucide-react';

type YoutubePageProps = {
  className?: string;
};

export const YoutubePage: FC<YoutubePageProps> = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const [videoUrl, setVideoUrl] = useState('');
  console.log(videoUrl, 'url');
  const [videoId, setVideoId] = useState<string | null>(null);

  const subtitlesQuery = useGetYoutubeSubtitleQuery(videoId);
  console.log(subtitlesQuery, 'subs q');
  useEffect(() => {
    openModal();
  }, [subtitlesQuery.isSuccess]);

  const handleGetSubtitles = () => {
    // if (subtitlesQuery.data && videoId) {
    //   openModal();
    //   return;
    // }
    const newVideoId = getYouTubeVideoId(videoUrl);
    setVideoId(newVideoId);
  };

  const getYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleChangeVideoUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  return (
    <>
      {isOpen && videoId && (
        <YoutubePlayer
          youtubeSubtitles={subtitlesQuery.data ?? []}
          onClose={closeModal}
          videoId={videoId}
        />
      )}
      <Container>
        <h2 className="text-lg mb-2">Вставьте ссылку на youtube видео</h2>
        <div className="flex gap-x-2">
          <Input
            value={videoUrl}
            onChange={handleChangeVideoUrl}
            type="email"
            placeholder="Email"
          />
          <Button
            disabled={subtitlesQuery.isLoading}
            onClick={handleGetSubtitles}
          >
            {subtitlesQuery.isLoading && <Loader2 className="animate-spin" />}
            Отрыть видос
          </Button>
        </div>
      </Container>
    </>
  );
};
