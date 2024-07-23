"use client";
import { Inter } from "next/font/google";
import {
  createTheme,
  ThemeProvider as MaterialUIThemeProvider,
  PaletteOptions,
  ThemeOptions,
  alpha,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { indigo, lightBlue } from "@mui/material/colors";
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
        dark: indigo[700],
        main: indigo[400],
        light: indigo[200],
        contrastText: indigo[50],
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
        dark: indigo[700],
        main: indigo[500],
        light: indigo[300],
        contrastText: indigo[50],
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
        paper: "#121212",
      },
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
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
          width: "100%",
          height: "auto",
          minHeight: "55px",
          alignItems: "center",
          justifyContent: "space-evenly",
          "& .MuiBottomNavigationAction-root.Mui-selected": {
            transition: "all 0ms !important",
          },
          "& .MuiBottomNavigationAction-root > .MuiSvgIcon-root": {
            width: "80%",
            maxWidth: "3.5rem",
            py: 0.25,
            mb: 1,
            borderRadius: defaultBorderRadius,
            transition: "background 100ms",
            color: (theme) => alpha(theme.palette.text.primary, 0.5),
          },
          "& .MuiBottomNavigationAction-root.Mui-selected > .MuiSvgIcon-root": {
            // bgcolor: "secondary.light",
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.5),
            color: (theme) => theme.palette.text.primary,
          },
          "& .MuiBottomNavigationAction-root:active > .MuiSvgIcon-root": {
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.5),
          },
          "& .MuiBottomNavigationAction-root > .MuiBottomNavigationAction-label":
            {
              color: (theme) => alpha(theme.palette.text.primary, 0.5),
              fontSize: (theme) => theme.typography.button,
              textTransform: "none",
            },
          "& .MuiBottomNavigationAction-root.Mui-selected > .MuiBottomNavigationAction-label":
            {
              color: (theme) => theme.palette.text.primary,
              fontSize: (theme) => theme.typography.button,
              textTransform: "none",
            },
          "& .MuiBottomNavigationAction-root:active > .MuiBottomNavigationAction-label":
            {},
        },
      },
    },
    MuiBottomNavigationAction: {
      defaultProps: {
        disableRipple: true,
        sx: {
          py: 2,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: defaultBorderRadius * 1.5,
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
    MuiList: {
      defaultProps: {
        sx: {
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 1,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          overflow: "hidden",
          borderRadius: defaultBorderRadius * 2,
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
