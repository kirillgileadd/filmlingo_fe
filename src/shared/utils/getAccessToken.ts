import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/src/shared/lib/const';

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN) ?? null;
};
