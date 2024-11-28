import $api from "@/src/shared/lib/api";
import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetUserWorsParamsT, GetUserWorsResT } from "../model/types";

export const useGetUserWords = (params: GetUserWorsParamsT) => {
  return useQuery<GetUserWorsResT, AxiosError>({
    queryKey: [QUERY_KEYS.GET_USER_WORDS, params.page],
    queryFn: async () => {
      const response = await $api.get("/words/my-words", { params });

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
