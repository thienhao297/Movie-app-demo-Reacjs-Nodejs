import { Fragment } from "react";

import ActionMovies from "./TypeOfMovie/ActionMovies";
import Original from "./TypeOfMovie/Original";
import TopRated from "./TypeOfMovie/TopRated";
import Trending from "./TypeOfMovie/Trending";
import ComedyMovies from "./TypeOfMovie/ComedyMovies";
import HorrorMovies from "./TypeOfMovie/HorrorMovies";
import RomanceMovies from "./TypeOfMovie/RomanceMovies";
import Documentaries from "./TypeOfMovie/Documentaries";

const MovieList = (props) => {
  return (
    <Fragment>
      <section>
        <Original onOriginal={props.onList.fetchNetflixOriginals} />
        <Trending onTrending={props.onList.fetchTrending} />
        <TopRated onTopRated={props.onList.fetchTopRated} />
        <ActionMovies onAction={props.onList.fetchActionMovies} />
        <ComedyMovies onComedy={props.onList.fetchComedyMovies} />
        <HorrorMovies onHorror={props.onList.fetchHorrorMovies} />
        <RomanceMovies onRomance={props.onList.fetchRomanceMovies} />
        <Documentaries onDocument={props.onList.fetchDocumentaries} />
      </section>
    </Fragment>
  );
};

export default MovieList;
