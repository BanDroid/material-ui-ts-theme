import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function AppBar() {
  return (
    <MuiAppBar position="sticky">
      <Toolbar sx={{ paddingBottom: 0 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button variant="contained">Login</Button>
        <Tabs
          value={0}
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "auto",
            },
          }}
        >
          <Tab label="Games" />
          <Tab label="Socials" />
          <Tab label="Random" />
        </Tabs>
      </Toolbar>
    </MuiAppBar>
  );
}
