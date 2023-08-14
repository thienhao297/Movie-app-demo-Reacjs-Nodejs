import { useState, useEffect, useCallback } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import MovieDetail from "../../MovieDetail/MovieDetail";
import Movie from "./Movie";

import classes from "./Original.module.css";

const Original = (props) => {
  const [original, setOriginal] = useState([]);
  const [detail, setDetail] = useState(false);
  const [keyMovie, setKeyMovie] = useState("");
  const [detailFilm, setDetailFilm] = useState([]);

  // Xử lý API để lấy data danh sách film

  const originalLoad = useCallback(async () => {
    const res = await fetch(
      `http://localhost:5000/api/movies?token=8qlOkxz4wq`
    );

    const data = await res.json();
    const film = data.results;

    const loadedMovies = [];

    film.forEach((movie) => {
      loadedMovies.push({
        id: movie.id,
        name: movie.name || movie.title,
        release: movie.first_air_date,
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
    setOriginal(loadedMovies);
  }, []);

  // xử lý sự kiện click vào hình của phim
  // Khi click vào hình lần đầu sẽ hiển thị box trailer
  // Nếu click lại lần nữa sẽ kiểm tra nếu keyID giống keyID cũ thì ẩn box trailer, nếu khác thì hiển thị phim mới chọn

  const detailHandler = (e, key) => {
    if (!keyMovie || key === keyMovie) {
      detail ? setDetail(false) : setDetail(true);
      setKeyMovie(key);
      setDetailFilm(original.filter((movie) => movie.id === key));
    } else {
      setDetail(true);
      setKeyMovie(key);
      setDetailFilm(original.filter((movie) => movie.id === key));
    }
  };

  useEffect(() => {
    originalLoad();
  }, [originalLoad]);

  // Sử dụng ScrollContainer để kéo danh sách phim sang ngang

  return (
    <div>
      <ScrollContainer>
        <div className={classes.box_original}>
          {original.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              img={movie.img}
              onDetail={detailHandler}
            />
          ))}
        </div>
      </ScrollContainer>
      {detail && <MovieDetail onKey={keyMovie} onMovie={detailFilm} />}
    </div>
  );
};

export default Original;
