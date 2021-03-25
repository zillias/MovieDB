import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./Styles";

export default function ErrorPage() {
  const classes = useStyles();
  return (
    <div className={classes.errorContainer}>
      <Typography variant="h3" gutterBottom>
        Page Not Found !
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
