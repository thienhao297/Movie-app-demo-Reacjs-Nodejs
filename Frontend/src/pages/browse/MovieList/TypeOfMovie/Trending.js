import { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

// import useMovie from "../../../../hook/use-movie";
import useMovieLocalhost from "../../../../hook/use-movie-localhost";
import MovieDetail from "../../MovieDetail/MovieDetail";
import Movie from "./Movie";

import classes from "./OtherMovie.module.css";

const Trending = (props) => {
  const trending = useMovieLocalhost(props.onTrending);
  const [detail, setDetail] = useState(false);
  const [keyMovie, setKeyMovie] = useState("");
  const [detailFilm, setDetailFilm] = useState([]);

  const detailHandler = (e, key) => {
    if (!keyMovie || key === keyMovie) {
      detail ? setDetail(false) : setDetail(true);
      setKeyMovie(key);
      setDetailFilm(trending.filter((movie) => movie.id === key));
    } else {
      setDetail(true);
      setKeyMovie(key);
      setDetailFilm(trending.filter((movie) => movie.id === key));
    }
  };
  return (
    <div>
      <h2 className={classes.title}>Trending</h2>
      <ScrollContainer>
        <div className={classes.box_original}>
          {trending.map((movie) => (
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

export default Trending;
