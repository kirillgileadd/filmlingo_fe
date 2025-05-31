import { useMutation } from '@tanstack/react-query';
import { TranslateBodyT } from '../model/types';
import { publicApiClient } from '@/src/shared/api/client';

export const useTranslateTextMutation = () => {
  return useMutation({
    mutationKey: ['translate-word'],
    mutationFn: async (body: TranslateBodyT) => {
      const response = await publicApiClient.post(
        `${process.env.NEXT_PUBLIC_API_URL}/translate/`,
        body,
      );

      return response.data;
    },
  });
};
