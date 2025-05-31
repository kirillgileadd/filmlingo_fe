import { useMutation } from '@tanstack/react-query';
import {
  ResetPasswordBody,
  ResetPasswordError,
  ResetPasswordRes,
} from '../model/types';
import { publicApiClient } from '@/src/shared/api/client';

export const useResetPassword = () => {
  return useMutation<ResetPasswordRes, ResetPasswordError, ResetPasswordBody>({
    mutationFn: async (body) => {
      const response = await publicApiClient.post('/auth/reset-password', body);

      return response.data;
    },
  });
};
