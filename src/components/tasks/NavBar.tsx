import {
  Box,
  Button,
  HStack,
  Select,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Task from "../../interfaces/Task";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import RunningTaskBox from "./RunningTaskBox";
import { GoPlus } from "react-icons/go";
import InputTaskModal from "./InputTaskModal";
import TasksDashboard from "./TasksDashboard";
import { useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsHourglassSplit } from "react-icons/bs";

interface Props {
  changeTaskStat: (stat: boolean) => void;
}

function NavBar({ changeTaskStat }: Props) {
  const curRunTask: Task | undefined = useSelector(
    (state: RootState) =>
      state.task.tasks.filter((t) => t.id === state.task.curRunTaskId)[0]
  );

  const [finishedTasks, setFinishedTasks] = useState(false);

  const { toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box marginLeft={"1%"} marginRight={"1%"} marginTop={"0%"}>
      <Box width={"100%"} display={"flex"} gap={2} height={"20svh"}>
        {/* =============== Running Task =========================================== */}

        <Box
          width={"50%"}
          backgroundColor={"#00274d"}
          borderRadius={0}
          textColor={"white"}
        >
          <Text
            fontSize={"1.4rem"}
            fontWeight={800}
            alignSelf={"center"}
            textAlign={"center"}
            textColor={"#06d6a0"}
          >
            Running Task
          </Text>
          <Box height={"10svh"}>
            {curRunTask === undefined ? (
              <Text textAlign={"center"} marginTop={"2%"}>
                no running task
              </Text>
            ) : (
              <RunningTaskBox task={curRunTask} key={curRunTask.id} />
            )}
          </Box>
          <InputTaskModal isOpen={isOpen} onClose={onClose} />
        </Box>

        {/* =============== All Tasks Details =========================================== */}

        <Box
          width={"50%"}
          backgroundColor={"#00274d"}
          borderRadius={0}
          textColor={"white"}
        >
          {/* <Text
            fontSize={"1.4rem"}
            fontWeight={800}
            alignSelf={"center"}
            textAlign={"center"}
            textColor={"#e0b1cb"}
          >
            Your Progress
          </Text> */}
          <TasksDashboard />
        </Box>
      </Box>

      {/* =============== Tasks Functions =========================================== */}

      <HStack
        display={"flex"}
        marginTop={"3%"}
        justifyContent={"space-between"}
      >
        {/* <Select
          variant="filled"
          bg={"#b3daff"}
          borderRadius={0}
          width={"30%"}
          _hover={{ cursor: "pointer" }}
          // color={"white"}
          fontSize={"1rem"}
          onChange={(e) => {
            if (e.target.value === "Unfinished") {
              changeTaskStat(false);
            } else {
              changeTaskStat(true);
            }
          }}
        >
          <option
            value="Unfinished"
            // style={{ fontSize: "1rem", backgroundColor: "#0a427e" }}
          >
            Unfinished tasks
          </option>

          <option
            value="Finished"
            // style={{ fontSize: "1rem", backgroundColor: "#0a427e" }}
          >
            Finished tasks
          </option>
        </Select> */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"20%"}
        >
          <HStack>
            {finishedTasks ? (
              <IoCheckmarkDoneSharp color="#35a067" size={"10%"} />
            ) : (
              <BsHourglassSplit color="#c9184a" size={"10%"} />
            )}

            <Text
              textColor={finishedTasks ? "#35a067" : "#c9184a"}
              fontSize={"1.3rem"}
              fontWeight={700}
            >
              {finishedTasks ? "Finished Tasks" : "Unfinished Tasks"}
            </Text>
          </HStack>

          <Button
            onClick={() => {
              if (finishedTasks) changeTaskStat(false);
              else changeTaskStat(true);
              setFinishedTasks(!finishedTasks);
            }}
            backgroundColor={"#e26d5c"}
            borderRadius={"50%"}
            _hover={{ backgroundColor: "#723d46" }}
          >
            <HiSwitchHorizontal size={"100%"} />
          </Button>
        </Box>

        <Button
          onClick={() => onOpen()}
          borderRadius={0}
          backgroundColor={"#06d6a0"}
          _hover={{ backgroundColor: "#35a067" }}
        >
          <HStack display={"flex"} justifyContent={"center"}>
            <GoPlus />
            <Text>Add a new Task</Text>
          </HStack>
        </Button>
      </HStack>
      {/* <Button onClick={toggleColorMode}>ss</Button> */}
    </Box>
  );
}

export default NavBar;
