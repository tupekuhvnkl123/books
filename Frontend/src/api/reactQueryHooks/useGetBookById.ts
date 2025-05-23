import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../Books";

type Props = { id: string };

const useGetBookById = ({ id }: Props) => {
  const res = useQuery({
    queryKey: [id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });

  return res;
};

export default useGetBookById;
