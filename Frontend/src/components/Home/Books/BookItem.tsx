import { BookPreviewType } from "../../../types/Books.types";
import S from "./BookItem.module.scss";
import { Link } from "react-router-dom";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { ROUTES } from "../../../routes/routePaths";
import BookActions from "../../Admin/BookActions/BookActions";

type ProductItemProps = {
  data: BookPreviewType;
  admin?: boolean;
  refetch?: () => void;
};

const BookItem = ({ data, refetch }: ProductItemProps) => {
  const { img, price, title, id } = data;

  return (
    <Link to={ROUTES.BOOK(id)}>
      <div className={S.container}>
        <div className={S.imageContainer}>
          <img src={img} alt="image" />
          <BookActions bookId={id} refetch={refetch} />
        </div>
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
