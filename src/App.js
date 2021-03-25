import React from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import MediasPage from "./Components/MediasPage/MediasPage";
import MediaPage from "./Components/MediaPage/MediaPage";
import GenresPage from "./Components/MediasPage/GenresPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import theme from "./Theme";
import { ThemeProvider } from "@material-ui/core";
import SearchPage from "./Components/SearchPage/SearchPage";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/find/:media/:id">
            <MediaPage />
          </Route>
          <Route exact path="/popular/tvshows">
            <MediasPage sort="popular" media="tv" />
          </Route>
          <Route exact path="/popular/movies">
            <MediasPage sort="popular" media="movie" />
          </Route>
          <Route exact path="/toprated/tvshows">
            <MediasPage sort="toprated" media="tv" />
          </Route>
          <Route exact path="/toprated/movies">
            <MediasPage sort="toprated" media="movie" />
          </Route>
          <Route exact path="/upcoming/movies">
            <MediasPage sort="upcoming" media="movie" />
          </Route>
          <Route exact path="/genres/movie/:genre">
            <GenresPage media="movie" />
          </Route>
          <Route exact path="/genres/tv/:genre">
            <GenresPage media="tv" />
          </Route>
          <Route exact path="/genres/movie">
            <GenresPage media="movie" />
          </Route>
          <Route exact path="/genres/tv">
            <GenresPage media="tv" />
          </Route>
          <Route exact path="/search/:query">
            <SearchPage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
