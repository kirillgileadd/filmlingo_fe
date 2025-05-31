import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RegisterUserReq, RegisterUserRes } from '../model/types';
import { appSessionStore } from '@/src/shared/session';
import { publicApiClient } from '@/src/shared/api/client';

export const useRegisterUser = () => {
  return useMutation<
    RegisterUserRes,
    AxiosError<{ message: string }>,
    RegisterUserReq
  >({
    mutationFn: async (req) => {
      const response = await publicApiClient.post('/auth/registration', req);

      return response.data;
    },
    onSuccess: (data) => {
      appSessionStore.setSessionToken(data.accessToken);
    },
  });
};
