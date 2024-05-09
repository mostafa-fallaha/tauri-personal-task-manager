import { Box } from "@chakra-ui/react";
import TaskBox from "./TaskBox";
// import { Task } from "../interfaces/Task";
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
      width={"100%"}
      // backgroundColor={"#fcfcfc"}
      // display={"flex"}
      // flexWrap={"wrap"}
      marginTop={"0%"}
      // justifyContent={"center"}
      // height={"60svh"}
      overflowY={"auto"}
      // borderBottom={"1px solid #a0a0a0"}
      borderTop={"1px solid #a0a0a0"}
    >
      {tasks.map((task, index) => (
        <TaskBox task={task} index={index} key={task.id} />
      ))}
    </Box>
  );
}

export default UnfinishedTasks;
