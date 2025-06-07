import { useMutation } from '@tanstack/react-query';
import { AddPhraseBodyT, AddPhraseErrorT, AddPhraseResT } from '../model/types';
import {
  useCanAddPhrase,
  useValidateAddPhrase,
} from '../model/use-can-add-phrase';
import { authorizedApiClient } from '@/src/shared/api/client';
import toast from 'react-hot-toast';

export const useAddPhrase = () => {
  const canUpdate = useCanAddPhrase();
  const validatePhraseFn = useValidateAddPhrase();
  return useMutation<AddPhraseResT, AddPhraseErrorT, AddPhraseBodyT>({
    mutationFn: async (body: AddPhraseBodyT) => {
      if (!canUpdate) {
        return Promise.reject(new Error('Вы не авторизованны'));
      }

      const _body = validatePhraseFn(body);
      if (!body) return;

      const response = await authorizedApiClient.post('/phrases/add', _body);

      return response.data;
    },
    onError: (error) => {
      console.error('Ошибка при добавлении фразы:', error);
      toast.error(error.response?.data?.message ?? 'Что-то пошло не так');
    },
  });
};
