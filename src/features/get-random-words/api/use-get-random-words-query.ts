import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { GetRandomWordRes } from '../model/types';
import { authorizedApiClient } from '@/src/shared/api/client';

export const useGetRandomWordsQuery = () => {
  return useQuery<GetRandomWordRes>({
    queryKey: [QUERY_KEYS.RANDOM_WORDS],
    queryFn: async () => {
      const response = await authorizedApiClient.get('/words/find-random');

      return response.data;
    },
  });
};
