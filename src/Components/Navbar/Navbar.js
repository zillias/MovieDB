import { AppBar, Toolbar, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../MDB.png";
import logo2 from "../../MDB2.png";
import NavButton from "./NavButton";
import useStyles from "./Styles";

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="absolute" color="transparent">
      <Toolbar className={classes.appBar}>
        <Grid container justify="center" alignItems="center">
          <Grid
            item
            className={classes.logoContainer}
            alignItems="center"
            xs={12}
            sm={6}
          >
            <Link to="/">
              <img className={classes.logo} src={logo} alt="MDB" />
            </Link>
            <Link to="/">
              <img className={classes.logo2} src={logo2} alt="MDB" />
            </Link>
          </Grid>

          <Grid item container xs={12} sm={6} justify="space-evenly">
            <NavButton section="Movies" />
            <NavButton section="Series" />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
