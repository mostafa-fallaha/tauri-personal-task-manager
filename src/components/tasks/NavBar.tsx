import {
  Box,
  Button,
  HStack,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// import { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
import Task from "../../interfaces/Task";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
// import TaskBox from "./TaskBox";
import RunningTaskBox from "./RunningTaskBox";
// import ColorSwitch from "./ColorSwitch";
import { GoPlus } from "react-icons/go";
import InputTaskModal from "./InputTaskModal";

interface Props {
  changeTaskStat: (stat: boolean) => void;
}

function NavBar({ changeTaskStat }: Props) {
  const curRunTask: Task | undefined = useSelector(
    (state: RootState) =>
      state.task.tasks.filter((t) => t.id === state.task.curRunTaskId)[0]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isInF, setIsInF] = useState(false);
  return (
    <Box width={"100%"}>
      {/* <Link to="/">
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
      </Link> */}
      <Text
        fontSize={"1.2rem"}
        // marginTop={"3%"}
        alignSelf={"center"}
        textAlign={"center"}
      >
        Running Task
      </Text>
      <Box height={"10svh"} backgroundColor={"lightgreen"}>
        {curRunTask === undefined ? (
          <Text textAlign={"center"}>no running task</Text>
        ) : (
          <RunningTaskBox task={curRunTask} key={curRunTask.id} />
        )}
      </Box>

      <HStack
        display={"flex"}
        marginTop={"3%"}
        justifyContent={"space-between"}
      >
        <Select
          // variant={"flushed"}
          backgroundColor={"#ededed"}
          borderRadius={0}
          border={0}
          width={"30%"}
          _hover={{ cursor: "pointer" }}
          onChange={(e) => {
            if (e.target.value === "Unfinished") {
              changeTaskStat(false);
            } else {
              changeTaskStat(true);
            }
          }}
        >
          <option value="Unfinished">Unfinished tasks</option>

          <option value="Finished">Finished tasks</option>
        </Select>
        <Button onClick={() => onOpen()} borderRadius={0}>
          <HStack display={"flex"} justifyContent={"center"}>
            <GoPlus />
            <Text>Add a new Task</Text>
          </HStack>
        </Button>
      </HStack>
      <InputTaskModal isOpen={isOpen} onClose={onClose} />
      {/* <Outlet /> */}
      {/* <ColorSwitch /> */}
    </Box>
  );
}

export default NavBar;
