export type UserCtxType = {
  id: string;
  role: "admin" | "user";
};

export type AuthCtxType = {
  isAuthenticated: boolean;
  user: UserCtxType | null;
  login: (res: { accessToken: string }) => void;
  logout: () => void;
  authLoading: boolean;
};
