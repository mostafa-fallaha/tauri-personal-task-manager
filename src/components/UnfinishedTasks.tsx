import { Box } from "@chakra-ui/react";
import TaskBox from "./TaskBox";
// import { Task } from "../interfaces/Task";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

// interface Props {
//   tasks: Task[];
// }

function UnfinishedTasks(/*{ tasks }: Props*/) {
  const tasks = useSelector((state: RootState) =>
    state.task.tasks.filter((t) => t.task_done === false)
  );
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexWrap={"wrap"}
      marginTop={"5%"}
      justifyContent={"center"}
    >
      {tasks.map((task) => (
        <TaskBox task={task} />
      ))}
    </Box>
  );
}

export default UnfinishedTasks;
