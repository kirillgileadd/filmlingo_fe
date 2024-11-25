import cookie from "cookie";
import { ACCESS_TOKEN } from "../lib/const";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const cookies = cookie.parse(document.cookie);
    return cookies[ACCESS_TOKEN];
  }
  return null;
};
