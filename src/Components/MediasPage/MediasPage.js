import { Button, Grid, Typography, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getData } from "../../API";
import MovieCard from "../MovieCard/MovieCard";
import useStyles from "./Styles";

export default function MediasPage({ media, sort }) {
  const classes = useStyles();
  const [sortedMedias, setSortedMedias] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    (async () => {
      try {
        let data = await getData(media, sort);
        setSortedMedias(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [media, sort]);

  const addMedias = async () => {
    try {
      let data = await getData(media, sort, currentPage + 1);
      setSortedMedias({
        ...sortedMedias,
        results: sortedMedias.results.concat(data.results),
      });
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return !sortedMedias?.results ? (
    <CircularProgress size={70} className={classes.loading} />
  ) : (
    <Grid
      container
      xs={11}
      justify="flex-start"
      className={classes.mediasContainer}
      spacing={3}
    >
      <Grid xs={12} item>
        <Typography variant="h4">
          {sort === "popular"
            ? "Most Popular"
            : sort === "toprated"
            ? "Top Rated"
            : "Upcoming"}{" "}
          {media === "tv" ? "TvShows" : "Movies"}
        </Typography>
      </Grid>
      {sortedMedias?.results?.map((item) => (
        <Grid key={item.id} item xs={6} sm={4} md={2} className={classes.media}>
          <MovieCard
            id={item.id}
            name={item.name || item.title}
            vote={item.vote_average}
            date={item.release_date || item.first_air_date}
            image={item.image}
            media={media}
          />
        </Grid>
      ))}
      {currentPage < sortedMedias.total_pages && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => addMedias()}
        >
          Load More
        </Button>
      )}
    </Grid>
  );
}
