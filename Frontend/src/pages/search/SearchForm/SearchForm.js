import { useRef, useState } from "react";

import classes from "./SearchForm.module.css";

const Genre = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

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
  const [enteredMedia, setEnteredMedia] = useState("");
  const [enteredGenre, setEnteredGenre] = useState("");
  const [enteredLanguage, setEnteredLanguage] = useState("");
  const [enteredYear, setEnteredYear] = useState("");
  const searchInputRef = useRef();
  const mediaInputRef = useRef();
  const genreInputRef = useRef();
  const languageInputRef = useRef();
  const yearInputRef = useRef();
  const [noInput, setNoInput] = useState(false);

  // Dùng useRef để lấy input value sau khi bấm submit

  const submitHandler = (e) => {
    e.preventDefault();

    const inputValue = searchInputRef.current.value;
    const mediaValue = mediaInputRef.current.value;
    const genreValue = genreInputRef.current.value;
    const languageValue = languageInputRef.current.value;
    const yearValue = yearInputRef.current.value;

    if (inputValue.trim().length > 0) {
      setNoInput(false);
      props.onSearch({
        keyword: inputValue,
        media: mediaValue,
        genre: genreValue,
        language: languageValue,
        year: yearValue,
      });
    } else {
      setNoInput(true);
    }
  };
  // tạo sự kiện cho nút reset như trang ban đầu

  const resetHanlder = () => {
    setEnteredValue("");
    setEnteredMedia("Media Type");
    setEnteredGenre("Genre");
    setEnteredLanguage("Language");
    setEnteredYear("");
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
        <div className={classes.option}>
          <div>
            <select
              ref={mediaInputRef}
              onChange={(event) => setEnteredMedia(event.target.value)}
              value={enteredMedia}
            >
              <option>Media Type</option>
              <option>all</option>
              <option>movie</option>
              <option>tv</option>
              <option>person</option>
            </select>
          </div>
          <div>
            <select
              ref={genreInputRef}
              onChange={(event) => setEnteredGenre(event.target.value)}
              value={enteredGenre}
            >
              <option>Genre</option>
              {Genre.map((gr) => (
                <option key={gr.id}>{gr.name}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              ref={languageInputRef}
              onChange={(event) => setEnteredLanguage(event.target.value)}
              value={enteredLanguage}
            >
              <option>Language</option>
              <option>en</option>
              <option>ja</option>
              <option>ko</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              ref={yearInputRef}
              onChange={(event) => setEnteredYear(event.target.value)}
              value={enteredYear}
              placeholder="Year release"
              min={1990}
              max={2023}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
