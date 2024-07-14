import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CustomThemeProvider } from "@/config/theme";

export const metadata = {
  title: "Material UI Theme",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CustomThemeProvider>{props.children}</CustomThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
