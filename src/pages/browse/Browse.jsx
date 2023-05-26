import React from "react";

import Banner from "./Banner/Banner";
import NavBar from "./NavBar/NavBar";
import MovieList from "./MovieList/MovieList";

const API_KEY = `c8ef4789b5d7e0076467446fd3dd415f`;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
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
