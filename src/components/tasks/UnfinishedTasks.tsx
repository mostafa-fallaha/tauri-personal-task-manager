import { Box } from "@chakra-ui/react";
import TaskBox from "./TaskBox";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

interface Props {
  taskStatus: boolean;
}

function UnfinishedTasks({ taskStatus }: Props) {
  const c = useSelector((state: RootState) => state.category.currentCategoryId);
  const tasks = useSelector((state: RootState) =>
    state.task.tasks.filter(
      (t) => t.task_done === taskStatus && t.category_id === c
    )
  );
  return (
    <Box
      marginTop={"1%"}
      overflowY={"auto"}
      marginLeft={"1%"}
      marginRight={"1%"}
      border={"1px solid #00274d"}
      backgroundColor={"#00274d"}
      borderRadius={"3px"}
      maxHeight={"65svh"}
    >
      {tasks.map((task) => (
        <TaskBox task={task} key={task.id} />
      ))}
    </Box>
  );
}

export default UnfinishedTasks;
