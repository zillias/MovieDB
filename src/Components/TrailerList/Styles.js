import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  trailersContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 20px",
    overflow: "hidden",
    justifyItems: "flex-start",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "36.25%",
    paddingTop: "25px",
    height: 0,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "56.25%",
    },
  },
  video: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
  list: {
    maxHeight: 530,
    overflow: "auto",
    position: "relative",
    backgroundColor: "black",
    [theme.breakpoints.down("sm")]: {
      maxHeight: 300,
    },
  },
  listItem: {
    color: "#ffc400",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ffc400",
      color: "black",
    },
  },
  itemSelected: {
    backgroundColor: "#b28900",
    color: "black",
  },
  image: {
    width: 150,
    marginRight: 20,
  },
  divider: {
    border: "1px solid #b28900",
    width: "90%",
    margin: "0px auto",
    opacity: "0.3",
  },
}));
