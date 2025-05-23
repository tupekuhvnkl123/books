import S from "./Search.module.scss";
import { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

type SearchProps = {
  changeSearchValue: (val: string) => void;
};

const Search = ({ changeSearchValue }: SearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const debounceRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      changeSearchValue(value.trim());
    }, 500);
  };

  return (
    <div className={S.container}>
      <div className={S.inputContainer}>
        <input
          type="text"
          placeholder="Search Book"
          value={inputValue}
          onChange={handleChange}
        />
        <IoIosSearch size={25} />
      </div>
    </div>
  );
};

export default Search;
