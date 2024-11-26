import $api from "@/src/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import {
  ResetPasswordBody,
  ResetPasswordError,
  ResetPasswordRes,
} from "../model/types";

export const useResetPassword = () => {
  return useMutation<ResetPasswordRes, ResetPasswordError, ResetPasswordBody>({
    mutationFn: async (body) => {
      const response = await $api.post("/auth/reset-password", body);

      return response.data;
    },
  });
};
