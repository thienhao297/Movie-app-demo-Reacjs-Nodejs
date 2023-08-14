const fs = require("fs");

const Genres = {
  all: function () {
    return JSON.parse(fs.readFileSync("./data/genreList.json", "utf8"));
  },
};

module.exports = Genres;
