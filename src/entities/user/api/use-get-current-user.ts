import $api from "@/src/shared/lib/api";
import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { UserT } from "../model/types";

export const useGetCurrentUser = (enabled?: boolean) => {
  return useQuery<UserT>({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: async () => {
      const response = await $api.get("/users/profile");

      return response.data;
    },
    enabled,
  });
};
