import $api from "@/src/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import {
  ForgotPasswordBody,
  ForgotPasswordError,
  ForgotPasswordRes,
} from "../model/types";

export const useForgotPassword = () => {
  return useMutation<
    ForgotPasswordRes,
    ForgotPasswordError,
    ForgotPasswordBody
  >({
    mutationFn: async (body) => {
      const response = await $api.post("/auth/forgot-password", body);

      return response.data;
    },
  });
};
