"use client";
import { Roboto } from "next/font/google";
import {
  createTheme,
  ThemeProvider as MaterialUIThemeProvider,
  PaletteOptions,
} from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { amber, deepOrange, grey, lightBlue } from "@mui/material/colors";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* simple explanation:
 * themes could have custom theme like blue or any kind of modification theme you want,
 * but for mode only reflect to light or dark.
 */
type Theme = PaletteMode | "blue" | "system";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const themes: {
  [key: string]: PaletteOptions;
} = {
  light: {
    primary: amber,
    divider: amber[200],
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  },
  dark: {
    primary: deepOrange,
    divider: deepOrange[700],
    background: {
      default: deepOrange[900],
      paper: deepOrange[900],
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
  blue: {
    primary: lightBlue,
    background: {
      default: lightBlue[900],
    },
  },
};

/*
 * just ignore all this.
 * IF IT'S WORK, DONT TOUCH IT.
 */
const ColorModeContext = createContext({
  toggleColorMode: (theme: Theme, mode: PaletteMode) => {},
  currentTheme: "",
  currentMode: "",
});
export function useCustomTheme() {
  return useContext(ColorModeContext);
}
export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [rendered, setRendered] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  );
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    setRendered(() => {
      const loadMode =
        localStorage.getItem("mode") || (prefersDarkMode ? "dark" : "light");
      const loadTheme =
        localStorage.getItem("theme") || (prefersDarkMode ? "dark" : "light");
      setTheme(loadTheme as Theme);
      setMode(loadMode as PaletteMode);
      return true;
    });
  }, []);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (theme: Theme, mode: PaletteMode | "system") => {
        setMode(
          mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode
        );
        setTheme(
          theme === "system" ? (prefersDarkMode ? "dark" : "light") : theme
        );
        localStorage.setItem("mode", mode);
        localStorage.setItem("theme", theme);
      },
    }),
    []
  );
  const customTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...themes[theme],
      },
      typography: {
        fontFamily: roboto.style.fontFamily,
      },
    });
  }, [mode, theme]);
  return (
    <ColorModeContext.Provider
      value={{ ...colorMode, currentTheme: theme, currentMode: mode }}
    >
      <MaterialUIThemeProvider theme={customTheme}>
        <CssBaseline />
        {rendered && children}
      </MaterialUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
