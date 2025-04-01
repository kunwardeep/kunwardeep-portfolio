import { useState } from "react";

const SearchBar = ({ searchFn }: { searchFn: (value: string) => void }) => {
  const defaultPlaceHolderText = "Search";
  const [value, setValue] = useState("");
  const [placeHolderText, setPlaceHolderText] = useState(
    defaultPlaceHolderText
  );

  const handleSearchInputOnClick = () => {
    if (placeHolderText === defaultPlaceHolderText) {
      setPlaceHolderText("");
    }
  };

  const handleSearchInputOnBlur = () => {
    if (placeHolderText === "") {
      setPlaceHolderText(defaultPlaceHolderText);
    }
  };

  const handleSearchInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    searchFn(e.target.value);
  };

  const handleClearBtnOnClick = () => {
    setPlaceHolderText(defaultPlaceHolderText);
    setValue("");
    searchFn("");
  };

  return (
    <div className="w-100 flex items-center justify-center">
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onBlur={handleSearchInputOnBlur}
          onClick={handleSearchInputOnClick}
          onChange={handleSearchInputOnChange}
          type="search"
          placeholder={placeHolderText}
          value={value}
        />

        {value !== "" && (
          <button
            onClick={handleClearBtnOnClick}
            type="submit"
            className="value-white absolute end-0.25 bottom-0.25 bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-sm value-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            X
          </button>
        )}
      </label>
    </div>
  );
};

export default SearchBar;
