import useStyles from "./Styles";
import React, { useState } from "react";
import { Popper, MenuItem, MenuList, Collapse } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function NavButton({ section }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = (e) => {
    setAnchorEl(null);
  };
  return (
    <div onMouseOver={openMenu} onMouseLeave={closeMenu}>
      <button id="movies" className={classes.button}>
        {section}
      </button>
      <Popper open={true} anchorEl={anchorEl} onMouseLeave={closeMenu}>
        <Collapse in={anchorEl}>
          <MenuList className={classes.moviesMenu}>
            {section === "Movies" && (
              <Link to="/upcoming/movies">
                <MenuItem className={classes.menuItem}>Upcoming</MenuItem>
              </Link>
            )}
            <Link
              className={classes.menuItem}
              to={section === "Movies" ? "/popular/movies" : "/popular/tvshows"}
            >
              <MenuItem className={classes.menuItem}>Popular</MenuItem>
            </Link>
            {(section === "Movies" || section === "Series") && (
              <>
                <Link
                  to={
                    section === "Movies"
                      ? "/toprated/movies"
                      : "/toprated/tvshows"
                  }
                >
                  <MenuItem className={classes.menuItem}>Top Rated</MenuItem>
                </Link>
                <Link
                  to={section === "Movies" ? "/genres/movie" : "/genres/tv"}
                >
                  <MenuItem className={classes.menuItem}>Genres</MenuItem>
                </Link>
              </>
            )}
          </MenuList>
        </Collapse>
      </Popper>
    </div>
  );
}
