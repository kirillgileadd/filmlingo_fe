import cookie from "cookie";
import $api from "@/src/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterUserReq, RegisterUserRes } from "../model/types";
import { ACCESS_TOKEN } from "@/src/shared/lib/const";
import { useAuth } from "@/src/shared/lib/useAuth";

export const useRegisterUser = () => {
  const { setAuth } = useAuth();

  return useMutation<
    RegisterUserRes,
    AxiosError<{ message: string }>,
    RegisterUserReq
  >({
    mutationFn: async (req) => {
      const response = await $api.post("/auth/registration", req);

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
