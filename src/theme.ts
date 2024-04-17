import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      "50": "#EEE8FD",
      "100": "#D0BDF9",
      "200": "#B193F6",
      "300": "#9369F2",
      "400": "#743FEE",
      "500": "#5614EB",
      "600": "#4510BC",
      "700": "#340C8D",
      "800": "#22085E",
      "900": "#11042F",
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
