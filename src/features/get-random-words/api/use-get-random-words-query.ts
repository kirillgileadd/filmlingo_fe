import $api from "@/src/shared/lib/api";
import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { GetRandomWordRes } from "../model/types";

export const useGetRandomWordsQuery = () => {
  return useQuery<GetRandomWordRes>({
    queryKey: [QUERY_KEYS.RANDOM_WORDS],
    queryFn: async () => {
      const response = await $api.get("/words/find-random");

      return response.data;
    },
  });
};
