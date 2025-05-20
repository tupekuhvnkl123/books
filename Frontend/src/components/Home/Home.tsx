import Books from "./Books/Books";
import Search from "./Search/Search";
import S from "./Home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Popup from "../UI/Popup/Popup";
import { getBooks } from "../../api/Books";
import { getApiErr } from "../../utils/api-error";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["books", { searchValue }],
    queryFn: () => getBooks({ searchValue }),
  });

  const changeSearch = (val: string) => {
    setSearchValue(val);
  };

  return (
    <section className={S.container}>
      {isError && <Popup msg={getApiErr(error)} />}

      {/* Search Bar */}
      <Search changeSearchValue={changeSearch} />

      {/* Results */}
      <Books data={data} isLoading={isLoading} />
    </section>
  );
};

export default Home;
