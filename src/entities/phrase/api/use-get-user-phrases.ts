import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetUserPhrasesParamsT, GetUserPhrasesResT } from '../model/types';
import { authorizedApiClient } from '@/src/shared/api/client';

export const useGetUserPhrases = (
  params: GetUserPhrasesParamsT,
  enabled?: boolean,
) => {
  return useQuery<GetUserPhrasesResT, AxiosError>({
    queryKey: [QUERY_KEYS.GET_USER_PHRASES, params],
    queryFn: async () => {
      const response = await authorizedApiClient.get('/phrases/my-phrases', {
        params,
      });

      return response.data;
    },
    enabled: !!enabled,
    placeholderData: keepPreviousData,
  });
};
