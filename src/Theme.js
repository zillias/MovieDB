import { amber, blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: blue,
    text: {
      primary: "#1B1601",
      secondary: "#FBF8EC",
    },
  },
  typography: {
    fontFamily: ["lato"],
  },
});

export default theme;
