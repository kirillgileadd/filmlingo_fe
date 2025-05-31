import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApiClient } from '@/src/shared/api/client';
import { appSessionStore } from '@/src/shared/session';

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await authorizedApiClient.post('/auth/logout');

      return response.data;
    },
    onSuccess: () => {
      appSessionStore.removeSession();
      queryClient.clear();
    },
    onError: () => {
      appSessionStore.removeSession();
      queryClient.clear();
    },
  });
};
