import { useMutation } from "@tanstack/react-query";
import { createBook, updateBook } from "../Admin";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routePaths";
import { NewBookDataType } from "../../types/Books.types";

type Props = {
  editId: string;
  bookData: NewBookDataType;
  isEditMode: boolean;
};

const useCreateBook = ({ isEditMode, bookData, editId }: Props) => {
  const navigate = useNavigate();

  const res = useMutation({
    mutationFn: () =>
      isEditMode
        ? updateBook({ bookId: editId, data: bookData })
        : createBook(bookData),
    onSuccess: () => navigate(ROUTES.HOME),
  });

  return res;
};

export default useCreateBook;
