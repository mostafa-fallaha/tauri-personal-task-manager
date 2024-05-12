import {
  Box,
  Button,
  HStack,
  Text,
  useColorMode,
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
  const { colorMode } = useColorMode();
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box marginLeft={"1%"} marginRight={"1%"} marginTop={"0%"}>
      <Box width={"100%"} display={"flex"} gap={2} height={"20svh"}>
        {/* =============== Running Task =========================================== */}

        <Box
          width={"50%"}
          background={colorMode === "dark" ? "#282828" : "#bfbfbf"}
          boxShadow={
            colorMode === "light"
              ? "inset 20px 20px 60px #d6d6d6, inset -20px -20px 60px #787878"
              : "inset 20px 20px 60px #4b4b4b, inset -20px -20px 60px #050505"
          }
          borderRadius={"4px"}
          // textColor={"white"}
        >
          <Text
            fontSize={"1.2rem"}
            fontWeight={800}
            alignSelf={"center"}
            textAlign={"center"}
            // textColor={"#ffffff"}
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
          background={colorMode === "dark" ? "#282828" : "#bfbfbf"}
          boxShadow={
            colorMode === "light"
              ? "inset 20px 20px 60px #d6d6d6, inset -20px -20px 60px #787878"
              : "inset 20px 20px 60px #4b4b4b, inset -20px -20px 60px #050505"
          }
          borderRadius={"4px"}
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
              <BsHourglassSplit color="#0088FE" size={"10%"} />
            )}

            <Text
              textColor={finishedTasks ? "#35a067" : "#0088FE"}
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
            background={colorMode === "dark" ? "#bfbfbf" : "#bfbfbf"}
            boxShadow={
              colorMode === "light"
                ? "inset 20px 20px 60px #d6d6d6, inset -20px -20px 60px #000000"
                : "inset 20px 20px 40px #4b4b4b, inset -20px -20px 40px #000000"
            }
            _hover={{
              background: "#bfbfbf",
              boxShadow:
                colorMode === "light"
                  ? "inset 20px 20px 60px #4b4b4b, inset -20px -20px 60px #d6d6d6"
                  : "inset 20px 20px 40px #6b6b6b, inset -20px -20px 40px #000000",
            }}
            borderRadius={"50%"}
          >
            <HiSwitchHorizontal size={"100%"} />
          </Button>
        </Box>

        <Button
          onClick={() => onOpen()}
          borderRadius={"3px"}
          background={colorMode === "dark" ? "#bfbfbf" : "#bfbfbf"}
          boxShadow={
            colorMode === "light"
              ? "inset 20px 20px 60px #ff4d6d, inset -20px -20px 60px #d6d6d6"
              : "inset 20px 20px 40px #ff4d6d, inset -20px -20px 40px #000000"
          }
          _hover={{
            background: "#bfbfbf",
            boxShadow:
              colorMode === "light"
                ? "inset 20px 20px 60px #c9184a, inset -20px -20px 60px #d6d6d6"
                : "inset 20px 20px 40px #a4133c, inset -20px -20px 40px #000000",
          }}
        >
          <HStack display={"flex"} justifyContent={"center"}>
            <GoPlus />
            <Text>Add Task</Text>
          </HStack>
        </Button>
      </HStack>
    </Box>
  );
}

export default NavBar;
