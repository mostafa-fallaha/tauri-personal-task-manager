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
      height={"7svh"}
      gap={1}
      textColor={"white"}
      backgroundColor={"#0a427e"}
      borderBottom={"1px solid #145caf"}
      borderTop={"1px solid #0a427e"}
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
