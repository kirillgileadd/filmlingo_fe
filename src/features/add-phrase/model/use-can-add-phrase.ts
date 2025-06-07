import { AddPhraseBodyT } from './types';
import toast from 'react-hot-toast';
import { appSessionStore } from '@/src/shared/session';

export const canAddPhrase = (isAuth?: boolean) => {
  return isAuth;
};

export const useCanAddPhrase = () => {
  const isAuth = !!appSessionStore.useSession();
  console.log(isAuth);
  return canAddPhrase(isAuth);
};

export const useValidateAddPhrase = () => {
  const cleanPhrase = (word: string) =>
    word.replace(/[^a-zA-Zа-яА-ЯёЁ\s']/g, '').toLocaleLowerCase();

  return (body: Partial<AddPhraseBodyT>) => {
    const original = body.original ? cleanPhrase(body.original) : '';
    const translation = body.translation ? cleanPhrase(body.translation) : '';

    if (!original || !body.sourceContext || !translation) {
      toast.error('Не удалось добавить фразу :(');
      return false;
    }

    body.original = original;
    body.translation = translation;

    return body;
  };
};
