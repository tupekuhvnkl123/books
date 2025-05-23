import { useMutation } from "@tanstack/react-query";
import { purchaseBook } from "../Books";
import toast from "react-hot-toast";
import { getApiErr } from "../../utils/api-error";

type Props = { bookId: string };

const usePurchaseBook = ({ bookId }: Props) => {
  const res = useMutation({
    mutationFn: () => purchaseBook(bookId),
    onSuccess: (res) => {
      window.location.href = res.checkoutUrl;
    },
    onError: (err) => {
      toast.error(getApiErr(err));
    },
  });
  return res;
};

export default usePurchaseBook;
