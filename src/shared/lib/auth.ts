"use client";

import { createContext, useContext } from "react";

interface AuthContextProps {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);
