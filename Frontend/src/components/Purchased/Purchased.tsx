import { useContext } from "react";
import S from "./Purchased.module.scss";
import { AuthCtx } from "../../context/AuthCtx";
import Books from "../Home/Books/Books";
import useGetPurchasedBooks from "../../api/reactQueryHooks/useGetPurchasedBooks";

const Purchased = () => {
  const { isAuthenticated } = useContext(AuthCtx);

  const { isLoading, data } = useGetPurchasedBooks({
    enabled: isAuthenticated,
  });

  return (
    <div className={S.container}>
      <h1 className={S.title}>Purchased Books</h1>
      <Books data={data} isLoading={isLoading} purchasedPage />
    </div>
  );
};

export default Purchased;
