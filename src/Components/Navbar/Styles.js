import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  logoContainer: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  logo: {
    width: 70,
  },
  logo2: {
    width: 200,
    marginLeft: 20,
  },
  appBar: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 0px",
    },
  },

  button: {
    fontSize: 15,
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid #ffc400",
    padding: "10px 20px",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "#ffc400",
      color: "black",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 10,
    },
  },
  moviesMenu: {
    background: "black",
    marginTop: 0,
    position: "relative",
    zIndex: 1,
    border: "1px solid #ffc400",
    borderTop: "none",
    boxShadow: "0px 0px 3px black",
  },
  menuItem: {
    color: "white",
    "&:hover": {
      color: "black",
      backgroundColor: "#ffc400",
    },
  },
}));
