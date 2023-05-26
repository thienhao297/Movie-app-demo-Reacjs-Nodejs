import { useState, useEffect, useCallback } from "react";

import classes from "./Banner.module.css";

const Banner = (props) => {
  const [imgBanner, setImgBanner] = useState("");
  const [titleBanner, setTitleBanner] = useState("");
  const [overviewBanner, setOverviewBanner] = useState("");

  const imgLoad = useCallback(async () => {
    const res = await fetch(`https://api.themoviedb.org/3${props.onFetch}`);
    const data = await res.json();
    const film =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    const imgPath = film.backdrop_path || film.poster_path;
    const contentPath = [];
    contentPath.push({
      img: imgPath,
      name: film.name,
      overview: film.overview,
    });
    setImgBanner(`https://image.tmdb.org/t/p/original${contentPath[0].img}`);
    setTitleBanner(`${contentPath[0].name}`);
    setOverviewBanner(`${contentPath[0].overview.slice(0, 200)}`); // Lấy ký tự từ 0-200 trong overview vì một số over view quá dài mất thẩm mỹ
  }, []);
  useEffect(() => {
    imgLoad();
  }, [imgLoad]);
  return (
    <div className={classes.container}>
      <div>
        <img className={classes.banner} src={imgBanner}></img>
      </div>
      <div className={classes.content}>
        <h1>{titleBanner}</h1>
        <div>
          <button>Play</button>
          <button>Mylist</button>
        </div>
        <p className={classes.overview}>{overviewBanner}</p>
      </div>
    </div>
  );
};

export default Banner;
