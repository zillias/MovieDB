import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mediasList: {
    padding: "20px 20px",
  },
  trendingBanner: {
    backgroundColor: "black",
    paddingBottom: 20,
    padding: "20px 20px",
  },
  listHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  button: {
    fontSize: 13,
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 30,
    transition: "0.5s ease",
    "&:focus": {
      outline: 0,
    },
  },
  selectedButton: {
    backgroundColor: "#ffc400",
    color: "black",
  },
  movieList: {
    display: "flex",
    overflowX: "scroll",
    position: "relative",
  },
  selectButtonsContainer: {
    display: "flex",
    marginLeft: 60,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  selectButtons: {
    marginLeft: 20,
    border: "2px solid #ffc400",
    borderRadius: 30,
    margin: "20px auto",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  arrowsContainer: {
    width: "95vw",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 auto",
    color: "#ffc400",
  },
}));
