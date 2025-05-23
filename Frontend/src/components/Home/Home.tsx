import Books from "./Books/Books";
import Search from "./Search/Search";
import S from "./Home.module.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRemoveQueryParam } from "../../hooks/useRemoveQueryParam";
import useGetBooks from "../../api/reactQueryHooks/useGetBooks";
import useDelayedCallback from "../../hooks/useDelayedCallback";
import toast from "react-hot-toast";

const orderSucceedMsg = "Thank you for your purchase at BookStore";

const Home = () => {
  const [searchParams] = useSearchParams();
  const orderSucceed = searchParams.get("order-succeed");
  const [searchValue, setSearchValue] = useState("");
  const removeQueryParam = useRemoveQueryParam();

  const { isLoading, data, refetch } = useGetBooks({
    searchValue,
  });

  const changeSearch = (val: string) => {
    setSearchValue(val);
  };

  useDelayedCallback({
    callback: () => removeQueryParam("order-succeed"),
    timeout: 4000,
    enabled: !!orderSucceed,
  });

  useEffect(() => {
    if (orderSucceed) {
      toast.success(orderSucceedMsg);
    }
  }, [orderSucceed]);

  return (
    <section className={S.container}>
      <Search changeSearchValue={changeSearch} />
      <Books data={data} isLoading={isLoading} refetch={() => refetch()} />
    </section>
  );
};

export default Home;
