import $api from "@/src/shared/lib/api";
import { ACCESS_TOKEN } from "@/src/shared/lib/const";
import { useAuth } from "@/src/shared/lib/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serialize } from "cookie";

export const useLogoutUser = () => {
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await $api.post("/auth/logout");

      return response.data;
    },
    onSuccess: () => {
      document.cookie = serialize(ACCESS_TOKEN, "", {
        maxAge: -1,
      });
      setAuth(false);
      queryClient.clear();
    },
    onError: () => {
      document.cookie = serialize(ACCESS_TOKEN, "", {
        maxAge: -1,
      });
      setAuth(false);
      queryClient.clear();
    },
  });
};
