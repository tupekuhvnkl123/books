import { useSearchParams, useNavigate } from "react-router-dom";

export const useRemoveQueryParam = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const removeQuery = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);

    navigate(`${window.location.pathname}?${params.toString()}`, {
      replace: true,
    });
  };

  return removeQuery;
};
