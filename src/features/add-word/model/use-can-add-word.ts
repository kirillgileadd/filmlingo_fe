import { AddWordBodyT } from './types';
import toast from 'react-hot-toast';
import { appSessionStore } from '@/src/shared/session';

export const canAddWord = (isAuth?: boolean) => {
  return isAuth;
};

export const useCanAddWord = () => {
  const isAuth = !!appSessionStore.getSession();
  return canAddWord(isAuth);
};

export const useValidateAddWord = () => {
  const cleanWord = (word: string) =>
    word.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '').toLocaleLowerCase();

  return (body: Partial<AddWordBodyT>) => {
    const original = body.original ? cleanWord(body.original) : '';
    const translation = body.translation ? cleanWord(body.translation) : '';

    if (!original || !body.sourceContext || !translation) {
      toast.error('Не удалось добавить слово :(');
      return false;
    }

    body.original = original;
    body.translation = translation;

    return body;
  };
};
