import $api from "@/src/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AddWordBodyT, AddWordErrorT, AddWordResT } from "../model/types";
import { useCanAddWord, useValidateAddWord } from "../model/use-can-add-word";

export const useAddWord = () => {
  const canUdapte = useCanAddWord();
  const validateWordFn = useValidateAddWord();
  return useMutation<AddWordResT, AddWordErrorT, AddWordBodyT>({
    mutationFn: async (body: AddWordBodyT) => {
      if (!canUdapte) {
        throw new Error("Авторизуйся ");
      }

      const _body = validateWordFn(body);
      if (!body) return;

      const response = await $api.post("/words/add", _body);

      return response.data;
    },
  });
};
