import { useEffect, useState } from "react";
import {
  BookType,
  NewBookDataType,
  NewBookErrorsType,
} from "../../../../types/Books.types";
import { newBookValidationErrors } from "../../../../utils/validations/book.validation";
import { useSearchParams } from "react-router-dom";
import useGetBookById from "../../../../api/reactQueryHooks/useGetBookById";
import useCreateBook from "../../../../api/reactQueryHooks/useCreateBook";

const useNewBook = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId") || "";
  const [bookData, setBookData] = useState<NewBookDataType>({});
  const [errors, setErrors] = useState<NewBookErrorsType>({});
  const [editPreviewImg, setEditPreviewImg] = useState<string | null>();

  const { data: fetchedBook, isSuccess } = useGetBookById({ id: editId });

  const isEditMode = !!editId && isSuccess;

  const { isPending, mutate } = useCreateBook({
    bookData,
    editId,
    isEditMode,
  });

  useEffect(() => {
    if (fetchedBook && isSuccess) {
      setEditBookData(fetchedBook);
    }
  }, [fetchedBook, isSuccess]);

  const createBookHandler = () => {
    const isValid = checkValidation("editMode");
    if (!isValid) return;
    mutate();
  };

  const updateBookData = (field: keyof NewBookDataType, value: any) => {
    setBookData((prev) => ({ ...prev, [field]: value }));
  };

  const checkValidation = (editMode?: "editMode"): boolean => {
    const newErrors: NewBookErrorsType = newBookValidationErrors({
      bookData,
      editMode,
    });
    setErrors(newErrors);
    if (Object.values(newErrors).every((err) => !err)) {
      return true;
    }
    return false;
  };

  const setEditBookData = (book: BookType) => {
    const { title, description, price, author, publisher, img } = book;
    setBookData({ title, description, price, author, publisher });
    setEditPreviewImg(img);
  };

  const removeEditPreviewImg = () => {
    setEditPreviewImg(null);
  };

  return {
    bookData,
    errors,
    updateBookData,
    editPreviewImg,
    createBookHandler,
    isEditMode,
    isPending,
    removeEditPreviewImg,
  };
};

export default useNewBook;
