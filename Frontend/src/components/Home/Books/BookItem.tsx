import { BookPreviewType } from "../../../types/Books.types";
import S from "./BookItem.module.scss";
import { Link } from "react-router-dom";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { ROUTES } from "../../../routes/routePaths";
import BookActions from "../../Admin/BookActions/BookActions";
import PermissionGate from "../../HOC/PermissionGate";
import { UserRole } from "../../../types/Users.types";

type BookItemProps = {
  data: BookPreviewType;
  refetch?: () => void;
  purchasedPage?: boolean;
};

const BookItem = ({ data, refetch, purchasedPage }: BookItemProps) => {
  const { img, price, title, id } = data;

  return (
    <Link to={ROUTES.BOOK(id)}>
      <div className={S.container}>
        <div className={S.imageContainer}>
          <img src={img} alt="image" />
          {!purchasedPage && (
            <PermissionGate roles={[UserRole.ADMIN]}>
              <BookActions bookId={id} refetch={refetch} />
            </PermissionGate>
          )}
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
