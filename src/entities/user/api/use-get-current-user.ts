import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { UserT } from '../model/types';
import { authorizedApiClient } from '@/src/shared/api/client';

export const useGetCurrentUser = (enabled?: boolean) => {
  return useQuery<UserT>({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: async () => {
      const response = await authorizedApiClient.get('/users/profile');

      return response.data;
    },
    enabled,
  });
};
