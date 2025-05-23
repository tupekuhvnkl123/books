import { BookType } from "../../../types/Books.types";
import S from "./PurchaseInfo.module.scss";
import { useContext } from "react";
import { AuthCtx } from "../../../context/AuthCtx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routePaths";
import { PuffLoader } from "react-spinners";
import usePurchaseBook from "../../../api/reactQueryHooks/usePurchaseBook";

type PurchaseInfoProps = {
  author: BookType["author"];
  publisher: BookType["publisher"];
  bookId: string;
};

const PurchaseInfo = ({ author, publisher, bookId }: PurchaseInfoProps) => {
  const { isAuthenticated } = useContext(AuthCtx);
  const navigate = useNavigate();

  const { mutate, isPending } = usePurchaseBook({ bookId });

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH.LOGIN);
    }
    mutate();
  };

  return (
    <div className={S.container}>
      <div className={S.info}>
        <span>author : {author}</span>
        <span>publisher : {publisher}</span>
      </div>
      <button className={S.buyButton} onClick={handleBuy} disabled={isPending}>
        {isPending ? <PuffLoader color="#fff" size={20} /> : "Buy"}
      </button>
    </div>
  );
};

export default PurchaseInfo;
