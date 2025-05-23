import { useMutation } from "@tanstack/react-query";
import { purchaseBook } from "../Books";

type Props = { bookId: string };

const usePurchaseBook = ({ bookId }: Props) => {
  const res = useMutation({
    mutationFn: () => purchaseBook(bookId),
    onSuccess: (res) => {
      window.location.href = res.checkoutUrl;
    },
  });
  return res;
};

export default usePurchaseBook;
