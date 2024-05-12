import {
  Box,
  Button,
  HStack,
  Text,
  // useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { HiSwitchHorizontal } from "react-icons/hi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import InputTaskModal from "./InputTaskModal";
import RunningTaskBox from "./RunningTaskBox";
import TasksDashboard from "./TasksDashboard";

interface Props {
  changeTaskStat: (stat: boolean) => void;
}

function NavBar({ changeTaskStat }: Props) {
  const curRunTask = useSelector(
    (state: RootState) =>
      state.task.tasks.filter((t) => t.id === state.task.curRunTaskId)[0]
  );

  const curRunCat = useSelector(
    (state: RootState) =>
      state.category.categories.filter(
        (c) => c.id === state.task.curRunCategoryId
      )[0]
  );

  const [finishedTasks, setFinishedTasks] = useState(false);

  // const { toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box marginLeft={"1%"} marginRight={"1%"} marginTop={"0%"}>
      <Box width={"100%"} display={"flex"} gap={2} height={"20svh"}>
        {/* =============== Running Task =========================================== */}

        <Box
          width={"50%"}
          backgroundColor={"#145caf"}
          borderRadius={0}
          textColor={"white"}
        >
          <Text
            fontSize={"1.2rem"}
            fontWeight={800}
            alignSelf={"center"}
            textAlign={"center"}
            textColor={"#ffffff"}
          >
            {curRunTask === undefined
              ? "no running Task"
              : "[" + curRunCat.title + "]" + " : " + curRunTask.title}
          </Text>

          <Box height={"10svh"}>
            {curRunTask !== undefined && (
              <RunningTaskBox task={curRunTask} key={curRunTask.id} />
            )}
          </Box>
          <InputTaskModal isOpen={isOpen} onClose={onClose} />
        </Box>

        {/* =============== All Tasks Details =========================================== */}

        <Box
          width={"50%"}
          backgroundColor={"#145caf"}
          borderRadius={0}
          textColor={"white"}
        >
          <TasksDashboard />
        </Box>
      </Box>

      {/* =============== Tasks Functions =========================================== */}

      <HStack
        display={"flex"}
        marginTop={"3%"}
        justifyContent={"space-between"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={{ base: "40%", md: "33%", md2: "28%", lg: "20%" }}
        >
          <HStack>
            {finishedTasks ? (
              <IoCheckmarkDoneSharp color="#35a067" size={"10%"} />
            ) : (
              <BsHourglassSplit color="#c9184a" size={"10%"} />
            )}

            <Text
              textColor={finishedTasks ? "#35a067" : "#c9184a"}
              fontSize={{ base: "1rem", md: "1.1rem", md2: "1.3rem" }}
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
