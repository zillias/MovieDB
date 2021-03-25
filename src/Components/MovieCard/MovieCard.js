import React from "react";
import { Link } from "react-router-dom";

import { Typography, CircularProgress } from "@material-ui/core";
import useStyles from "./Styles";

export default function MovieCard({
  name,
  vote,
  date,
  image,
  id,
  media,
  textColor,
}) {
  const classes = useStyles();
  return (
    <div>
      <Link to={`/find/${media}/${id}`} className={classes.movieCard}>
        <img className={classes.media} src={image} alt={name} />
        <div className={classes.rating}>
          <Typography
            className={classes.number}
            variant="subtitle1"
            color="textSecondary"
          >
            {vote !== 10 ? (vote === 0 ? "NR" : vote?.toFixed(1)) : ` ${vote}`}
          </Typography>
          <CircularProgress
            className={classes.baseCircle}
            variant="determinate"
            value={100}
            thickness={5}
            size={50}
          />
          <CircularProgress
            className={classes.ratingCircle}
            variant="determinate"
            value={vote * 10}
            thickness={5}
            size={50}
          />
        </div>
        <div className={classes.title}>
          <Typography
            variant="body1"
            color={textColor === "white" ? "textSecondary" : "textPrimary"}
          >
            {name}
          </Typography>
          <Typography
            className={classes.date}
            variant="subtitle2"
            color={textColor === "white" ? "textSecondary" : "textPrimary"}
          >
            {date && `(${date?.split("-")[0]})`}
          </Typography>
        </div>
      </Link>
    </div>
  );
}
