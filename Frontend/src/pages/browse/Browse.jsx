import React from "react";

import Banner from "./Banner/Banner";
import NavBar from "./NavBar/NavBar";
import MovieList from "./MovieList/MovieList";

// const API_KEY = `c8ef4789b5d7e0076467446fd3dd415f`;

const requests = {
  fetchTrending: `/trending`,
  // fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/top-rate`,
  fetchActionMovies: `/discover/28`,
  fetchComedyMovies: `/discover/35`,
  fetchHorrorMovies: `/discover/27`,
  fetchRomanceMovies: `/discover/10749`,
  fetchDocumentaries: `/discover/99`,
  // fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner onFetch={requests.fetchNetflixOriginals} />
      <MovieList onList={requests} />
    </div>
  );
}

export default Browse;
