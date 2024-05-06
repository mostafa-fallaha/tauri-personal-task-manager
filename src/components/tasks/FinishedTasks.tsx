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
      width={"100%"}
      // display={"flex"}
      // flexWrap={"wrap"}
      marginTop={"5%"}
      // justifyContent={"center"}
      height={"60svh"}
      overflowY={"auto"}
    >
      {tasks.map((task, index) => (
        <TaskBox task={task} index={index} key={task.id} />
      ))}
    </Box>
  );
}

export default FinishedTasks;
