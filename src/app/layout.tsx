import * as React from "react";
import { themes } from "@/config/theme";

import "./globals.css";

import CustomThemeProvider from "@/contexts/theme-provider";
import AppBar from "@/components/appbar";

export const metadata = {
  title: "Material UI Theme",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomThemeProvider themes={themes}>
          <AppBar />
          {props.children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
