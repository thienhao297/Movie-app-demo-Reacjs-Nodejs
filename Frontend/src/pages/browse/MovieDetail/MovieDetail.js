import { useCallback, useState } from "react";
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
        `http://localhost:5000/api/movies/video?token=8qlOkxz4wq`,
        {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ film_id: props.onKey }),
        }
      );

      if (!res.ok) {
        setBackup(true);
      } else {
        setBackup(false);
      }

      const data = await res.json();
      // const film = data.results;

      // let siteYoutube;

      // if (!film || film.length == 0) {
      //   setBackup(true);
      // } else {
      //   siteYoutube = film.findIndex(
      //     (film) =>
      //       film.site === "YouTube" &&
      //       (film.type === "Trailer" || film.type === "Teaser")
      //   );
      // }

      // if (siteYoutube >= 0) {
      //   setBackup(false);
      //   setKeyVideo(film[siteYoutube].key);
      // } else {
      //   setBackup(true);
      // }
      setKeyVideo(data.key);
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
