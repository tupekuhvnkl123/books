import { useMutation } from "@tanstack/react-query";
import { deleteBook } from "../Admin";
import toast from "react-hot-toast";
import { getApiErr } from "../../utils/api-error";

type Props = { bookId: string; callback?: () => void };

const useDeleteBook = ({ bookId, callback }: Props) => {
  const res = useMutation({
    mutationFn: () => deleteBook(bookId),
    onSuccess: () => {
      if (callback) {
        callback();
      }
      toast.success("Book deleted successfully");
    },
    onError: (err) => {
      toast.error(getApiErr(err));
    },
  });
  return res;
};

export default useDeleteBook;
