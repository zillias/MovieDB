import {
  Chip,
  Grid,
  MenuItem,
  Typography,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getData, getGenres } from "../../API";
import useStyles from "./Styles";
import MovieCard from "../MovieCard/MovieCard";
import { Redirect, useParams } from "react-router-dom";

export default function GenresPage({ media }) {
  const classes = useStyles();
  const { genre } = useParams();

  const [allgenres, setAllGenres] = useState([]);
  const [sort, setSort] = useState("popularity.desc");
  const [sortedMedias, setSortedMedias] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSeletedGenres] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { genres },
        } = await getGenres(media);

        setAllGenres(genres);

        genre
          ? genres.filter((item) => item.id === parseInt(genre)).length
            ? setSeletedGenres([parseInt(genre)])
            : setSeletedGenres("error")
          : setSeletedGenres([]);
      } catch (error) {
        console.log(error);
      }
    })();

    setSort("popularity.desc");
    setCurrentPage(1);
  }, [media, genre]);

  useEffect(() => {
    (async () => {
      try {
        const medias = await getData(
          media,
          "genre",
          currentPage,
          sort,
          selectedGenres && selectedGenres !== "error"
            ? selectedGenres.join()
            : null
        );
        setSortedMedias(medias);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedGenres, sort]);

  const selectGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSeletedGenres(selectedGenres.filter((genre) => genre !== id));
    } else setSeletedGenres([...selectedGenres, id]);
  };
  const addMedias = async () => {
    try {
      let data = await getData(
        media,
        "genre",
        currentPage + 1,
        sort,
        selectedGenres && selectedGenres.join()
      );
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
  ) : selectedGenres === "error" ? (
    <Redirect to="/*" />
  ) : (
    <>
      <Grid
        container
        alignItems="flex-start"
        className={classes.mediasContainer}
      >
        <Grid
          item
          container
          direction="row"
          xs={12}
          md={4}
          className={classes.filterContainer}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={11}>
            <Typography variant="h4">Select Genres</Typography>
          </Grid>
          <Grid item xs={11}>
            <div className={classes.genresContainer}>
              {allgenres.map((genre) => (
                <Chip
                  className={classes.genreItem}
                  key={genre.id}
                  label={genre.name}
                  onClick={() => {
                    selectGenre(genre.id);
                    setCurrentPage(1);
                  }}
                  color={
                    selectedGenres.includes(genre.id) ? "primary" : "default"
                  }
                  clickable
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={11}>
            <FormControl
              className={classes.sortFilter}
              variant="outlined"
              fullWidth
              focused
            >
              <InputLabel shrink>Sort by</InputLabel>
              <Select
                label="Sort by"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <MenuItem value="popularity.desc">Populariry</MenuItem>
                <MenuItem value="vote_average.desc">Rating</MenuItem>
              </Select>
              <FormHelperText style={{ color: "black" }}>
                Sort {media === "movie" ? "movies" : "tvshows"} by popularity or
                rating
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          md={8}
        >
          <Grid item container xs={11}>
            {sortedMedias?.results.length > 0 ? (
              sortedMedias?.results?.map((item) => (
                <Grid key={item.id} item xs={6} sm={4} md={3}>
                  <MovieCard
                    id={item.id}
                    name={item.name || item.title}
                    vote={item.vote_average}
                    date={item.release_date || item.first_air_date}
                    image={item.image}
                    media={media}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6">Sorry, no item found...</Typography>
            )}
          </Grid>
          {currentPage < sortedMedias?.total_pages && (
            <Grid item xs={11}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => addMedias()}
              >
                Load More
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
