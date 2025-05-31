import { QUERY_KEYS } from '@/src/shared/lib/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authorizedApiClient } from '@/src/shared/api/client';

export const useRemoveUserPhrase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (phraseId: number) => {
      const response = await authorizedApiClient.delete(
        `/phrases/${phraseId}/remove`,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_PHRASES],
      });
      toast.success('Фраза успешно удалена из словаря');
    },
    onError: () => {
      toast.error('Что-то пошло не так');
    },
  });
};
