import React from "react";
import { useState } from "react";

import NavBar from "../browse/NavBar/NavBar";
import SearchForm from "./SearchForm/SearchForm";
import Movie from "../browse/MovieList/TypeOfMovie/Movie";
import MovieDetail from "../browse/MovieDetail/MovieDetail";

import classes from "./Search.module.css";

const API_KEY = `c8ef4789b5d7e0076467446fd3dd415f`;

const Search = () => {
  const [searchFilm, setSearchFilm] = useState([]);
  const [detail, setDetail] = useState(false);
  const [keyMovie, setKeyMovie] = useState("");
  const [detailFilm, setDetailFilm] = useState([]);
  const [noMovie, setNoMovie] = useState(false);

  const searchFilmHandler = async (inputvalue) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputvalue}`
      );

      const data = await res.json();
      const film = data.results;

      if (film.length == 0) {
        setNoMovie(true);
      } else {
        setNoMovie(false);
      }
      const loadedMovies = [];

      film
        .filter((m) => m.backdrop_path || m.poster_path)
        .forEach((movie) => {
          loadedMovies.push({
            id: movie.id,
            name: movie.original_title || movie.name,
            release: movie.release_date || movie.first_air_date,
            vote: movie.vote_average,
            overview: movie.overview,
            detailimg: `https://image.tmdb.org/t/p/original${
              movie.backdrop_path ? movie.backdrop_path : movie.poster_path
            }`,
            img: `https://image.tmdb.org/t/p/original${
              movie.poster_path ? movie.poster_path : movie.backdrop_path
            }`,
          });
        });
      setSearchFilm(loadedMovies);
    } catch (error) {
      console.log(error);
    }
  };

  // Sự kiện reset thông qua props khi bấm nút reset sẽ ẩn hết phim hoặc thông báo

  const onFilmHandler = () => {
    setNoMovie(false);
    setDetail(false);
    setSearchFilm([]);
  };

  // hiển thị chi tiết phim như trang original

  const detailHandler = (e, key) => {
    if (!keyMovie || key === keyMovie) {
      detail ? setDetail(false) : setDetail(true);
      setKeyMovie(key);
      setDetailFilm(searchFilm.filter((movie) => movie.id === key));
    } else {
      setDetail(true);
      setKeyMovie(key);
      setDetailFilm(searchFilm.filter((movie) => movie.id === key));
    }
  };

  return (
    <div className="app">
      <NavBar />
      <SearchForm onSearch={searchFilmHandler} onFilm={onFilmHandler} />
      <div>
        <h2 className={classes.title}>Search Results</h2>
        {detail && <MovieDetail onKey={keyMovie} onMovie={detailFilm} />}
        {noMovie && (
          <h2 className={classes.nofilm}>Không tìm thấy phim phù hợp!</h2>
        )}
        <div className={classes.box_original}>
          {searchFilm.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              img={movie.img}
              onDetail={detailHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
