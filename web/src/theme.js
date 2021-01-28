import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#003da5",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: "#ffb81c",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
  typography: {
    fontFamily: ["Oswald", "Fira Sans", "sans-serif"].join(","),
    h1: {
      fontFamily: "Oswald",
    },
    h2: {
      fontFamlity: "Oswald",
    },
    h3: {
      fontFamily: "Oswald",
    },
    h4: {
      fontFamlity: "Oswald",
    },
    h5: {
      fontFamily: "Oswald",
    },
    h6: {
      fontFamliy: "Oswald",
    },
    subtitle1: {
      fontFamily: "Fira Sans",
    },
    subtitle2: {
      fontFamily: "Fira Sans",
    },
    body1: {
      fontFamily: "Fira Sans",
    },
    body2: {
      fontFamily: "Fira Sans",
    },
  },
});
export default theme;
