import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  loginToken: string | null;
  refreshToken: string | null;
  id: string | null;
  name: string | null;
  status: boolean;
  setTokens: (tokens: {
    login: string;
    refresh: string;
    id: string;
    name: string;
  }) => void;
  clearTokens: () => void;
};

const initialState: AuthProviderState = {
  loginToken: null,
  refreshToken: null,
  id: null,
  name: null,
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
  const [id, setId] = useState<string | null>(sessionStorage.getItem("id"));
  const [name, setName] = useState<string | null>(
    sessionStorage.getItem("name")
  );
  const [status, setStatus] = useState<boolean>(false);

  const setTokens = ({
    login,
    refresh,
    id,
    name,
  }: {
    login: string;
    refresh: string;
    id: string;
    name: string;
  }) => {
    sessionStorage.setItem("loginToken", login);
    sessionStorage.setItem("refreshToken", refresh);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", name);
    setLoginToken(login);
    setRefreshToken(refresh);
    setId(id);
    setName(name);
    setStatus(true);
  };

  const clearTokens = () => {
    sessionStorage.removeItem("loginToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    Cookies.remove("acces_token");
    Cookies.remove("refresh_token");
    Cookies.remove("id");
    Cookies.remove("name");
    setLoginToken(null);
    setRefreshToken(null);
    setId(null);
    setName(null);
    setStatus(false);
  };

  useEffect(() => {
    const sessionLoginToken = sessionStorage.getItem("loginToken");
    const sessionRefreshToken = sessionStorage.getItem("refreshToken");
    const sessionId = sessionStorage.getItem("id");
    const sessionName = sessionStorage.getItem("name");

    const cookieLoginToken = Cookies.get("acces_token");
    const cookieRefreshToken = Cookies.get("refresh_token");
    const cookieId = Cookies.get("id");
    const cookieName = Cookies.get("name");

    if (
      sessionLoginToken &&
      sessionRefreshToken &&
      sessionId &&
      sessionName &&
      loginToken === sessionLoginToken &&
      refreshToken === sessionRefreshToken &&
      id === sessionId &&
      name === sessionName
    ) {
      setStatus(true);
    } else if (
      cookieLoginToken &&
      cookieRefreshToken &&
      cookieId &&
      cookieName
    ) {
      setStatus(true);
      setTokens({
        login: cookieLoginToken,
        refresh: cookieRefreshToken,
        id: cookieId,
        name: cookieName,
      });
    } else {
      setStatus(false);
    }
  }, [id, name, loginToken, refreshToken]);

  const value = {
    loginToken,
    refreshToken,
    id,
    name,
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
