"use client";
import { lightBlue, indigo, red as pink } from "@mui/material/colors";
import { CustomThemeOptions } from "@/contexts/theme-provider";

/* simple explanation:
 * themes could have custom theme like blue or any kind of modification theme you want,
 * but for mode only reflect to light or dark.
 */

export const themes: CustomThemeOptions = {
  palette: {
    light: {
      primary: {
        // dark: indigo[700],
        main: indigo[400],
        // light: indigo[200],
        // contrastText: indigo[50],
      },
      // secondary: {
      //   main: "#078ad0",
      //   light: "#078ad033",
      // },
      // info: {
      //   main: "#0288d1",
      // },
      background: {
        default: "#F8F8F8",
        paper: "#FFFFFF",
      },
    },
    dark: {
      // primary: {
      //   dark: indigo[700],
      //   main: indigo[500],
      //   light: indigo[300],
      //   contrastText: indigo[50],
      // },
      // secondary: {
      //   main: "#078ad0",
      //   light: "#078ad033",
      // },
      // info: {
      //   main: "#0288d1",
      // },
      background: {
        default: "#010101",
        paper: "#121212",
      },
    },
    ocean: {
      primary: {
        main: lightBlue[500],
      },
      secondary: {
        main: indigo[500],
      },
      background: {
        default: lightBlue[50],
        paper: lightBlue[100],
      },
    },
    fuwa: {
      primary: {
        main: "#b1878d",
      },
      secondary: {
        main: "#9bcbc4",
      },
      background: {
        default: pink[50],
        paper: pink[100],
      },
    },
  },
};
