import Cookies from 'js-cookie';
import $api from '@/src/shared/lib/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RegisterUserReq, RegisterUserRes } from '../model/types';
import { ACCESS_TOKEN } from '@/src/shared/lib/const';
import { useAuth } from '@/src/shared/lib/auth';

export const useRegisterUser = () => {
  const { setAuth } = useAuth();

  console.log(Cookies.get(ACCESS_TOKEN), 'coook');

  return useMutation<
    RegisterUserRes,
    AxiosError<{ message: string }>,
    RegisterUserReq
  >({
    mutationFn: async (req) => {
      const response = await $api.post('/auth/registration', req);

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
