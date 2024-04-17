import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

import { SlOptionsVertical } from "react-icons/sl";
import { Task } from "../interfaces/Task";
import TaskDescModal from "./TaskDescModal";

interface Props {
  task: Task;
}

function MenuComponent({ task }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu>
      <MenuButton background={"none"} _hover={{ background: "none" }}>
        <SlOptionsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onOpen}>Task Details</MenuItem>
        <MenuItem>Edit Task</MenuItem>
      </MenuList>
      <TaskDescModal isOpen={isOpen} onClose={onClose} task={task} />
    </Menu>
  );
}

export default MenuComponent;
