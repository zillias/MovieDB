import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../../Cinema.jpg";

export default makeStyles((theme) => ({
  homeBanner: {
    backgroundImage: `url(${backgroundImage})`,
    width: "100vw",
    height: 650,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overscrollBehaviorX: "none",
  },
  homeTitle: {
    marginTop: "130px",
    marginBottom: "140px",
    [theme.breakpoints.down("sm")]: {
      marginTop: 170,
    },
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
  },
  search: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  searchBar: {
    border: "2px solid white",
    borderRadius: 25,
    width: "80vw",
    height: 48,
    margin: "0px auto 0px auto",
    color: "#1B1601",
    paddingLeft: 20,
    fontSize: 18,
    transition: "border 0.15s",
    "&:focus": {
      outline: "none",
      border: "3px solid #ffc400",
    },
  },
  searchButtonContainer: {
    position: "absolute",
    right: 3,
  },
  searchButton: {
    borderRadius: 20,
  },
  closeIcon: {
    position: "absolute",
    right: 130,
    zIndex: 1,
    color: "black",
  },

  popular: {
    marginTop: 40,
  },
  topRated: {
    marginTop: 40,
  },
  searchList: {
    backgroundColor: "white",
    maxHeight: "200px",
    overflow: "auto",
    borderRadius: 20,
    marginTop: "-40px",
    paddingTop: "40px",
    position: "relative",
    zIndex: 0,
    maxWidth: "80vw",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  footer: {
    backgroundColor: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px",
    alignItems: "center",
  },
  gitHubIcon: {
    marginLeft: 20,
    cursor: "pointer",
  },
}));
