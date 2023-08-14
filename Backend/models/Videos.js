const fs = require("fs");

const Videos = {
  all: function () {
    return JSON.parse(fs.readFileSync("./data/videoList.json", "utf8"));
  },
};

module.exports = Videos;
