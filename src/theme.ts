import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#e0f4ff",
      100: "#b3daff",
      200: "#83c1fc",
      300: "#55a9fb",
      400: "#2f90fa",
      500: "#1f76e1",
      600: "#145caf",
      700: "#0a427e",
      800: "#00274d",
      900: "#000d1e",
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
