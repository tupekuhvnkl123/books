import { UserRole } from "./Users.types";

export type UserCtxType = {
  id: string;
  role: UserRole;
};

export type AuthCtxType = {
  isAuthenticated: boolean;
  user: UserCtxType | null;
  login: (res: { accessToken: string }) => void;
  logout: () => void;
  authLoading: boolean;
};
