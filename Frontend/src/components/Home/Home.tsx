import Books from "./Books/Books";
import Search from "./Search/Search";
import S from "./Home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Popup from "../UI/Popup/Popup";
import { getBooks } from "../../api/Books";

type HomeProps = { admin?: boolean };

const Home = ({ admin }: HomeProps) => {
  const [searchValue, setSearchValue] = useState("");

  const { isLoading, data, error, isError, refetch } = useQuery({
    queryKey: ["books", { searchValue }],
    queryFn: () => getBooks({ searchValue }),
  });

  const changeSearch = (val: string) => {
    setSearchValue(val);
  };

  return (
    <section className={S.container}>
      {isError && <Popup error={error} />}

      {/* Search Bar */}
      <Search changeSearchValue={changeSearch} />

      {/* Results */}
      <Books
        data={data}
        isLoading={isLoading}
        admin={admin}
        refetch={() => refetch()}
      />
    </section>
  );
};

export default Home;
