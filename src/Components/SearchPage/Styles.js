import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  searchHeader: {
    paddingTop: 130,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
  },
  option: {
    padding: "10px 10px",
    fontSize: 15,
    "&:hover": {
      backgroundColor: "black",
      color: "#ffc400",
    },
  },
  resultsContainer: {
    padding: "0px 20px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  closeIcon: {
    cursor: "pointer",
  },
});
