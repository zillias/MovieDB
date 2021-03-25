import {
  Typography,
  CircularProgress,
  Chip,
  Grid,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
  Avatar,
  ListSubheader,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { getCast, getMedia, getVideos } from "../../API";
import useStyles from "./Styles";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { GrUserFemale } from "react-icons/gr";
import { GrUser } from "react-icons/gr";
import TrailerModal from "../Modal/TrailerModal";
import defaultMovieImg from "../../../src/defaultMovieImg.jpg";
import defaultTvImg from "../../../src/defaultTvImg.jpg";

function MediaPage() {
  const { media, id } = useParams();
  const classes = useStyles();

  const [sortedMedia, setSortedMedia] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMedia(media, id);

        const {
          data: { cast, crew },
        } = await getCast(media, id);

        const director = crew?.filter((item) => item.job === "Director");
        const {
          data: { results },
        } = await getVideos(media, id);

        const trailer = results?.find((result) => result.site === "YouTube")
          ?.key;

        let sortedData = { ...data, cast };

        if (trailer?.length) {
          sortedData = { ...sortedData, trailer };
        }
        if (director?.length) {
          sortedData = { ...sortedData, director };
        }

        setSortedMedia({ ...sortedData });
      } catch (error) {
        console.log(error);
        setSortedMedia("error");
      }
    })();
  }, [id, media]);

  const formatDuration = (duration) => {
    let formattedDuration = "Unknown";
    if (duration.length) {
      duration = duration[0];
    }

    if (Math.floor(duration / 60)) {
      formattedDuration = `${Math.floor(duration / 60)}h ${Math.floor(
        duration % 60
      )}m`;
    } else if (Math.floor(duration % 60)) {
      formattedDuration = `${Math.floor(duration % 60)}m`;
    }
    return formattedDuration;
  };

  return !sortedMedia ? (
    <CircularProgress size={70} className={classes.loading} />
  ) : sortedMedia === "error" ? (
    <Redirect to="/*" />
  ) : (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.banner}
        style={{
          backgroundImage: `linear-gradient(rgba(32, 29, 11, 0.95), rgba(32, 29, 11, 0.95)), url(${process.env.REACT_APP_API_IMAGE_URL}/w1280${sortedMedia?.backdrop_path}`,
        }}
      >
        <Grid item xs={12} md={3} lg={2}>
          <div className={classes.poster}>
            <img
              className={classes.image}
              src={
                sortedMedia?.poster_path
                  ? `${process.env.REACT_APP_API_IMAGE_URL}/w342${sortedMedia?.poster_path}`
                  : sortedMedia?.title
                  ? defaultMovieImg
                  : defaultTvImg
              }
              alt={sortedMedia?.title || sortedMedia?.name}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <div className={`${classes.section} ${classes.title}`}>
            <Typography variant="h3" color="primary">
              {sortedMedia?.title || sortedMedia?.name}
              {(sortedMedia?.release_date || sortedMedia?.first_air_date) &&
                `(${
                  sortedMedia?.release_date?.split("-")[0] ||
                  sortedMedia?.first_air_date?.split("-")[0]
                })`}
            </Typography>
            {sortedMedia?.tagline && (
              <Typography variant="button">{`"${sortedMedia?.tagline}"`}</Typography>
            )}
          </div>

          <div className={classes.section}>
            {(sortedMedia?.release_date || sortedMedia?.first_air_date) && (
              <div className={classes.infoContainer}>
                <Typography color="primary">Release Date :</Typography>
                <Typography className={classes.info}>
                  {sortedMedia?.release_date?.split("-").reverse().join("/") ||
                    sortedMedia?.first_air_date
                      ?.split("-")
                      .reverse()
                      .join("/") ||
                    "Unknown"}
                </Typography>
              </div>
            )}
            {(sortedMedia?.runtime || sortedMedia?.episode_run_time) && (
              <div className={classes.infoContainer}>
                <Typography color="primary">Duration : </Typography>
                {
                  <Typography className={classes.info}>
                    {formatDuration(
                      sortedMedia?.runtime || sortedMedia?.episode_run_time
                    )}
                  </Typography>
                }
              </div>
            )}

            {sortedMedia?.number_of_seasons > 0 && (
              <div className={classes.infoContainer}>
                <Typography color="primary">Number of seasons :</Typography>
                <Typography className={classes.info}>
                  {sortedMedia?.number_of_seasons}
                </Typography>
              </div>
            )}
          </div>
          <div
            className={`${classes.infoContainer} ${classes.section} ${classes.genresContainer}`}
          >
            <Typography color="primary">
              {sortedMedia?.genres?.length > 1 ? "Genres :" : "Genre :"}
            </Typography>
            {sortedMedia?.genres?.length ? (
              sortedMedia?.genres.map((genre) => (
                <Link key={genre.id} to={`/genres/${media}/${genre.id}`}>
                  <Chip
                    className={classes.info}
                    style={{ marginTop: 5, marginBottom: 5 }}
                    label={genre.name}
                    clickable
                  />
                </Link>
              ))
            ) : (
              <Typography className={classes.info}>
                No genre specified
              </Typography>
            )}
          </div>
          <div className={`${classes.infoContainer} ${classes.section}`}>
            <Typography color="primary">Users rating :</Typography>
            {sortedMedia?.vote_average > 0 ? (
              <div className={classes.rating}>
                <Typography
                  className={classes.number}
                  variant="h4"
                  color="textSecondary"
                >
                  {sortedMedia?.vote_average !== 10
                    ? sortedMedia?.vote_average?.toFixed(1)
                    : sortedMedia?.vote_average}
                </Typography>
                <CircularProgress
                  className={classes.baseCircle}
                  variant="determinate"
                  value={100}
                  thickness={5}
                  size={100}
                />
                <CircularProgress
                  className={classes.ratingCircle}
                  variant="determinate"
                  value={sortedMedia?.vote_average * 10}
                  thickness={5}
                  size={100}
                />
              </div>
            ) : (
              <Typography className={classes.info}>Not Rated</Typography>
            )}

            {sortedMedia?.trailer && (
              <div
                className={`${classes.infoContainer} ${classes.info} ${classes.playIcon}`}
              >
                <Typography color="primary">Play Trailer</Typography>
                <PlayCircleOutlineIcon
                  fontSize="inherit"
                  color="inherit"
                  style={{ position: "absolute", marginLeft: 100 }}
                  onClick={() => setTrailer(sortedMedia?.trailer)}
                />
              </div>
            )}
          </div>
          {sortedMedia?.director && (
            <div className={`${classes.infoContainer} ${classes.section}`}>
              <Typography color="primary">
                {sortedMedia?.director?.length > 1
                  ? "Directors :"
                  : "Director:"}
              </Typography>
              {sortedMedia?.director?.map((item) => (
                <Typography className={classes.info} key={item.id}>
                  {item.name}
                </Typography>
              ))}
            </div>
          )}
          {sortedMedia?.created_by?.length > 0 && (
            <div className={`${classes.infoContainer} ${classes.section}`}>
              <Typography color="primary">Created by:</Typography>
              {sortedMedia?.created_by.map((item) => (
                <Typography className={classes.info} key={item.id}>
                  {item.name}
                </Typography>
              ))}
            </div>
          )}

          {sortedMedia?.networks?.length > 0 && (
            <div
              className={`${classes.infoContainer} ${classes.section} ${classes.networksContainer}`}
            >
              <Typography color="primary">
                {sortedMedia?.networks.length > 1 ? "Networks:" : "Network:"}
              </Typography>
              {sortedMedia?.networks.map((network) => (
                <img
                  className={`${classes.info} ${classes.networkLogo}`}
                  key={network.id}
                  style={{ marginTop: 5, marginBottom: 5 }}
                  src={`${process.env.REACT_APP_API_IMAGE_URL}/w92/${network.logo_path}`}
                  alt={network.name}
                />
              ))}
            </div>
          )}
          {sortedMedia?.overview && (
            <div className={classes.section}>
              <Typography color="primary">Overview :</Typography>
              <Typography>{sortedMedia?.overview}</Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={12} lg={2}>
          {sortedMedia?.cast?.length > 0 && (
            <div>
              <List className={classes.castContainer}>
                <ListSubheader className={classes.listSubheader}>
                  Cast
                </ListSubheader>
                {sortedMedia?.cast.map((actor) => (
                  <ListItem key={actor.id}>
                    {actor?.profile_path ? (
                      <ListItemAvatar>
                        <Avatar
                          src={`${process.env.REACT_APP_API_IMAGE_URL}/w185${actor.profile_path}`}
                          alt={actor.name}
                        />
                      </ListItemAvatar>
                    ) : actor.gender === 1 ? (
                      <ListItemAvatar>
                        <Avatar>
                          <GrUserFemale />
                        </Avatar>
                      </ListItemAvatar>
                    ) : (
                      <ListItemAvatar>
                        <Avatar>
                          <GrUser />
                        </Avatar>
                      </ListItemAvatar>
                    )}

                    <ListItemText
                      primary={actor.name}
                      secondary={actor.character}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </Grid>
      </Grid>
      {trailer && <TrailerModal trailer={trailer} setTrailer={setTrailer} />}
    </>
  );
}

export default MediaPage;
