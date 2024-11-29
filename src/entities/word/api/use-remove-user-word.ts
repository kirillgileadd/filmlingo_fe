import $api from "@/src/shared/lib/api";
import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRemoveUserWord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (wordId: number) => {
      const response = await $api.delete(`/words/${wordId}/remove`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_WORDS] });
      toast.success("Слово успешно удалено из словаря");
    },
    onError: () => {
      toast.success("Что-то пошло не так");
    },
  });
};
