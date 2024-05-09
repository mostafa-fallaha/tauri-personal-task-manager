import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { MdRectangle } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

function TasksDashboard() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const allTasks = tasks.length;
  const finishedTasksLength = tasks.filter((t) => t.task_done === true).length;
  const unfinshedTasksLength = tasks.filter(
    (t) => t.task_done === false
  ).length;

  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      marginTop={"2%"}
    >
      <VStack alignItems={"flex-start"}>
        <HStack>
          <MdRectangle size={30} color="orange" />
          <Text>Finished Tasks</Text>
        </HStack>
        <HStack>
          <MdRectangle size={30} color="#ededed" />
          <Text>Unfinished Tasks</Text>
        </HStack>
      </VStack>
      <Box>
        <CircularProgress
          value={(finishedTasksLength / allTasks) * 100}
          size={"100px"}
          color="orange"
        >
          <CircularProgressLabel>
            <Tooltip label={unfinshedTasksLength + " remaining"}>
              <Text fontSize={"0.8rem"}>
                {finishedTasksLength}/{allTasks}
              </Text>
            </Tooltip>
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Box>
  );
}

export default TasksDashboard;
