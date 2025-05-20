import { BookType } from "../../../types/Books.types";
import S from "./PurchaseInfo.module.scss";

type PurchaseInfoProps = {
  author: BookType["author"];
  publisher: BookType["publisher"];
};

const PurchaseInfo = ({ author, publisher }: PurchaseInfoProps) => {
  return (
    <div className={S.container}>
      <div className={S.info}>
        <span>נכתב על ידי {author}</span>|
        <span>הוצא לאור על ידי {publisher}</span>
      </div>
      <button className={S.buyButton}>Buy</button>
    </div>
  );
};

export default PurchaseInfo;
