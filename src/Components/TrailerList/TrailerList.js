import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getVideos, upcoming } from "../../API";
import useStyles from "./Styles";

export default function TrailerList() {
  const [trailers, setTrailers] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const classes = useStyles();

  const getUpComingMovies = async () => {
    try {
      let {
        data: { results },
      } = await upcoming();
      results = await Promise.all(
        results.map(async (result) => {
          const { id, title, backdrop_path } = result;
          const {
            data: { results },
          } = await getVideos("movie", result.id);
          if (results?.length > 0) {
            const { key } = await results.find(
              (result) => result.site === "YouTube" && result.type === "Trailer"
            );
            return { id, title, key, backdrop_path };
          } else {
            return { id, title, backdrop_path };
          }
        })
      );
      setTrailers(results);
      setSelectedTrailer(results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpComingMovies();
  }, []);

  return (
    <>
      <div className={classes.trailersContainer}>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Lastest Trailers
        </Typography>
        {selectedTrailer && (
          <Grid
            container
            justify="center"
            alignItems="stretch"
            className={classes.trailersDisplay}
          >
            <Grid item xs={12} md={8} className={classes.videoWrapper}>
              <iframe
                className={classes.video}
                src={`https://www.youtube.com/embed/${selectedTrailer?.key}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              ></iframe>
            </Grid>
            <Grid item xs={12} md={4}>
              <List className={classes.list}>
                {trailers.map((trailer) => (
                  <>
                    <ListItem
                      key={trailer.id}
                      className={
                        selectedTrailer.id === trailer.id
                          ? `${classes.listItem}  ${classes.itemSelected}`
                          : `${classes.listItem}`
                      }
                      onClick={() => setSelectedTrailer(trailer)}
                    >
                      <img
                        className={classes.image}
                        src={`${process.env.REACT_APP_API_IMAGE_URL}/w300/${trailer.backdrop_path}`}
                        alt={trailer.title}
                      />
                      <ListItemText primary={trailer.title} />
                    </ListItem>
                    <div className={classes.divider}></div>
                  </>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}
