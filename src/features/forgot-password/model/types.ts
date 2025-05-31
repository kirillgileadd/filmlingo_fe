import { UserT } from '@/src/entities/user';
import { AxiosError } from 'axios';

export type ForgotPasswordBody = {
  email: string;
};

export type ForgotPasswordError = AxiosError<{
  message?: string;
  email?: string;
}>;

export type ForgotPasswordRes = UserT;
