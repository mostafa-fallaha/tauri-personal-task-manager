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
      marginTop={"%"}
      overflowY={"auto"}
      marginLeft={"1%"}
      marginRight={"1%"}
      borderTop={"1px solid #a0a0a0"}
      backgroundColor={"#b3b3b3"}
      borderRadius={"2px"}
    >
      {tasks.map((task) => (
        <TaskBox task={task} key={task.id} />
      ))}
    </Box>
  );
}

export default UnfinishedTasks;
