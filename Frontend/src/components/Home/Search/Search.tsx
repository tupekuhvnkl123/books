import S from "./Search.module.scss";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
type SearchProps = {
  changeSearchValue: (val: string) => void;
};

const Search = ({ changeSearchValue }: SearchProps) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim().length) {
        changeSearchValue(inputValue.trim());
      } else {
        changeSearchValue("");
      }
    }, 700); // debounce

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className={S.container}>
      <div className={S.inputContainer}>
        <input
          type="text"
          placeholder="חפש מוצר"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
        />
        <IoIosSearch size={15} />
      </div>
    </div>
  );
};

export default Search;
