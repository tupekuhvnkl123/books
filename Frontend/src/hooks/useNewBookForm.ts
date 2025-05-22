import { useState } from "react";
import { NewBookDataType, NewBookErrorsType } from "../types/Books.types";
import { newBookValidationErrors } from "../utils/validations/book.validation";

const useNewBookForm = () => {
  const [bookData, setBookData] = useState<NewBookDataType>({});
  const [errors, setErrors] = useState<NewBookErrorsType>({});

  const updateBookData = (field: keyof NewBookDataType, value: any) => {
    setBookData((prev) => ({ ...prev, [field]: value }));
  };

  const checkValidation = (): boolean => {
    const newErrors: NewBookErrorsType = newBookValidationErrors(bookData);
    setErrors(newErrors);
    if (Object.values(newErrors).every((err) => !err)) {
      return true;
    }
    return false;
  };

  return {
    bookData,
    updateBookData,
    errors,
    checkValidation,
  };
};

export default useNewBookForm;
