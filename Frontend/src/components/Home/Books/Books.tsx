import SkeletonLoading from "./SkeletonLoading";
import S from "./Books.module.scss";
import Masonry from "react-masonry-css";
import BookItem from "./BookItem";
import { BookPreviewType } from "../../../types/Books.types";

type BooksProps = {
  data?: BookPreviewType[];
  isLoading: boolean;
};

const Books = ({ data, isLoading }: BooksProps) => {
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <Masonry breakpointCols={breakpointColumnsObj} className={S.container}>
      {data && data.map((book) => <BookItem key={book.id} data={book} />)}
    </Masonry>
  );
};

export default Books;
