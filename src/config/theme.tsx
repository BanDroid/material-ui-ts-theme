"use client";
import { Inter } from "next/font/google";
import {
  createTheme,
  ThemeProvider as MaterialUIThemeProvider,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
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
type PaletteMode = "light" | "dark";
type Theme = "light" | "dark" | "system";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const defaultBorderRadius = 20;

type CustomPaletteOptions = {
  [key: string]: PaletteOptions;
};
type CustomThemeOptions =
  | {
      palette: CustomPaletteOptions;
    } & ThemeOptions;

const themes: CustomThemeOptions = {
  palette: {
    light: {
      primary: {
        main: "#334ed8",
      },
      secondary: {
        main: "#078ad0",
        light: "#078ad033",
      },
      info: {
        main: "#0288d1",
      },
      background: {
        default: "#F8F8F8",
        paper: "#FFFFFF",
      },
    },
    dark: {
      primary: {
        main: "#334ed8",
      },
      secondary: {
        main: "#078ad0",
        light: "#078ad033",
      },
      info: {
        main: "#0288d1",
      },
      background: {
        default: "#010101",
        paper: "#010101",
      },
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    fontSize: 14,
  },
  spacing: 8,
  shape: {
    borderRadius: defaultBorderRadius,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopRightRadius: defaultBorderRadius,
          borderBottomRightRadius: defaultBorderRadius,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "inherit",
        elevation: 0,
        position: "sticky",
        sx: { top: 0 },
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
      styleOverrides: {
        root: {
          flexWrap: "wrap",
          gap: 2,
          paddingTop: "1rem",
          paddingBottom: "1rem",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 4,
          borderTopLeftRadius: defaultBorderRadius,
          borderTopRightRadius: defaultBorderRadius,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiBottomNavigation: {
      defaultProps: {
        sx: {
          "& .MuiBottomNavigationAction-root > .MuiSvgIcon-root": {
            width: "80%",
            maxWidth: "4rem",
            py: 0.25,
            mb: 1,
            borderRadius: defaultBorderRadius,
            transition: "background 150ms",
          },
          "& .MuiBottomNavigationAction-root.Mui-selected > .MuiSvgIcon-root": {
            bgcolor: "secondary.light",
            color: "text.primary",
          },
          "& .MuiBottomNavigationAction-root:active > .MuiSvgIcon-root": {
            bgcolor: "secondary.light",
          },
          "& .MuiBottomNavigationAction-root > .MuiBottomNavigationAction-label":
            { fontSize: "1rem" },
          "& .MuiBottomNavigationAction-root.Mui-selected > .MuiBottomNavigationAction-label":
            {
              color: "text.primary",
              fontSize: "1rem",
            },
          "& .MuiBottomNavigationAction-root:active > .MuiBottomNavigationAction-label":
            {},
        },
      },
    },
    MuiBottomNavigationAction: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: defaultBorderRadius,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: defaultBorderRadius * 3,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: defaultBorderRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: defaultBorderRadius,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "rgba(250,250,250,0.5)",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
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
      ...themes,
      palette: {
        ...themes.palette[theme],
        mode,
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
