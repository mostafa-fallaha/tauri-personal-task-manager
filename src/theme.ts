import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#e0ffe0",
      100: "#b1ffb1",
      200: "#80ff80",
      300: "#4fff4e",
      400: "#25ff20",
      500: "#14e60c",
      600: "#08b304",
      700: "#008000",
      800: "#004d00",
      900: "#001b00",
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
