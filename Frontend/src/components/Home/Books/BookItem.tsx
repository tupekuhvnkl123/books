import { BookPreviewType } from "../../../types/Books.types";
import S from "./BookItem.module.scss";
import { Link } from "react-router-dom";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { ROUTES } from "../../../routes/routePaths";

type ProductItemProps = {
  data: BookPreviewType;
  admin?: boolean;
};

const BookItem = ({ data }: ProductItemProps) => {
  const { img, price, title, id } = data;

  return (
    <Link to={ROUTES.BOOK(id)}>
      <div className={S.container}>
        <img src={img} alt="image" />
        <span className={S.title}>{title}</span>
        <div className={S.price}>
          <PiCurrencyDollarSimple color="#000" />
          <span>{price}</span>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
