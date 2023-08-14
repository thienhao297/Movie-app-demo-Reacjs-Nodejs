import { useState, useEffect, useCallback } from "react";

const useMovieLocalhost = (movie) => {
  const [movieList, setmovieList] = useState([]);
  const movieLoad = useCallback(async () => {
    const res = await fetch(
      `http://localhost:5000/api/movies${movie}?token=8qlOkxz4wq`
    );
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

export default useMovieLocalhost;
