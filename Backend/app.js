const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const cors = require("cors");

const moviesRoutes = require("./routes/movie");

app.use(cors({ origin: "http://localhost:3000" }));

app.use(cookieParser());
app.use(express.json());

app.use("/api", moviesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(5000);
