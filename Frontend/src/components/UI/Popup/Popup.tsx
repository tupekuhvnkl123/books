import { useEffect, useState } from "react";
import S from "./Popup.module.scss";
import { ReactSVG } from "react-svg";
import { getApiErr } from "../../../utils/api-error";

type PopupProps = {
  msg?: string;
  error?: Error;
  type?: "error" | "success";
};

const Popup = ({ msg, type = "error", error }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Automatically close after 3 seconds
    const timer = setTimeout(() => handleClose(), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 200);
  };

  if (!isVisible) return null;

  return (
    <div className={`${S.container} ${isClosing && S.closing}`}>
      <p>{type ? getApiErr(error) : msg}</p>
      <ReactSVG
        src="/icons/UI/close.svg"
        onClick={handleClose}
        className={S.closeBtn}
      />
    </div>
  );
};

export default Popup;
