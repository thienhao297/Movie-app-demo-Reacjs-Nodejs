import { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import useMovie from "../../../../hook/use-movie";
import MovieDetail from "../../MovieDetail/MovieDetail";
import Movie from "./Movie";

import classes from "./OtherMovie.module.css";

const TopRated = (props) => {
  const topRated = useMovie(props.onTopRated);
  const [detail, setDetail] = useState(false);
  const [keyMovie, setKeyMovie] = useState("");
  const [detailFilm, setDetailFilm] = useState([]);

  const detailHandler = (e, key) => {
    if (!keyMovie || key === keyMovie) {
      detail ? setDetail(false) : setDetail(true);
      setKeyMovie(key);
      setDetailFilm(topRated.filter((movie) => movie.id === key));
    } else {
      setDetail(true);
      setKeyMovie(key);
      setDetailFilm(topRated.filter((movie) => movie.id === key));
    }
  };
  return (
    <div>
      <h2 className={classes.title}>TopRated</h2>
      <ScrollContainer>
        <div className={classes.box_original}>
          {topRated.map((movie) => (
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

export default TopRated;
