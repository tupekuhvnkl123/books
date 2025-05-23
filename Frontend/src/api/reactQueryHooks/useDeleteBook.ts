import { useMutation } from "@tanstack/react-query";
import { deleteBook } from "../Admin";

type Props = { bookId: string; callback?: () => void };

const useDeleteBook = ({ bookId, callback }: Props) => {
  const res = useMutation({
    mutationFn: () => deleteBook(bookId),
    onSuccess: () => {
      if (callback) {
        callback();
      }
    },
  });
  return res;
};

export default useDeleteBook;
