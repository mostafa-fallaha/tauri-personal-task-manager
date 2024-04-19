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
// import InputTaskModal from "./InputTaskModal";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

interface Props {
  task: Task;
}

function MenuComponent({ task }: Props) {
  const [desc, setDesc] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu>
      <MenuButton background={"none"} _hover={{ background: "none" }}>
        <SlOptionsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            onOpen();
            setDesc(true);
          }}
        >
          Task Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            onOpen();
            setDesc(false);
          }}
        >
          Edit Task
        </MenuItem>
      </MenuList>
      <TaskDescModal
        isOpen={desc ? isOpen : false}
        onClose={onClose}
        task={task}
      />
      <EditTaskModal
        isOpen={desc ? false : isOpen}
        onClose={onClose}
        task={task}
      />
    </Menu>
  );
}

export default MenuComponent;
