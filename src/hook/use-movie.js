import { useState, useEffect, useCallback } from "react";

// Sử dụng custom hook để sử dụng lại code cho các movie list. Original sử dụng poster nên không dùng chung custom hook

const useMovie = (movie) => {
  const [movieList, setmovieList] = useState([]);
  const movieLoad = useCallback(async () => {
    const res = await fetch(`https://api.themoviedb.org/3${movie}`);
    const data = await res.json();
    const film = data.results;
    const loadedMovies = [];

    film.forEach((movie) => {
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
          movie.backdrop_path ? movie.backdrop_path : movie.poster_path
        }`,
      });
    });
    setmovieList(loadedMovies);
  }, []);
  useEffect(() => {
    movieLoad();
  }, [movieLoad]);
  return movieList;
};

export default useMovie;
