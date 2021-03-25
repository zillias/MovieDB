import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  loading: {
    position: "absolute",
    top: "50%",
    left: "45vw",
  },
  banner: {
    minHeight: 720,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white",
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 130,
    },
  },
  poster: {
    width: 300,
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
    },
  },

  image: {
    height: 450,
    borderRadius: 20,
  },
  rating: {
    position: "relative",
    marginLeft: 20,
  },
  baseCircle: {
    color: "#1f1901",
    backgroundColor: "black",
    borderRadius: 50,
  },
  ratingCircle: {
    position: "absolute",
    left: 0,
  },
  number: {
    position: "absolute",
    left: 27,
    top: 27,
    zIndex: 1,
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
  },
  castContainer: {
    position: "relative",
    maxHeight: 570,
    overflow: "auto",
    backgroundColor: "rgba(7, 7, 7, 0.76)",
    boxShadow: "0px 0px 8px black",
    paddingTop: 0,
    zIndex: 0,
    margin: "0 auto",
    maxWidth: 500,
  },
  info: {
    marginLeft: 20,
  },
  section: {
    marginBottom: 20,
  },
  listSubheader: {
    color: "#ffc400",
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "black",
  },
  playIcon: {
    positon: "relative",
    fontSize: 50,
    color: "#ffc400",
    marginLeft: 60,
    transition: "all 0.35s ease",
    cursor: "pointer",
    "&:hover": {
      fontSize: 80,
    },
  },
  genresContainer: {
    flexWrap: "wrap",
  },
  networksContainer: {
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  networkLogo: {
    filter: "drop-shadow(0px 0px 1px grey)",
    maxHeight: 70,
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));
