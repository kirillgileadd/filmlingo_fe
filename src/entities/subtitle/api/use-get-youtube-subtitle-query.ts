import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SubtitleT, SubtitleYoutubeT } from '../model/types';
import { publicApiClient } from '@/src/shared/api/client';

export const useGetYoutubeSubtitleQuery = (videoId: string | null) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, AxiosError, SubtitleT[]>({
    queryKey: [QUERY_KEYS.YOUTUBE_SUBTITLE_BY_VIDEO_ID, videoId],
    queryFn: async () => {
      const response = await publicApiClient.get<{
        subtitles: SubtitleYoutubeT[];
      }>(`${process.env.NEXT_PUBLIC_API_URL}/subtitles/youtube/${videoId}`);
      return response.data.subtitles.map((sub) => ({
        createdAt: null,
        endTime: null,
        filmId: 0,
        id: sub.endSeconds,
        language: sub.lang || 'en',
        phrases: [],
        startTime: null,
        text: sub.text,
        updatedAt: null,
        startSeconds: Number.parseFloat(sub.startSeconds),
        endSeconds: Number.parseFloat(sub.endSeconds),
      }));
    },
    // select: (data) => {
    //   return data.subtitles;
    // },
    enabled: !!videoId,
  });
};
