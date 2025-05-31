import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { FilmT } from '../model/types';
import { publicApiClient } from '@/src/shared/api/client';

export const useGetFilmsQuery = () => {
  return useQuery<FilmT[]>({
    queryKey: [QUERY_KEYS.FILMS],
    queryFn: async () => {
      const response = await publicApiClient.get(
        `${process.env.NEXT_PUBLIC_API_URL}/films/`,
      );

      return response.data;
    },
  });
};
