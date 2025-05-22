import { useEffect, useState } from "react";
import {
  BookType,
  NewBookDataType,
  NewBookErrorsType,
} from "../types/Books.types";
import { newBookValidationErrors } from "../utils/validations/book.validation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBookById } from "../api/Books";
import { createBook, updateBook } from "../api/Admin";
import { ROUTES } from "../routes/routePaths";

const useNewBook = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<NewBookDataType>({});
  const [errors, setErrors] = useState<NewBookErrorsType>({});
  const [editPreviewImg, setEditPreviewImg] = useState<string | undefined>(
    undefined
  );

  const {
    data: fetchedBook,
    isSuccess,
    error: fetchDataError,
    isError: fetchDataIsError,
  } = useQuery({
    queryKey: [editId],
    queryFn: () => getBookById(editId!),
    enabled: !!editId,
  });

  const isEditMode = !!editId && isSuccess;

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: () =>
      isEditMode
        ? updateBook({ bookId: editId, data: bookData })
        : createBook(bookData),
    onSuccess: () => navigate(ROUTES.HOME),
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
    // img is cloudinary url and should be base64
    setEditPreviewImg(img);
  };

  const removeEditPreviewImg = () => {
    setEditPreviewImg(undefined);
  };

  return {
    bookData,
    errors,
    updateBookData,
    editPreviewImg,
    createBookHandler,
    isEditMode,
    isError: isError || fetchDataIsError,
    isPending,
    removeEditPreviewImg,
    error: error || fetchDataError,
  };
};

export default useNewBook;
