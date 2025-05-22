import { useMutation } from "@tanstack/react-query";
import { BookType } from "../../../types/Books.types";
import S from "./PurchaseInfo.module.scss";
import { purchaseBook } from "../../../api/Books";

type PurchaseInfoProps = {
  author: BookType["author"];
  publisher: BookType["publisher"];
  bookId: string;
};

const PurchaseInfo = ({ author, publisher, bookId }: PurchaseInfoProps) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => purchaseBook(bookId),
    onSuccess: (res) => {
      window.location.href = res.checkoutUrl;
    },
  });

  const handleBuy = () => {
    mutate();
  };

  return (
    <div className={S.container}>
      <div className={S.info}>
        <span>author : {author}</span>
        <span>publisher : {publisher}</span>
      </div>
      <button className={S.buyButton} onClick={handleBuy}>
        Buy
      </button>
    </div>
  );
};

export default PurchaseInfo;
