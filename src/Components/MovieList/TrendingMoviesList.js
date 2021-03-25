import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import MovieCard from "../MovieCard/MovieCard";
import { CircularProgress, Typography } from "@material-ui/core";
import * as api from "../../API";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function TrendingMoviesList() {
  const classes = useStyles();
  const [params, setParams] = useState({ period: "day", media: "all" });
  const [sortedMedias, setSortedMedias] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { results },
        } = await api.trending(params.media, params.period);
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
  }, [params]);

  return (
    <div className={classes.trendingBanner}>
      <div className={classes.listHeader}>
        <Typography variant="h4" color="primary">
          Trending Now
        </Typography>

        <div className={classes.selectButtonsContainer}>
          <div className={classes.selectButtons}>
            <button
              className={
                params.media === "all"
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() => setParams({ ...params, media: "all" })}
            >
              All
            </button>
            <button
              className={
                params.media === "movie"
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() => setParams({ ...params, media: "movie" })}
            >
              Movies
            </button>
            <button
              className={
                params.media === "tv"
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() => setParams({ ...params, media: "tv" })}
            >
              Tv Shows
            </button>
          </div>

          <div className={classes.selectButtons}>
            <button
              className={
                params.period === "day"
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() => setParams({ ...params, period: "day" })}
            >
              Today
            </button>
            <button
              className={
                params.period === "week"
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() => setParams({ ...params, period: "week" })}
            >
              This Week
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
                key={item.id}
                name={item.title || item.name}
                vote={item.vote_average}
                image={item.image}
                date={item.release_date || item.first_air_date}
                id={item.id}
                media={item.title ? "movie" : "tv"}
                textColor="white"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
