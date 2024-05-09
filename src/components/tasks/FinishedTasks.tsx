import { Box } from "@chakra-ui/react";
import TaskBox from "./TaskBox";
// import { Task } from "../interfaces/Task";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

// interface Props {
//   tasks: Task[];
// }

function FinishedTasks(/*{ tasks }: Props*/) {
  const c = useSelector((state: RootState) => state.category.currentCategoryId);
  const tasks = useSelector((state: RootState) =>
    state.task.tasks.filter((t) => t.task_done === true && t.category_id === c)
  );
  return (
    <Box
      marginTop={"1%"}
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

export default FinishedTasks;
