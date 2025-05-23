import { createContext } from "react";
import { AuthCtxType } from "../types/context.types";
import useAuthCtx from "./hooks/useAuthCtx";

const initialValue = {
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  authLoading: true,
};

export const AuthCtx = createContext<AuthCtxType>(initialValue);

export const AuthCtxProvider = ({ children }: React.PropsWithChildren) => {
  const authCtxValue = useAuthCtx();

  return <AuthCtx.Provider value={authCtxValue}>{children}</AuthCtx.Provider>;
};
