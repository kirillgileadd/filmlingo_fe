import { useMutation } from '@tanstack/react-query';
import { AddWordBodyT, AddWordErrorT, AddWordResT } from '../model/types';
import { useCanAddWord, useValidateAddWord } from '../model/use-can-add-word';
import { authorizedApiClient } from '@/src/shared/api/client';

export const useAddWord = () => {
  const canUpdate = useCanAddWord();
  const validateWordFn = useValidateAddWord();
  return useMutation<AddWordResT, AddWordErrorT, AddWordBodyT>({
    mutationFn: async (body: AddWordBodyT) => {
      if (!canUpdate) {
        throw new Error('Авторизуйся ');
      }

      const _body = validateWordFn(body);
      if (!body) return;

      const response = await authorizedApiClient.post('/words/add', _body);

      return response.data;
    },
  });
};
