import axios from 'axios';
import { appSessionStore } from '../session';

let refreshPromise: Promise<string | null> | null = null;

const getRefreshToken = async () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const result = await publicApiClient.get<{ accessToken: string }>(
          '/auth/refresh',
        );
        appSessionStore.setSessionToken(result.data.accessToken);
        return result.data.accessToken;
      } catch (error) {
        console.log(error);
        appSessionStore.removeSession();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
};

export const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const authorizedApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

authorizedApiClient.interceptors.request.use(async (config) => {
  let token = appSessionStore.getSessionToken();

  if (!token || appSessionStore.isSessionExpired()) {
    token = await getRefreshToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authorizedApiClient.interceptors.response.use(
  (config) => config,
  async (error) => {
    const request = error.config;
    if (error.response.status === 401) {
      const token = appSessionStore.getSessionToken();

      if (token) {
        const newToken = await getRefreshToken();
        if (newToken) {
          return authorizedApiClient.request(request);
        }
      }
      appSessionStore.removeSession();
    }
    throw new Error();
  },
);
