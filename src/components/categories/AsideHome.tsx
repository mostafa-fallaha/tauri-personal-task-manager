import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { IoSettingsSharp } from "react-icons/io5";
import ChangeAlarmModal from "./ChangeAlarmModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { useEffect } from "react";
import { getCategories } from "../../state/category/categorySlice";
import CategoryBox from "./CategoryBox";

function AsideHome() {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box>
      <Box>
        {categories.map((c) => (
          <CategoryBox category={c} />
        ))}
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
        </MenuList>
      </Menu>
      <ChangeAlarmModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default AsideHome;
