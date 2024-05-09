import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { getTasks } from "../../state/task/taskSlice";
import NavBar from "./NavBar";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnfinishedTasks from "./UnfinishedTasks";
// import FinishedTasks from "./FinishedTasks";

function MainHome() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch<AppDispatch>();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskStatus, setTaskStatus] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
    console.log(tasks);
  }, [dispatch]);
  return (
    <Box>
      <Box
        position={"absolute"}
        top={"0"}
        right={"0"}
        marginTop="4"
        marginRight="8"
      ></Box>
      <NavBar changeTaskStat={(stat) => setTaskStatus(stat)} />
      <UnfinishedTasks taskStatus={taskStatus} />
      {/* <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<NavBar changeTaskStat={(stat) => setTaskStatus(stat)} />}
          >
            <Route
              index
              element={<UnfinishedTasks taskStatus={taskStatus} />}
            />
            <Route path="finished" element={<FinishedTasks />} />
          </Route>
        </Routes>
      </BrowserRouter> */}

      {/* <Tooltip label="Add a new Task">
        <Button
          fontSize={"3rem"}
          position={"absolute"}
          bottom={"0"}
          right={"0"}
          marginBottom="4"
          marginRight="4"
          background={"none"}
          _hover={{ background: "none" }}
          onClick={() => onOpen()}
        >
          <FaCirclePlus />
        </Button>
      </Tooltip> */}
    </Box>
  );
}

export default MainHome;
