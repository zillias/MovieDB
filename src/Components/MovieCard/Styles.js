import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  movieCard: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    position: "relative",
  },
  media: {
    maxWidth: 200,
    height: 230,
    borderRadius: 20,
  },
  rating: {
    position: "relative",
    top: -25,
    marginBottom: -30,
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
    left: 14,
    top: 10,
    zIndex: 1,
  },
  title: {
    textAlign: "center",
  },
}));
