import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../Books";

type Props = { searchValue: string };

const useGetBooks = ({ searchValue }: Props) => {
  const res = useQuery({
    queryKey: ["books", { searchValue }],
    queryFn: () => getBooks({ searchValue }),
  });

  return res;
};

export default useGetBooks;
