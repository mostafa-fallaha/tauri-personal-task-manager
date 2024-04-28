import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../../state/category/categorySlice";
import { AppDispatch } from "../../state/store";
import { getTasks } from "../../state/task/taskSlice";

interface Props {
  id: number;
}

function CategoryMenu({ id }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Menu>
      <MenuButton background={"none"} _hover={{ background: "none" }}>
        <SlOptionsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            dispatch(deleteCategory(id));
            dispatch(getCategories());
            dispatch(getTasks());
          }}
        >
          delete
        </MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default CategoryMenu;
