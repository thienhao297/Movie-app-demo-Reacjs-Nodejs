import { useState } from "react";
import { useEffect } from "react";

import classes from "./MovieDetail.module.css";
import { Fragment } from "react";

const MovieDetail = (props) => {
  const [backup, setBackup] = useState(false);
  const [keyVideo, setKeyVideo] = useState("");
  const [detail, setDetail] = useState([]);

  // Nhận id phim và xử lý API lấy data

  const movieDetail = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${props.onKey}/videos?api_key=c8ef4789b5d7e0076467446fd3dd415f&language=en-US`
      );

      if (!res.ok) {
        setBackup(true);
      }

      const data = await res.json();
      const film = data.results;

      // Nếu không có phim hoặc data rỗng sẽ hiển thị backdrop
      // Sau đó dùng finIndex để tìm vị trí phim thõa mãn Site và Type

      let siteYoutube;

      if (!film || film.length == 0) {
        setBackup(true);
      } else {
        siteYoutube = film.findIndex(
          (film) =>
            film.site === "YouTube" &&
            (film.type === "Trailer" || film.type === "Teaser")
        );
      }

      // Nếu không có video đạt yêu cầu Site và Type sẽ hiển thị backdrop nếu có sẽ sử dụng video làm trailer

      if (siteYoutube >= 0) {
        setBackup(false);
        setKeyVideo(film[siteYoutube].key);
      } else {
        setBackup(true);
      }

      setDetail(props.onMovie[0]);
    } catch (error) {}
  };

  useEffect(() => {
    movieDetail();
  }, [props.onKey, props.onMovie]);

  return (
    <div className={classes.detail}>
      {!backup && (
        <Fragment>
          <div className={classes.detail_content}>
            <h1 className={classes.title}>{detail.name}</h1>
            <h3>
              Release Date: {detail.release}
              <br /> Vote: {detail.vote}/10
            </h3>
            <p>{detail.overview}</p>
          </div>
          <div>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube-nocookie.com/embed/${keyVideo}`}
            />
          </div>
        </Fragment>
      )}
      {backup && (
        <Fragment>
          <div className={classes.detail_content}>
            <h1 className={classes.title}>{detail.name}</h1>
            <h3>
              Release Date: {detail.release}
              <br /> Vote: {detail.vote}/10
            </h3>
            <p>{detail.overview}</p>
          </div>
          <div>
            <img src={detail.detailimg} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default MovieDetail;
