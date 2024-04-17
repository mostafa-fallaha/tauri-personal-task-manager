import { Box } from "@chakra-ui/react";
import TaskBox from "./TaskBox";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

function Tasks() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
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

export default Tasks;
