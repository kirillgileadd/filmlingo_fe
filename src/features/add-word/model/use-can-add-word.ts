import { useAuth } from "@/src/shared/lib/auth";

export const canAddWord = (isAuth?: boolean) => {
  return isAuth;
};

export const useCanAddWord = () => {
  const { isAuth } = useAuth();
  return canAddWord(isAuth);
};
