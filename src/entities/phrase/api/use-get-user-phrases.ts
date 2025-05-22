import $api from '@/src/shared/lib/api';
import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetUserPhrasesParamsT, GetUserPhrasesResT } from '../model/types';

export const useGetUserPhrases = (params: GetUserPhrasesParamsT) => {
  return useQuery<GetUserPhrasesResT, AxiosError>({
    queryKey: [QUERY_KEYS.GET_USER_PHRASES, params],
    queryFn: async () => {
      const response = await $api.get('/phrases/my-phrases', { params });

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
