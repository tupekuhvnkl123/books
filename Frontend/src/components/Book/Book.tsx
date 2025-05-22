import { useQuery } from "@tanstack/react-query";
import S from "./Book.module.scss";
import Content from "./Content/Content";
import PurchaseInfo from "./PurchaseInfo/PurchaseInfo";
import { getBook } from "../../api/Books";
import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Popup from "../UI/Popup/Popup";
import { getApiErr } from "../../utils/api-error";
import { IoIosArrowBack } from "react-icons/io";
import { ROUTES } from "../../routes/routePaths";

const Book = () => {
  const { id } = useParams();

  const { isLoading, data, error, isError } = useQuery({
    queryKey: [id],
    queryFn: () => getBook(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={S.loadingContainer}>
        <PuffLoader color="#118DF0" size={100} />
      </div>
    );
  }

  if (!data || isError) {
    return (
      <div className={S.loadingContainer}>
        <Popup msg={getApiErr(error)} />
        <Link className={S.homeLink} to={ROUTES.HOME}>
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  const { img, title, description, price, author, publisher } = data;

  return (
    <div className={S.container}>
      {/* Book image */}
      <div className={S.imageContainer}>
        <img src={img} alt={"image"} />
        <Link to={ROUTES.HOME} className={S.returnButton}>
          <IoIosArrowBack size={20} />
        </Link>
      </div>
      {/* Main content of the book */}
      <Content title={title} price={price} description={description} />
      {/* Purchase */}
      <PurchaseInfo author={author} publisher={publisher} />
    </div>
  );
};

export default Book;
