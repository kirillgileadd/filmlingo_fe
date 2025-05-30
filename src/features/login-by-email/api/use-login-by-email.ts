import $api from '@/src/shared/lib/api';
import { useMutation } from '@tanstack/react-query';
import { LoginByEmailReqData, LoginByEmailRes } from '../model/types';
import { AxiosError } from 'axios';
import { ACCESS_TOKEN } from '@/src/shared/lib/const';
import { useAuth } from '@/src/shared/lib/auth';
import Cookies from 'js-cookie';

export const useLoginByEmail = () => {
  const { setAuth } = useAuth();

  return useMutation<
    LoginByEmailRes,
    AxiosError<{ status: number; message: string }>,
    LoginByEmailReqData
  >({
    mutationFn: async (req) => {
      const response = await $api.post('/auth/login', req);

      return response.data;
    },
    onSuccess: (data) => {
      Cookies.set(ACCESS_TOKEN, data.accessToken, {
        expires: 1 / 24,
        secure: process.env.NODE_ENV === 'production',
      });
      setAuth(true);
    },
  });
};
