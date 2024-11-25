"use client";

import { getAccessToken } from "@/src/shared/utils/getAccessToken";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getAccessToken();
  const [isAuth, setAuth] = useState(!!accessToken);

  useEffect(() => {
    setAuth(!!accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
