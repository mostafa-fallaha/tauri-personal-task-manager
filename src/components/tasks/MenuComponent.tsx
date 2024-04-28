import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

import { SlOptionsVertical } from "react-icons/sl";
import Task from "../../interfaces/Task";
import TaskDescModal from "./TaskDescModal";
// import InputTaskModal from "./InputTaskModal";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setTaskStatus } from "../../state/task/taskSlice";

interface Props {
  task: Task;
}

function MenuComponent({ task }: Props) {
  const dispatch = useDispatch<AppDispatch>();
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
        <MenuItem
          onClick={() =>
            dispatch(
              setTaskStatus({
                id: task.id,
                taskDone: !task.task_done,
              })
            )
          }
        >
          set Task as {task.task_done ? "unfinished" : "finished"}
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
        id={task.id}
      />
    </Menu>
  );
}

export default MenuComponent;
