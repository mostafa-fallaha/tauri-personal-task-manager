import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import Task from "../../interfaces/Task";
import { AppDispatch } from "../../state/store";
import { deleteTask } from "../../state/task/taskSlice";
import MenuComponent from "./MenuComponent";

interface Props {
  task: Task;
}

// check point 3

function TaskBox({ task }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      width={"90%"}
      height={"5svh"}
      marginTop={"1%"}
      gap={1}
      border={"1px"}
      // borderRadius={"10px"}
    >
      <Text width={"40%"}>{task.title}</Text>

      <Text>{task.duration}</Text>

      <HStack>
        <Button
          background={"none"}
          _hover={{ background: "none", color: "red" }}
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <MdDelete size={"75%"} />
        </Button>

        <MenuComponent task={task} />
      </HStack>
    </Box>
  );
}

export default TaskBox;
