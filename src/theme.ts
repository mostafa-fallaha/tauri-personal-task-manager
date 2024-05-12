import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/ubuntu";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#0d0d0d",
    },
  },
  breakpoints: {
    base: "0px",
    sm: "330px",
    sm2: "400px",
    md: "1050px",
    md2: "1200px",
    lg: "1500px",
    xl: "1800px",
  },
  fonts: {
    heading: `'Ubuntu', sans-serif`,
    body: `'Ubuntu', sans-serif`,
  },
});

export default theme;
