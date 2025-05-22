import Books from "./Books/Books";
import Search from "./Search/Search";
import S from "./Home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Popup from "../UI/Popup/Popup";
import { getBooks } from "../../api/Books";
import { useSearchParams } from "react-router-dom";
import { useRemoveQueryParam } from "../../hooks/useRemoveQueryParam";

const orderSucceedMsg = "Thank you for your purchase at BookStore";

const Home = () => {
  const [searchParams] = useSearchParams();
  const orderSucceed = searchParams.get("order-succeed");
  const [searchValue, setSearchValue] = useState("");
  const removeQueryParam = useRemoveQueryParam();

  const { isLoading, data, error, isError, refetch } = useQuery({
    queryKey: ["books", { searchValue }],
    queryFn: () => getBooks({ searchValue }),
  });

  const changeSearch = (val: string) => {
    setSearchValue(val);
  };

  useEffect(() => {
    if (orderSucceed) {
      removeQueryParam("order-succeed", 4000); // remove after 4 seconds
    }
  }, [orderSucceed]);

  return (
    <section className={S.container}>
      {isError && <Popup error={error} />}
      {orderSucceed && <Popup type="success" msg={orderSucceedMsg} />}

      {/* Search Bar */}
      <Search changeSearchValue={changeSearch} />

      {/* Results */}
      <Books data={data} isLoading={isLoading} refetch={() => refetch()} />
    </section>
  );
};

export default Home;
