import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FilmDetailT } from "../model/types";

export const useGetFilmDetailQuery = (id?: number) => {
  return useQuery<FilmDetailT>({
    queryKey: [QUERY_KEYS.FILM_DETAIL, id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/films/${id}`
      );

      return response.data;
    },
    enabled: !!id,
  });
};
