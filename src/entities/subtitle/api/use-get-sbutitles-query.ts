import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { SubtitleT } from '../model/types';
import { SubtitleVariantT } from '../../film/model/types';
import { publicApiClient } from '@/src/shared/api/client';

export const useGetSubtitlesQuery = (
  filmId: number,
  variant: SubtitleVariantT | null,
) => {
  const query = useQuery<SubtitleT[], AxiosError>({
    queryKey: [QUERY_KEYS.SUBTITLES, filmId, variant?.language],
    queryFn: async () => {
      const response = await publicApiClient.get(
        `${process.env.NEXT_PUBLIC_API_URL}/subtitles/`,
        {
          params: { filmId, language: variant?.language },
        },
      );

      return response.data;
    },
    enabled: !!variant,
  });

  useEffect(() => {
    if (query.error) {
      toast.error('Не удалось подгрузить субтитры :(');
    }
  }, [query.error]);

  return query;
};
