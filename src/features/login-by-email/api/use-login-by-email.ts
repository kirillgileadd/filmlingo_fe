import cookie from "cookie";
import $api from "@/src/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import { LoginByEmailReqData, LoginByEmailRes } from "../model/types";
import { AxiosError } from "axios";
import { ACCESS_TOKEN } from "@/src/shared/lib/const";
import { useAuth } from "@/src/shared/lib/auth";

export const useLoginByEmail = () => {
  const { setAuth } = useAuth();

  return useMutation<
    LoginByEmailRes,
    AxiosError<{ status: number; error: string }>,
    LoginByEmailReqData
  >({
    mutationFn: async (req) => {
      const response = await $api.post("/auth/login", req);

      console.log(response.data);

      return response.data;
    },
    onSuccess: (data) => {
      document.cookie = cookie.serialize(ACCESS_TOKEN, data.accessToken, {
        maxAge: 60 * 60 * 1000,
        secure: false,
      });
      setAuth(true);
    },
  });
};
