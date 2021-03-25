import axios from "axios";
import defaultMovieImg from "../../src/defaultMovieImg.jpg";
import defaultTvImg from "../../src/defaultTvImg.jpg";

const APIURL = process.env.REACT_APP_API_URL;
const APIKEY = process.env.REACT_APP_API_KEY;
const APIIMAGEURL = process.env.REACT_APP_API_IMAGE_URL;

export const trending = (media, period) =>
  axios.get(`${APIURL}/trending/${media}/${period}?api_key=${APIKEY}`);

export const topRated = (media, page) =>
  axios.get(`${APIURL}/${media}/top_rated?api_key=${APIKEY}&page=${page}`);
export const popular = (media, page) =>
  axios.get(`${APIURL}/${media}/popular?api_key=${APIKEY}&page=${page}`);
export const upcoming = (page) =>
  axios.get(`${APIURL}/movie/upcoming?api_key=${APIKEY}&page=${page}`);

export const getMedia = (media, id) =>
  axios.get(`${APIURL}/${media}/${id}?api_key=${APIKEY}`);

export const getVideos = (media, id) =>
  axios.get(`${APIURL}/${media}/${id}/videos?api_key=${APIKEY}&language=en-US`);

export const getCast = (media, id) =>
  axios.get(
    `${APIURL}/${media}/${id}/credits?api_key=${APIKEY}&language=en-US`
  );

export const getGenres = (media) =>
  axios.get(`${APIURL}/genre/${media}/list?api_key=${APIKEY}`);

export const getByGenres = (media, page, sortBy, genres) =>
  !genres
    ? axios.get(
        `${APIURL}/discover/${media}?api_key=${APIKEY}&page=${page}&sort_by=${sortBy}&vote_average.gte=${0.1}&vote_average.lte=${9.9}`
      )
    : axios.get(
        `${APIURL}/discover/${media}?api_key=${APIKEY}&sort_by=${sortBy}&page=${page}&with_genres=${genres}&vote_average.gte=${0.1}&vote_average.lte=${9.9}`
      );

export const search = async (searchValue, media = "all", currentPage = 1) => {
  let {
    data: { results: moviesResults, total_pages: moviesTotalPages },
  } = await axios.get(
    `${APIURL}/search/movie?api_key=${APIKEY}&query=${searchValue}&page=${currentPage}`
  );

  let {
    data: { results: tvResults, total_pages: tvTotalPages },
  } = await axios.get(
    `${APIURL}/search/tv?api_key=${APIKEY}&query=${searchValue}&page=${currentPage}`
  );
  let results;
  let total_pages;
  if (media === "all") {
    results = [...moviesResults, ...tvResults];
    total_pages =
      moviesTotalPages > tvTotalPages ? moviesTotalPages : tvTotalPages;
  } else if (media === "tv") {
    results = [...tvResults];
    total_pages = tvTotalPages;
  } else {
    results = [...moviesResults];
    total_pages = moviesTotalPages;
  }

  results = results.map((result) => {
    let id = result.id;
    let date = result.first_air_date || result.release_date;
    let name = result.name || result.title;

    let media = result.name ? "tv" : "movie";

    return { id, date, name, media };
  });

  return { results, total_pages };
};

export const getData = async (media, sort, page = 1, sortBy, genres) => {
  let {
    data: { results, total_pages },
  } =
    sort === "popular"
      ? await popular(media, page)
      : sort === "toprated"
      ? await topRated(media, page)
      : sort === "upcoming"
      ? await upcoming(page)
      : await getByGenres(media, page, sortBy, genres);

  results = results.map((result) => {
    const image = result.poster_path
      ? `${APIIMAGEURL}/w185${result.poster_path}`
      : result.title
      ? defaultMovieImg
      : defaultTvImg;

    const {
      id,
      title,
      release_date,
      vote_average,
      name,
      first_air_date,
    } = result;
    return {
      image,
      id,
      title,
      release_date,
      vote_average,
      name,
      first_air_date,
    };
  });
  return { total_pages, results };
};
