import { useSearchParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useRemoveQueryParam = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const removeParam = useCallback(
    (key: string, delay: number = 0) => {
      const updatedParams = new URLSearchParams(searchParams);

      if (!updatedParams.has(key)) return;

      const doRemove = () => {
        updatedParams.delete(key);
        const newUrl =
          window.location.pathname +
          (updatedParams.toString() ? `?${updatedParams.toString()}` : "");
        navigate(newUrl, { replace: true });
      };

      if (delay > 0) {
        setTimeout(doRemove, delay);
      } else {
        doRemove();
      }
    },
    [searchParams, navigate]
  );

  return removeParam;
};
