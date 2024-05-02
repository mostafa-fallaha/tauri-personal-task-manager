import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Task from "../../interfaces/Task";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
// import TaskBox from "./TaskBox";
import RunningTaskBox from "./RunningTaskBox";
// import ColorSwitch from "./ColorSwitch";

function NavBar() {
  const curRunTask: Task | undefined = useSelector(
    (state: RootState) =>
      state.task.tasks.filter((t) => t.id === state.task.curRunTaskId)[0]
  );
  const [isInF, setIsInF] = useState(false);
  return (
    <Box width={"100%"}>
      <Link to="/">
        <Button
          width={"50%"}
          background={"none"}
          borderRadius={0}
          borderRight={"1px"}
          fontSize={isInF ? "1.2rem" : "1.5rem"}
          onClick={() => setIsInF(false)}
        >
          Unfinished
        </Button>
      </Link>

      <Link to="/finished">
        <Button
          width={"50%"}
          background={"none"}
          borderRadius={0}
          borderLeft={"1px"}
          fontSize={isInF ? "1.5rem" : "1.2rem"}
          onClick={() => setIsInF(true)}
        >
          Finished
        </Button>
      </Link>
      <Text fontSize={"1.2rem"} marginTop={"3%"} marginLeft={"5%"}>
        Running Task
      </Text>
      <Box display={"flex"} justifyContent={"center"}>
        {curRunTask === undefined ? (
          <Text>no running task</Text>
        ) : (
          <RunningTaskBox task={curRunTask} key={curRunTask.id} />
        )}
      </Box>

      <Outlet />
      {/* <ColorSwitch /> */}
    </Box>
  );
}

export default NavBar;
