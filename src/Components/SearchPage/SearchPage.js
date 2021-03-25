import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import useStyles from "./Styles";
import CloseIcon from "@material-ui/icons/Close";
import { search } from "../../API";
import { Link, useParams } from "react-router-dom";
import TheatersIcon from "@material-ui/icons/Theaters";
import TvIcon from "@material-ui/icons/Tv";

export default function SearchPage() {
  const classes = useStyles();
  const { query } = useParams();

  const [searchValue, setSearchValue] = useState({ text: query, media: "all" });
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    if (searchValue.text !== "") {
      (async () => {
        try {
          const { results, total_pages } = await search(
            searchValue.text,
            searchValue.media
          );
          setSearchResults({ results, total_pages });
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setSearchResults(null);
    }
  }, [searchValue]);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      try {
        const { results, total_pages } = await search(
          searchValue.text,
          searchValue.media,
          currentPage
        );
        setSearchResults({ results, total_pages });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage]);

  return (
    <Grid container className={classes.searchContainer}>
      <Grid item container spacing={2} xs={12} className={classes.searchHeader}>
        <Grid item xs={12} sm={3} md={2}>
          <Typography variant="h4" gutterBottom>
            Search
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <TextField
            placeholder="Enter your search..."
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={() => setSearchValue({ ...searchValue, text: "" })}
                />
              ),
            }}
            value={searchValue.text}
            onChange={(e) =>
              setSearchValue({ ...searchValue, text: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={4} sm={3} md={3}>
          <Select
            onChange={(e) =>
              setSearchValue({ ...searchValue, media: e.target.value })
            }
            value={searchValue.media}
            variant="outlined"
            fullWidth
          >
            <option className={classes.option} value="all">
              All
            </option>
            <option className={classes.option} value="movie">
              Movies
            </option>
            <option className={classes.option} value="tv">
              Tvshows
            </option>
          </Select>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.resultsContainer}>
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
                      {result.media === "tv" ? <TvIcon /> : <TheatersIcon />}
                      <Typography>
                        {result.media === "tv" ? "(TvShow)" : "(Movie)"}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      style={{ marginLeft: 40 }}
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
              <Typography>Sorry! No results found...</Typography>
            ))}
          {searchResults?.results?.length > 0 && (
            <Grid container alignItems="center" justify="space-between">
              {currentPage > 1 && (
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  variant="contained"
                  color="primary"
                >
                  Previous Page
                </Button>
              )}
              {searchResults.total_pages !== 1 && (
                <Typography>
                  Page {currentPage} of {searchResults.total_pages}
                </Typography>
              )}
              {currentPage < searchResults.total_pages && (
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  variant="contained"
                  color="primary"
                >
                  Next Page
                </Button>
              )}
            </Grid>
          )}
        </List>
      </Grid>
    </Grid>
  );
}
