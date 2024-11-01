import React, { createContext, useContext, useEffect, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  loginToken: string | null;
  refreshToken: string | null;
  status: boolean;
  setTokens: (tokens: { login: string; refresh: string }) => void;
  clearTokens: () => void;
};

const initialState: AuthProviderState = {
  loginToken: null,
  refreshToken: null,
  status: false,
  setTokens: () => null,
  clearTokens: () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loginToken, setLoginToken] = useState<string | null>(
    sessionStorage.getItem("loginToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    sessionStorage.getItem("refreshToken")
  );
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    const sessionLoginToken = sessionStorage.getItem("loginToken");
    const sessionRefreshToken = sessionStorage.getItem("refreshToken");

    if (
      sessionLoginToken !== null &&
      sessionRefreshToken !== null &&
      loginToken === sessionLoginToken &&
      refreshToken === sessionRefreshToken
    ) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [loginToken, refreshToken]);

  const setTokens = ({
    login,
    refresh,
  }: {
    login: string;
    refresh: string;
  }) => {
    sessionStorage.setItem("loginToken", login);
    sessionStorage.setItem("refreshToken", refresh);
    setLoginToken(login);
    setRefreshToken(refresh);
  };

  const clearTokens = () => {
    sessionStorage.removeItem("loginToken");
    sessionStorage.removeItem("refreshToken");
    setLoginToken(null);
    setRefreshToken(null);
  };

  const value = {
    loginToken,
    refreshToken,
    status,
    setTokens,
    clearTokens,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
