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

export type PopupCtxType = {
  popupIsVisible: boolean;
  message: string;
  showPopup: (msg: string) => void;
  closePopup: () => void;
};

export enum PopupTypes {
  ERROR = "error",
  SUCCESS = "success",
}
