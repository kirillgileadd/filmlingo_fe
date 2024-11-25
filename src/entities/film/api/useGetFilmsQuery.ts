import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FilmT } from "../model/types";

export const useGetFilmsQuery = () => {
  return useQuery<FilmT[]>({
    queryKey: [QUERY_KEYS.FILMS],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/films/`
      );

      return response.data;
    },
  });
};
