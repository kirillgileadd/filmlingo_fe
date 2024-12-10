import $api from "@/src/shared/lib/api";
import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetUserWordsParamsT, GetUserWordsResT } from "../model/types";

export const useGetUserWords = (params: GetUserWordsParamsT) => {
  return useQuery<GetUserWordsResT, AxiosError>({
    queryKey: [QUERY_KEYS.GET_USER_WORDS, params],
    queryFn: async () => {
      const response = await $api.get("/words/my-words", { params });

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
