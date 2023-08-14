const fs = require("fs");

const Users = {
  all: function () {
    return JSON.parse(fs.readFileSync("./data/userList.json", "utf8"));
  },
};

module.exports = Users;
