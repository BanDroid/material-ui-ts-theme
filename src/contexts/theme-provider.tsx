"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MaterialUIThemeProvider,
  PaletteOptions,
  ThemeOptions,
  alpha,
  createTheme,
  PaletteColorOptions,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Inter } from "next/font/google";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* simple explanation:
 * themes could have custom theme like blue or any kind of modification theme you want,
 * but for mode only reflect to light or dark.
 */
export type PaletteMode = string | "light" | "dark";
export type Theme = string | "light" | "dark";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const defaultBorderRadius = 20;

export type CustomPaletteOptions = {
  [key: string]: PaletteOptions;
};
export type CustomThemeOptions =
  | {
      palette: CustomPaletteOptions;
    } & ThemeOptions;

const defaultThemes: CustomThemeOptions = {
  palette: {},
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  spacing: 8,
  shape: {
    borderRadius: defaultBorderRadius,
  },
  components: {
    MuiDrawer: {
      defaultProps: {
        ModalProps: {
          keepMounted: true,
        },
      },
      styleOverrides: {
        paper: {
          borderTopRightRadius: defaultBorderRadius,
          borderBottomRightRadius: defaultBorderRadius,
        },
      },
    },
    MuiSwipeableDrawer: {
      defaultProps: {
        disableBackdropTransition: true,
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
          position: "relative",
          alignItems: "center",
          justifyContent: "space-evenly",
          "& .MuiBottomNavigationAction-root::before": {
            content: "''",
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            width: "0rem",
            height: "1.5rem",
            borderRadius: defaultBorderRadius,
            transition: "width .3s",
          },
          "& .MuiBottomNavigationAction-root.Mui-selected::before": {
            width: "3.5rem",
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
          },
          "& .MuiBottomNavigationAction-root:not(.Mui-selected):active::before":
            {
              width: "3.5rem",
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
            },
          "& .MuiBottomNavigationAction-root > .MuiSvgIcon-root": {
            color: (theme) => alpha(theme.palette.text.primary, 0.5),
            width: "100%",
            maxWidth: "3.5rem",
            py: 0.25,
            mb: 1,
          },
          "& .MuiBottomNavigationAction-root.Mui-selected > .MuiSvgIcon-root": {
            color: (theme) => theme.palette.text.primary,
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
      defaultProps: {
        sx: {
          "& .MuiPaper-root": {
            bgcolor: "background.default",
          },
        },
      },
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
export default function CustomThemeProvider({
  children,
  themes,
}: {
  children: ReactNode;
  themes: CustomThemeOptions;
}) {
  const [rendered, setRendered] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  );
  const [theme, setTheme] = useState<Theme>(prefersDarkMode ? "dark" : "light");
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
    const configuredTheme = createTheme({
      ...defaultThemes,
      ...themes,
      palette: {
        ...themes.palette[theme],
        mode: mode as "light" | "dark",
      },
    });
    const generatedPalette: any = {};
    if (!themes.palette[theme]) return configuredTheme;
    for (const [name, colors] of Object.entries(themes.palette[theme])) {
      if (name && typeof colors !== "undefined") {
        try {
          generatedPalette[name] = configuredTheme.palette.augmentColor({
            color: colors,
          });
        } catch (e: unknown) {
          continue;
        }
      }
    }
    return createTheme(configuredTheme, {
      palette: generatedPalette,
    });
  }, [mode, theme]);
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ColorModeContext.Provider
        value={{ ...colorMode, currentTheme: theme, currentMode: mode }}
      >
        <MaterialUIThemeProvider theme={customTheme}>
          <CssBaseline />
          {rendered && children}
        </MaterialUIThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
