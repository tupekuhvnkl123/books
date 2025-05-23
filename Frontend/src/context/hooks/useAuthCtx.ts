import { useCallback, useLayoutEffect, useState } from "react";
import { AuthCtxType, UserCtxType } from "../../types/context.types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setSecureCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { UserJwtPayload } from "../../types/Users.types";
import { ROUTES } from "../../routes/routePaths";

const useAuthCtx = (): AuthCtxType => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserCtxType | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const decodeAndSetUser = (token: string) => {
    const decoded = jwtDecode<UserJwtPayload>(token);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) return logout();
    setUser(decoded.user);
    setAuthLoading(false);
  };

  const login = useCallback(({ accessToken }: { accessToken: string }) => {
    setSecureCookie({ name: "accessToken", value: accessToken, expires: 30 });
    decodeAndSetUser(accessToken);
    navigate(ROUTES.HOME);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("accessToken");
    setUser(null);
    setAuthLoading(false);
    navigate(ROUTES.HOME);
  }, []);

  useLayoutEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      decodeAndSetUser(accessToken);
    }
    setAuthLoading(false);
  }, []);

  return {
    isAuthenticated: !!user,
    login,
    logout,
    user,
    authLoading,
  };
};

export default useAuthCtx;
