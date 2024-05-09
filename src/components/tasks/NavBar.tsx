import {
  Box,
  Button,
  HStack,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Task from "../../interfaces/Task";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import RunningTaskBox from "./RunningTaskBox";
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
  return (
    <Box marginLeft={"1%"} marginRight={"1%"}>
      <Box width={"100%"} display={"flex"} gap={2}>
        {/* =============== Running Task =========================================== */}

        <Box width={"50%"} backgroundColor={"#b3b3b3"} borderRadius={"2px"}>
          <Text fontSize={"1.2rem"} alignSelf={"center"} textAlign={"center"}>
            Running Task
          </Text>
          <Box height={"10svh"}>
            {curRunTask === undefined ? (
              <Text textAlign={"center"}>no running task</Text>
            ) : (
              <RunningTaskBox task={curRunTask} key={curRunTask.id} />
            )}
          </Box>
          <InputTaskModal isOpen={isOpen} onClose={onClose} />
        </Box>

        {/* =============== All Tasks Details =========================================== */}

        <Box width={"50%"} backgroundColor={"#b3b3b3"} borderRadius={"2px"}>
          Test
        </Box>
      </Box>

      {/* =============== Tasks Functions =========================================== */}

      <HStack
        display={"flex"}
        marginTop={"3%"}
        justifyContent={"space-between"}
      >
        <Select
          backgroundColor={"#b3b3b3"}
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
        <Button
          onClick={() => onOpen()}
          borderRadius={0}
          backgroundColor={"#b3b3b3"}
        >
          <HStack display={"flex"} justifyContent={"center"}>
            <GoPlus />
            <Text>Add a new Task</Text>
          </HStack>
        </Button>
      </HStack>
    </Box>
  );
}

export default NavBar;
