"use client";

import { AuthContext } from "@/src/shared/lib/auth";
import { getAccessToken } from "@/src/shared/utils/getAccessToken";
import { useEffect, useState } from "react";

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
