import {
  Typography,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import SearchIcon from "@material-ui/icons/Search";
import MovieList from "../MovieList/MoviesList";
import TrailerList from "../TrailerList/TrailerList";
import { search } from "../../API";
import CloseIcon from "@material-ui/icons/Close";
import TheatersIcon from "@material-ui/icons/Theaters";
import TvIcon from "@material-ui/icons/Tv";

import TrendingMoviesList from "../MovieList/TrendingMoviesList";
import { Link } from "react-router-dom";

export default function Home() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { results } = await search(searchValue);
        setSearchResults({ results });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchValue]);

  return (
    <>
      <div className={classes.homeBanner}>
        <div className={classes.homeTitle}>
          <Typography variant="h3" color="primary">
            The Movie Database
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Millions of movies, series and artists to discover...
          </Typography>
        </div>
        <div className={classes.searchContainer}>
          <div className={classes.search}>
            <input
              className={classes.searchBar}
              placeholder="Search for a movie, tvshow..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            {searchValue !== "" && (
              <Button
                color="primary"
                onClick={() => {
                  setSearchValue("");
                }}
                className={classes.closeIcon}
              >
                <CloseIcon />
              </Button>
            )}
            <Link
              className={classes.searchButtonContainer}
              to={`/search/${searchValue}`}
            >
              <Button
                className={classes.searchButton}
                color="primary"
                variant="contained"
                size="large"
              >
                <SearchIcon style={{ marginRight: 10 }} />
                Search
              </Button>
            </Link>
          </div>

          <Collapse in={searchValue !== ""} className={classes.searchList}>
            <List>
              {searchResults?.results &&
                (searchResults?.results?.length > 0 ? (
                  searchResults.results.map((result) => (
                    <Link
                      key={result.id}
                      to={`/find/${result.media}/${result.id}`}
                      className={classes.link}
                    >
                      <ListItem button>
                        <ListItemIcon className={classes.itemIcon}>
                          {result.media === "tv" ? (
                            <TvIcon />
                          ) : (
                            <TheatersIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            result.date
                              ? `${result.name} (${result.date.split("-")[0]})`
                              : result.name
                          }
                        />
                      </ListItem>
                    </Link>
                  ))
                ) : (
                  <ListItem>
                    <Typography>Sorry! No results found...</Typography>
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </div>
      </div>
      <TrendingMoviesList />
      <TrailerList />
      <MovieList section="Top Rated" />
      <MovieList section="Most Popular" />
    </>
  );
}
