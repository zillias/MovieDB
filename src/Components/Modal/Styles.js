import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  modalContainer: {
    height: 720,
    width: "100vw",
    display: "flex",
    justifyContent: "center",
  },
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#ffc400",
    fontSize: 40,
    width: "82vw",
    margin: "auto",
    outline: "none",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    paddingTop: "25px",
    width: "85%",
    height: 0,
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
  icon: {
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.4)",
    },
  },
});
