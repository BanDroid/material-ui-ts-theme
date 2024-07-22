# Material UI - Next.js App Router example in TypeScript

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app) with Material UI installed and already made theme configuration for easier theming in your app.

> [!NOTE]  
> This example only change color theme, but not whole ThemeOptions, so if you want to modify other than palette, you have to modify it [here](./src/config/theme.tsx#L109-L117).

## How to use

You only need to modify themes in [theme.tsx](./src/config/theme.tsx#L25-L61):

1. add theme name in [here](./src/config/theme.tsx#L25).
2. then create your theme object in [this variable](./src/config/theme.tsx#L43-L74).
3. toggle or change theme using `useCustomTheme` from `"@/config/theme"`, see example [here](./src/app/toggle-mode.tsx).

## Learn more

To learn more about this example:

- [Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Customizing Material UI](https://mui.com/material-ui/customization/how-to-customize/) - approaches to customizing Material UI.
- This example was a modified version of [Material UI Next.js TypeScript example](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts)
