import { useContext, useEffect } from "react";
import S from "./Purchased.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthCtx } from "../../context/AuthCtx";
import { useQuery } from "@tanstack/react-query";
import { getPurchasedBooks } from "../../api/Books";
import Popup from "../UI/Popup/Popup";
import Books from "../Home/Books/Books";
import { ROUTES } from "../../routes/routePaths";

const Purchased = () => {
  const navigate = useNavigate();
  const { authLoading, isAuthenticated } = useContext(AuthCtx);

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["purchased"],
    queryFn: () => getPurchasedBooks(),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate(ROUTES.AUTH.LOGIN);
    }
  }, [location, authLoading]);

  return (
    <div className={S.container}>
      {isError && <Popup error={error} />}
      <h1 className={S.title}>Purchased Books</h1>
      <Books data={data} isLoading={isLoading} />
    </div>
  );
};

export default Purchased;
