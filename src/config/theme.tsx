"use client";
import { lightBlue, blueGrey } from "@mui/material/colors";
import { CustomThemeOptions } from "@/contexts/theme-provider";

/* simple explanation:
 * themes could have custom theme like blue or any kind of modification theme you want,
 * but for mode only reflect to light or dark.
 */

export const themes: CustomThemeOptions = {
  palette: {
    light: {
      background: {
        default: blueGrey[50],
        paper: "#FFFFFF",
      },
    },
    dark: {
      background: {
        default: blueGrey[900],
        paper: blueGrey[800],
      },
    },
  },
};
