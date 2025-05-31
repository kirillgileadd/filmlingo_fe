import { useMutation } from '@tanstack/react-query';
import {
  ForgotPasswordBody,
  ForgotPasswordError,
  ForgotPasswordRes,
} from '../model/types';
import { publicApiClient } from '@/src/shared/api/client';

export const useForgotPassword = () => {
  return useMutation<
    ForgotPasswordRes,
    ForgotPasswordError,
    ForgotPasswordBody
  >({
    mutationFn: async (body) => {
      const response = await publicApiClient.post(
        '/auth/forgot-password',
        body,
      );

      return response.data;
    },
  });
};
