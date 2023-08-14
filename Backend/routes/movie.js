const express = require("express");

const movieController = require("../controllers/movie");
const auth = require("../controllers/auth");

const router = express.Router();

router.get("/movies", auth.authenticateToken, movieController.getMovies);
router.get(
  "/movies/trending",
  auth.authenticateToken,
  movieController.getMoviesTrending
);
router.get(
  "/movies/top-rate",
  auth.authenticateToken,
  movieController.getMoviesRating
);
router.get(
  "/movies/discover/:genreId",
  auth.authenticateToken,
  movieController.getMoviesDiscover
);
router.post(
  "/movies/video",
  auth.authenticateToken,
  movieController.postMoviesVideo
);
router.post(
  "/movies/search",
  auth.authenticateToken,
  movieController.postMoviesSearch
);

module.exports = router;
