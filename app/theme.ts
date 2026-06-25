// theme.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#B08D57",
    },

    background: {
      default: "#1A1715",
      paper: "#26211D",
    },

    text: {
      primary: "#F1E7D0",
      secondary: "#C2B59B",
    },
  },

  typography: {
    fontFamily: '"Inter", sans-serif',

    h1: {
      fontFamily: '"Luxurious Script", cursive',
      fontSize: "5.5rem",
      fontWeight: 400,
      lineHeight: 1.1,

      // important: prevents ugly fallback scaling
      letterSpacing: "0.02em",
    },

    h2: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
    },

    body1: {
      fontFamily: '"Kalam", cursive',
      fontSize: "1.15rem",
      lineHeight: 1.8,
    },

    body2: {
      fontFamily: '"Inter", sans-serif',
    },

    button: {
      fontFamily: '"Inter", sans-serif',
      textTransform: "none",
      fontWeight: 600,
    },
  },
});
