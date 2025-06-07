import { useMutation } from '@tanstack/react-query';
import { AddWordBodyT, AddWordErrorT, AddWordResT } from '../model/types';
import { useCanAddWord, useValidateAddWord } from '../model/use-can-add-word';
import { authorizedApiClient } from '@/src/shared/api/client';
import toast from 'react-hot-toast';

export const useAddWord = () => {
  const canUpdate = useCanAddWord();
  const validateWordFn = useValidateAddWord();
  return useMutation<AddWordResT, AddWordErrorT, AddWordBodyT>({
    mutationFn: async (body: AddWordBodyT) => {
      if (!canUpdate) {
        return Promise.reject(new Error('Вы не авторизованны'));
      }

      const _body = validateWordFn(body);
      if (!body) return;

      const response = await authorizedApiClient.post('/words/add', _body);

      return response.data;
    },
    onError: (error) => {
      console.error('Ошибка при добавлении слова:', error);
      toast.error(error.response?.data?.message ?? 'Что-то пошло не так');
    },
  });
};
