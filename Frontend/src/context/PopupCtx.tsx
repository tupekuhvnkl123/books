import { createContext, useState } from "react";
import { PopupCtxType } from "../types/context.types";

const initialValue = {
  popupIsVisible: false,
  message: "",
  showPopup: () => {},
  closePopup: () => {},
};

export const PopupCtx = createContext<PopupCtxType>(initialValue);

export const PopupCtxProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [popupIsVisible, setPopupIsVisible] = useState(false);

  const showPopup = (msg: string) => {
    setPopupIsVisible(true);
    setMessage(msg);
  };

  const closePopup = () => {
    setPopupIsVisible(false);
  };

  const popupCtxValue = { popupIsVisible, message, showPopup, closePopup };
  return (
    <PopupCtx.Provider value={popupCtxValue}>{children}</PopupCtx.Provider>
  );
};
