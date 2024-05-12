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
  editingCat: (v: boolean) => void;
  id: number;
}

function CategoryMenu({ id, editingCat }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Menu>
      <MenuButton background={"none"} _hover={{ background: "none" }}>
        <SlOptionsVertical color="#00274d" />
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
        <MenuItem onClick={() => editingCat(true)}>Edit</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default CategoryMenu;
