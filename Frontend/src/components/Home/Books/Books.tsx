import BooksLoading from "./BooksLoading";
import S from "./Books.module.scss";
import Masonry from "react-masonry-css";
import BookItem from "./BookItem";
import { BookPreviewType } from "../../../types/Books.types";

type BooksProps = {
  data?: BookPreviewType[];
  isLoading: boolean;
  admin?: boolean;
  refetch?: () => void;
};

const Books = ({ data, isLoading, admin, refetch }: BooksProps) => {
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
  };

  if (isLoading) {
    return <BooksLoading />;
  }

  if (!data?.length) {
    return (
      <div className={S.empty}>
        <p>Books list is empty</p>
      </div>
    );
  }

  return (
    <Masonry breakpointCols={breakpointColumnsObj} className={S.container}>
      {data &&
        data.map((book) => (
          <BookItem key={book.id} data={book} admin={admin} refetch={refetch} />
        ))}
    </Masonry>
  );
};

export default Books;
