import { BookType } from "../../../types/Books.types";
import S from "./Content.module.scss";
import { PiCurrencyDollarSimple } from "react-icons/pi";

type ContentProps = {
  title: BookType["title"];
  price: BookType["price"];
  description: BookType["description"];
};

const Content = ({ title, price, description }: ContentProps) => {
  return (
    <div className={S.container}>
      {/* Title and Price */}
      <div className={S.title_price}>
        <h1>{title}</h1>
        <div className={S.priceContainer}>
          <PiCurrencyDollarSimple color="#000" size={20} />
          <span>{price}</span>
        </div>
      </div>

      <hr className={S.separateLine} />
      {/* Description */}
      <p className={S.description}>{description}</p>
    </div>
  );
};

export default Content;
