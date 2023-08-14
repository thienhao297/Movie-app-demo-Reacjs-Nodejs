const Movies = require("../models/Movies");
const Genres = require("../models/Genres");
const Videos = require("../models/Videos");
const Paging = require("../utils/paging");

exports.getMovies = (req, res, next) => {
  const pageNum = req.query.page;
  const data = Movies.all();
  res.status(200).json(Paging(data, pageNum));
};

exports.getMoviesTrending = (req, res, next) => {
  const pageNum = req.query.page;
  const data = Movies.all().sort((a, b) => b.popularity - a.popularity);

  res.status(200).json(Paging(data, pageNum));
};

exports.getMoviesRating = (req, res, next) => {
  const pageNum = req.query.page;
  const data = Movies.all().sort((a, b) => b.vote_average - a.vote_average);

  res.status(200).json(Paging(data, pageNum));
};

exports.getMoviesDiscover = (req, res, next) => {
  const genreId = req.params.genreId;
  const pageNum = req.query.page;

  if (genreId == "") {
    res.status(400).json({ error: "Not found gerne parram" });
    return;
  }

  if (
    !Genres.all()
      .map((genre) => genre.id)
      .includes(Number(genreId))
  ) {
    res.status(404).json({ error: "Not found that genre id" });
    return;
  }

  const genreName = Genres.all().filter((gr) => gr.id == genreId);
  const data = Movies.all().filter((movie) =>
    movie.genre_ids.includes(Number(genreId))
  );

  res.status(200).json(Paging(data, pageNum, genreName[0].name));
};

exports.postMoviesVideo = (req, res, next) => {
  const videoId = req.body.film_id;
  const videoExist = Videos.all().filter((vd) => vd.id == videoId);

  if (videoId == "") {
    res.status(400).json({ error: "Not found film_id params" });
    return;
  }

  if (videoExist.length == 0) {
    res.status(404).json({ error: "Not found video" });
    return;
  }
  const video = Videos.all()
    .filter((vd) => vd.id == videoId)
    .filter(
      (vd) =>
        (vd.videos.official == true &&
          vd.videos.site === "Youtube" &&
          vd.videos.type === "Trailer") ||
        "Teaser"
    )[0].videos[0];

  res.status(200).json(video);
};

exports.postMoviesSearch = (req, res, next) => {
  const key = req.body.keyword;
  const pageNum = req.query.page;
  if (key == "") {
    res.status(400).json({ error: "Not found keyword parram" });
    return;
  }
  const genreId = Genres.all().filter((gr) => gr.name == req.body.genre);
  let data = Movies.all().filter((movie) => movie.overview.includes(key));

  if (genreId.length !== 0) {
    data = data.filter((movie) =>
      movie.genre_ids.includes(Number(genreId[0].id))
    );
  }

  if (req.body.media !== "all" && req.body.media !== "Media Type") {
    data = data.filter((movie) => movie.media_type.includes(req.body.media));
  }

  if (req.body.language !== "Language") {
    data = data.filter((movie) =>
      movie.original_language.includes(req.body.language)
    );
  }

  if (req.body.year !== "") {
    data = data.filter((movie) => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      return releaseYear === Number(req.body.year);
    });
  }

  res.status(200).json(Paging(data, pageNum));
};
