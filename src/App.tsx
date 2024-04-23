import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import Home2 from "./components/Home2";
import { IoSettingsSharp } from "react-icons/io5";
import ChangeAlarmModal from "./components/ChangeAlarmModal";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const handleClick = async () => {
    await invoke("select_file");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Grid
      templateAreas={{ base: `"aside main"` }}
      templateColumns={"250px 1fr"}
      height={"100svh"}
    >
      <GridItem area={"aside"} borderRight={"1px "}>
        <Menu>
          <MenuButton
            fontSize={"2rem"}
            position={"absolute"}
            bottom={"0"}
            left={"0"}
            marginBottom="3"
            marginLeft="4"
            background={"none"}
            _hover={{ background: "none" }}
          >
            <IoSettingsSharp />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Change Alarm sound</MenuItem>
            <MenuItem onClick={handleClick}>change</MenuItem>
          </MenuList>
        </Menu>
        <ChangeAlarmModal isOpen={isOpen} onClose={onClose} />
      </GridItem>

      <GridItem area={"main"}>
        <Home2 />
      </GridItem>
    </Grid>
  );
}

export default App;
