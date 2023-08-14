const userTokens = require("../data/userToken.json");

exports.authenticateToken = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = userTokens.find((user) => user.token === token);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
