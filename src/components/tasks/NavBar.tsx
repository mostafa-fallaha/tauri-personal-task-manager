import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
// import ColorSwitch from "./ColorSwitch";

function NavBar() {
  const [isInF, setIsInF] = useState(false);
  return (
    <Box width={"100%"}>
      <Link to="/">
        <Button
          width={"50%"}
          background={"none"}
          borderRadius={0}
          borderRight={"1px"}
          fontSize={isInF ? "1.2rem" : "1.5rem"}
          onClick={() => setIsInF(false)}
        >
          Unfinished
        </Button>
      </Link>

      <Link to="/finished">
        <Button
          width={"50%"}
          background={"none"}
          borderRadius={0}
          borderLeft={"1px"}
          fontSize={isInF ? "1.5rem" : "1.2rem"}
          onClick={() => setIsInF(true)}
        >
          Finished
        </Button>
      </Link>

      <Outlet />
      {/* <ColorSwitch /> */}
    </Box>
  );
}

export default NavBar;
