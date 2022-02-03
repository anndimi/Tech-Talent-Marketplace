import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#704462",
    },
    secondary: {
      main: "#F8C53A",
      text: "#141414",
      overlay: "#51637099",
      aubergine: "#704462",
      yellow: "#F9F871",
      purple: "#342C42",
    },
  },
  typography: {
    primary: {
      fontFamily: "Spartan, sans-serif",
    },
    secondary: {
      fontFamily: "Urbanist, sans-serif",
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default theme;
