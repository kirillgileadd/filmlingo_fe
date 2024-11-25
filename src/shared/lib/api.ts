"use client";

import axios from "axios";
import cookie from "cookie";
import { ACCESS_TOKEN } from "../lib/const";
import { getAccessToken } from "../utils/getAccessToken";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const request = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      request._isRetry = true;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {
            withCredentials: true,
          }
        );
        document.cookie = cookie.serialize(
          ACCESS_TOKEN,
          response.data.accessToken,
          {
            maxAge: 60 * 60,
            secure: false,
          }
        );
        return await $api.request(request);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export default $api;
