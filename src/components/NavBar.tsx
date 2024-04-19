import { Box, Button } from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom";
// import ColorSwitch from "./ColorSwitch";

function NavBar() {
  return (
    <Box width={"100%"}>
      <Link to="/">
        <Button width={"50%"}>finished</Button>
      </Link>

      <Link to="/finished">
        <Button width={"50%"}>unfinished</Button>
      </Link>

      <Outlet />
      {/* <ColorSwitch /> */}
    </Box>
  );
}

export default NavBar;
