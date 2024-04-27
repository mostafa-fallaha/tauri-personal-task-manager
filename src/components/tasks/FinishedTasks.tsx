import { Box } from "@chakra-ui/react";
import TaskBox from "./TaskBox";
// import { Task } from "../interfaces/Task";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
// import { RootState } from "../state/store";
// import { useSelector } from "react-redux";

// interface Props {
//   tasks: Task[];
// }

function FinishedTasks(/*{ tasks }: Props*/) {
  const tasks = useSelector((state: RootState) =>
    state.task.tasks.filter((t) => t.task_done === true)
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

export default FinishedTasks;
