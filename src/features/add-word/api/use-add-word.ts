import $api from "@/src/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AddWordBodyT, AddWordErrorT, AddWordResT } from "../model/types";
import { useCanAddWord } from "../model/use-can-add-word";

export const useAddWord = () => {
  const canUdapte = useCanAddWord();
  return useMutation<AddWordResT, AddWordErrorT, AddWordBodyT>({
    mutationFn: async (body: AddWordBodyT) => {
      if (!canUdapte) {
        throw new Error("Авторизуйся ");
      }

      const response = await $api.post("/words/add", body);

      return response.data;
    },
  });
};
