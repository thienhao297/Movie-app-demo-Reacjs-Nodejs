import { useRef, useState } from "react";

import classes from "./SearchForm.module.css";

const icon = (
  <svg
    className="svg-inline--fa fa-search fa-w-16"
    fill="#ccc"
    aria-hidden="true"
    data-prefix="fas"
    data-icon="search"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
  </svg>
);

const SearchForm = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const searchInputRef = useRef();
  const [noInput, setNoInput] = useState(false);

  // Dùng useRef để lấy input value sau khi bấm submit

  const submitHandler = (e) => {
    e.preventDefault();

    const inputValue = searchInputRef.current.value;

    if (inputValue.trim().length > 0) {
      setNoInput(false);
      props.onSearch(inputValue);
    } else {
      setNoInput(true);
    }
  };

  // tạo sự kiện cho nút reset như trang ban đầu

  const resetHanlder = () => {
    setEnteredValue("");
    setNoInput(false);
    props.onFilm();
  };

  return (
    <div className={classes.container}>
      <form className={classes.search_form} onSubmit={submitHandler}>
        <div className={classes.input_field}>
          <input
            type="text"
            ref={searchInputRef}
            onChange={(event) => setEnteredValue(event.target.value)}
            value={enteredValue}
          />
          <h2 className={classes.icon}>{icon}</h2>
        </div>
        {noInput && (
          <p className={classes.noinput}>
            Vui lòng nhập tên phim bạn muốn tìm!
          </p>
        )}
        <div className={classes.actions}>
          {/* Dùng type button cho nút reset tránh nhầm lẫn khi thao tác */}

          <button type="button" onClick={resetHanlder}>
            Reset
          </button>
          <button>Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
