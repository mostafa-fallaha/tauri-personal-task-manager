import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { getTasks } from "../state/task/taskSlice";
import { Box, Button, Tooltip, useDisclosure } from "@chakra-ui/react";
import { FaCirclePlus } from "react-icons/fa6";
import InputTaskModal from "./InputTaskModal";
import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnfinishedTasks from "./UnfinishedTasks";
import FinishedTasks from "./FinishedTasks";

function Home2() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      {/* <NavBar /> */}
      <InputTaskModal isOpen={isOpen} onClose={onClose} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route
              index
              element={
                <FinishedTasks
                  tasks={tasks.filter((t) => t.task_done === false)}
                />
              }
            />
            <Route
              path="finished"
              element={
                <UnfinishedTasks
                  tasks={tasks.filter((t) => t.task_done === true)}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Tasks /> */}

      <Tooltip label="Add a new Task">
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
      </Tooltip>
    </Box>
  );
}

export default Home2;
