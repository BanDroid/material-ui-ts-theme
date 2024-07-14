"use client";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useCustomTheme } from "@/config/theme";

export default function ToggleMode() {
  const { toggleColorMode, currentMode, currentTheme } = useCustomTheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {currentMode /* != undefined && currentMode */} mode in {currentTheme}{" "}
      theme
      <IconButton
        sx={{ ml: 1 }}
        onClick={() =>
          toggleColorMode("blue", currentMode !== "light" ? "light" : "dark")
        }
        color="inherit"
      >
        {currentMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
