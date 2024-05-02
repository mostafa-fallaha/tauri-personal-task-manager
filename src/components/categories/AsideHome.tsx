import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../state/category/categorySlice";
import { AppDispatch, RootState } from "../../state/store";
import CategoryBox from "./CategoryBox";
import ChangeAlarmModal from "./ChangeAlarmModal";
import AddCategory from "./AddCategory";
import { FaPlus } from "react-icons/fa6";

function AsideHome() {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();

  const [addCat, setAddCat] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box>
      <Tooltip label="Add Category">
        <Button
          background={"none"}
          _hover={{ background: "none" }}
          onClick={() => setAddCat(true)}
        >
          <FaPlus />
        </Button>
      </Tooltip>

      <Box>
        {categories.map((c) => (
          <CategoryBox category={c} />
        ))}
        {addCat && <AddCategory categoryAdded={() => setAddCat(false)} />}
      </Box>

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
          <MenuItem onClick={() => toggleColorMode()}>
            Change to {colorMode === "dark" ? "light" : "dark"} theme
          </MenuItem>
        </MenuList>
      </Menu>
      <ChangeAlarmModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default AsideHome;
