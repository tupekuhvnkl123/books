import S from "./Form.module.scss";
import {
  NewBookDataType,
  NewBookErrorsType,
} from "../../../../types/Books.types";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import Input from "./Input";

type FormProps = {
  updateBookData: (field: keyof NewBookDataType, value: any) => void;
  errors: NewBookErrorsType;
  bookData: NewBookDataType;
};

const Form = ({ updateBookData, errors, bookData }: FormProps) => {
  return (
    <div className={S.container}>
      <Input
        err={errors.title}
        inputProps={{
          name: "title",
          value: bookData.title,
          onChange: (e) => updateBookData("title", e.target.value),
          placeholder: "Title",
        }}
      />

      <Input
        err={errors.price}
        inputProps={{
          name: "price",
          value: bookData.price,
          type: "number",
          onChange: (e) => updateBookData("price", e.target.value),
          placeholder: "Price",
        }}
        icon={PiCurrencyDollarSimple}
      />

      <Input
        err={errors.description}
        isTextarea
        inputProps={{
          name: "description",
          value: bookData.description,
          onChange: (e) => updateBookData("description", e.target.value),
          placeholder: "Description",
        }}
      />

      <Input
        err={errors.publisher}
        inputProps={{
          name: "publisher",
          value: bookData.publisher,
          onChange: (e) => updateBookData("publisher", e.target.value),
          placeholder: "Publisher",
        }}
      />

      <Input
        err={errors.author}
        inputProps={{
          name: "author",
          value: bookData.author,
          onChange: (e) => updateBookData("author", e.target.value),
          placeholder: "Author",
        }}
      />
    </div>
  );
};

export default Form;
