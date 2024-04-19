import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      "50": "#1a1a1a",
      "100": "#1a1a1a",
      "200": "#1a1a1a",
      "300": "#1a1a1a",
      "400": "#1a1a1a",
      "500": "#1a1a1a",
      "600": "#1a1a1a",
      "700": "#1a1a1a",
      "800": "#1a1a1a",
      "900": "#1a1a1a",
    },
  },
  breakpoints: {
    base: "0px",
    sm: "330px",
    sm2: "400px",
    md: "760px",
    md2: "1000px",
    lg: "1400px",
    xl: "1800px",
  },
});

export default theme;
