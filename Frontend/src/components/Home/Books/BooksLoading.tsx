import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import S from "./Books.module.scss";
import Masonry from "react-masonry-css";

const skeletonArr = [0, 1, 2, 3, 4, 5];

const BooksLoading = () => {
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
  };

  return (
    <Masonry breakpointCols={breakpointColumnsObj} className={S.container}>
      {skeletonArr.map((item, i) => (
        <div
          className={`${S.skeletonItem} ${i === 1 ? S.differentItem : ""}`}
          key={item}
        >
          <Skeleton className={S.image} borderRadius={20} />
          <Skeleton className={S.title} borderRadius={7} />
          <Skeleton className={S.price} borderRadius={7} />
        </div>
      ))}
    </Masonry>
  );
};

export default BooksLoading;
