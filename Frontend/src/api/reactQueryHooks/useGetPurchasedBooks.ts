import { useQuery } from "@tanstack/react-query";
import { getPurchasedBooks } from "../Books";

type Props = { enabled: boolean };

const useGetPurchasedBooks = ({ enabled }: Props) => {
  const res = useQuery({
    queryKey: ["purchased"],
    queryFn: () => getPurchasedBooks(),
    enabled,
  });
  return res;
};

export default useGetPurchasedBooks;
