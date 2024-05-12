import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../interfaces/Task";
import { AppDispatch, RootState } from "../../state/store";
import { deleteTask } from "../../state/task/taskSlice";
import MenuComponent from "./MenuComponent";
import { FaTasks } from "react-icons/fa";
import { LuTimer } from "react-icons/lu";

interface Props {
  task: Task;
}

// check point 3

function TaskBox({ task }: Props) {
  const curTaskRun = useSelector((state: RootState) => state.task.curRunTaskId);
  const dispatch = useDispatch<AppDispatch>();
  const { colorMode } = useColorMode();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      height={"7svh"}
      gap={1}
      // backgroundColor={"#43aa8b"}
      borderRadius={"4px"}
      marginBottom={"1%"}
      boxShadow={
        curTaskRun !== task.id
          ? colorMode === "light"
            ? "inset 20px 20px 60px #d6d6d6, inset -20px -20px 60px #000000"
            : "inset 20px 20px 60px #4b4b4b, inset -20px -20px 60px #000000"
          : colorMode === "light"
          ? "inset 20px 20px 60px #00805e, inset -20px -20px 60px #000000"
          : "inset 20px 20px 60px #00805e, inset -20px -20px 60px #000000"
      }
    >
      <HStack width={"60%"}>
        <FaTasks />
        <Text marginLeft={"1%"}>{task.title}</Text>
      </HStack>

      <HStack width={"20%"}>
        <LuTimer />
        <Text>{task.duration}</Text>
      </HStack>

      <HStack>
        <Button
          background={"none"}
          _hover={{ background: "none", color: "#d62828" }}
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <MdDelete size={"25px"} />
        </Button>

        <MenuComponent task={task} />
      </HStack>
    </Box>
  );
}

export default TaskBox;
