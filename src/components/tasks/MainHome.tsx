import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { getTasks } from "../../state/task/taskSlice";
import NavBar from "./NavBar";
import UnfinishedTasks from "./UnfinishedTasks";

function MainHome() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [taskStatus, setTaskStatus] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
    console.log(tasks);
  }, [dispatch]);
  return (
    <Box>
      <NavBar changeTaskStat={(stat) => setTaskStatus(stat)} />
      <UnfinishedTasks taskStatus={taskStatus} />
    </Box>
  );
}

export default MainHome;
