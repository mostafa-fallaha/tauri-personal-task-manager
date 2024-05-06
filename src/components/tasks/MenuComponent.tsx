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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setCurrTaskRunnig, setTaskStatus } from "../../state/task/taskSlice";

interface Props {
  task: Task;
}

function MenuComponent({ task }: Props) {
  const curRunTaskId = useSelector(
    (state: RootState) => state.task.curRunTaskId
  );
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
          onClick={() => {
            dispatch(setCurrTaskRunnig(task.id));
            // if (curRunTaskId === 0)
            // else if (task.id === curRunTaskId) {
            //   dispatch(setCurrTaskRunnig(0));
            // } else dispatch(setCurrTaskRunnig(task.id));
          }}
        >
          Prepare task to start
          {/* {task.id !== curRunTaskId
            ? "Prepare task to start"
            : curRunTaskId !== 0
            ? "Remove from Runnig Task"
            : "Prepare task to start"} */}
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(
              setTaskStatus({
                id: task.id,
                taskDone: !task.task_done,
              })
            );
            if (task.id === curRunTaskId) dispatch(setCurrTaskRunnig(0));
          }}
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
