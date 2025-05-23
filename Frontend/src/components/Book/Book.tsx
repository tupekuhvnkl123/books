import S from "./Book.module.scss";
import Content from "./Content/Content";
import PurchaseInfo from "./PurchaseInfo/PurchaseInfo";
import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { IoIosArrowBack } from "react-icons/io";
import { ROUTES } from "../../routes/routePaths";
import useGetBookById from "../../api/reactQueryHooks/useGetBookById";

const Book = () => {
  const { id = "" } = useParams();

  const { isLoading, data, isError } = useGetBookById({ id });

  if (isLoading) {
    return (
      <div className={S.processContainer}>
        <PuffLoader color="#118DF0" size={100} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={S.processContainer}>
        <Link className={S.homeLink} to={ROUTES.HOME}>
          Return To Home Page
        </Link>
      </div>
    );
  }

  const {
    img,
    title,
    description,
    price,
    author,
    publisher,
    id: bookId,
  } = data;

  return (
    <div className={S.container}>
      <div className={S.imageContainer}>
        <img src={img} alt={"image"} />
        <Link to={ROUTES.HOME} className={S.returnButton}>
          <IoIosArrowBack size={20} />
        </Link>
      </div>
      <Content title={title} price={price} description={description} />
      <PurchaseInfo author={author} publisher={publisher} bookId={bookId} />
    </div>
  );
};

export default Book;
