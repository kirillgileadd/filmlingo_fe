import { useMutation } from '@tanstack/react-query';
import { LoginByEmailReqData, LoginByEmailRes } from '../model/types';
import { AxiosError } from 'axios';
import { publicApiClient } from '@/src/shared/api/client';
import { appSessionStore } from '@/src/shared/session';

export const useLoginByEmail = () => {
  return useMutation<
    LoginByEmailRes,
    AxiosError<{ status: number; message: string }>,
    LoginByEmailReqData
  >({
    mutationFn: async (req) => {
      const response = await publicApiClient.post('/auth/login', req);

      return response.data;
    },
    onSuccess: (data) => {
      appSessionStore.setSessionToken(data.accessToken);
    },
  });
};
