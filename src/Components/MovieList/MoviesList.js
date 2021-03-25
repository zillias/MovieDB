import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import MovieCard from "../MovieCard/MovieCard";
import { Typography, CircularProgress } from "@material-ui/core";
import * as api from "../../API";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function MoviesList({ section }) {
  const classes = useStyles();
  const [media, setMedia] = useState("movie");
  const [sortedMedias, setSortedMedias] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { results },
        } =
          section === "Top Rated"
            ? await api.topRated(media)
            : await api.popular(media);
        const sort = results.map((result) => {
          const image = `${process.env.REACT_APP_API_IMAGE_URL}/w185${result.poster_path}`;
          const {
            id,
            title,
            release_date,
            vote_average,
            name,
            first_air_date,
          } = result;
          return {
            image,
            id,
            title,
            release_date,
            vote_average,
            name,
            first_air_date,
          };
        });
        setSortedMedias(sort);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [media, section]);

  return (
    <div className={classes.mediasList}>
      <div className={classes.listHeader}>
        <Typography variant="h4" color="textPrimary">
          {section}
        </Typography>

        <div className={classes.selectButtonsContainer}>
          <div className={classes.selectButtons}>
            <button
              style={{ color: "black" }}
              className={
                media === "movie"
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() => setMedia("movie")}
            >
              Movies
            </button>
            <button
              style={{ color: "black" }}
              className={
                media === "tv"
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() => setMedia("tv")}
            >
              Tv Shows
            </button>
          </div>
        </div>
      </div>
      <div className={classes.arrowsContainer}>
        <ArrowBackIosIcon fontSize="large" />
        <ArrowForwardIosIcon fontSize="large" />
      </div>
      <div className={classes.movieList}>
        {!sortedMedias ? (
          <CircularProgress />
        ) : (
          sortedMedias.map((item) => (
            <div style={{ marginRight: "20px" }}>
              <MovieCard
                name={item.title || item.name}
                vote={item.vote_average}
                image={item.image}
                date={item.release_date || item.first_air_date}
                id={item.id}
                media={item.title ? "movie" : "tv"}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
