import { Box } from "@chakra-ui/react";
import TaskBox from "./TaskBox";
import { Task } from "../interfaces/Task";

interface Props {
  tasks: Task[];
}

function UnfinishedTasks({ tasks }: Props) {
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
