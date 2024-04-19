import {
  Box,
  Button,
  // Checkbox,
  HStack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Task } from "../interfaces/Task";
// import getFirst4Words from "../services/GetFirst4Words";
import { AppDispatch } from "../state/store";
import { deleteTask } from "../state/task/taskSlice";
import {
  VscDebugContinue,
  VscDebugPause,
  VscDebugRestart,
  VscDebugStart,
} from "react-icons/vsc";
import AlarmModal from "./AlarmModal";
import MenuComponent from "./MenuComponent";

interface Props {
  task: Task;
}

// check point 3

function TaskBox({ task }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();

  const [isRunning, setIsRunning] = useState(false);
  const [first, setFirst] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [alarm] = useState(new Audio("a.mp3"));

  useEffect(() => {
    if (isRunning) {
      const intervalID = setInterval(() => {
        if (remainingSeconds > 0) {
          setRemainingSeconds((prev) => prev - 1);
          const hoursLeft = Math.floor(remainingSeconds / 3600);
          const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
          const secondsLeft = remainingSeconds % 60;
          setTimeLeft(
            `${hoursLeft.toString().padStart(2, "0")}:${minutesLeft
              .toString()
              .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`
          );
        } else {
          setTimeLeft("00:00:00");
          playAlarm();
          setIsRunning(false);
          setFirst(true);
          clearInterval(intervalID);
          onOpen();
        }
      }, 1000);
      return () => clearInterval(intervalID);
    }
  }, [isRunning, remainingSeconds]);

  const startCountdown = () => {
    setFirst(false);
    setIsRunning(true);
    const [hours, minutes, seconds] = task.duration.split(":").map(Number);
    setTimeLeft(task.duration);
    setRemainingSeconds(hours * 3600 + minutes * 60 + seconds);
  };

  const pauseCountdown = () => {
    setIsRunning(!isRunning);
  };

  const playAlarm = () => {
    alarm.currentTime = 0;
    alarm.loop = true;
    alarm.play();
  };

  const stopAlarm = () => {
    alarm.pause();
  };

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
      borderRadius={"10px"}
    >
      {/* <Checkbox
        icon={<IoMdDoneAll />}
        isChecked={task.task_done}
        onChange={() =>
          dispatch(
            setTaskStatus({
              id: task.id,
              taskDone: !task.task_done,
            })
          )
        }
      /> */}
      <Text width={"40%"}>{task.title}</Text>

      <Tooltip label="start">
        <Button
          isDisabled={!first}
          background={"none"}
          _hover={{ background: "none" }}
          onClick={startCountdown}
        >
          <VscDebugStart />
        </Button>
      </Tooltip>

      <Tooltip label={first ? "pause" : isRunning ? "pause" : "continue"}>
        <Button
          isDisabled={first}
          background={"none"}
          _hover={{ background: "none" }}
          onClick={pauseCountdown}
        >
          {first ? (
            <VscDebugPause />
          ) : isRunning ? (
            <VscDebugPause />
          ) : (
            <VscDebugContinue />
          )}
        </Button>
      </Tooltip>

      <Text>{first ? task.duration : timeLeft}</Text>

      <Tooltip label="restart">
        <Button
          isDisabled={first}
          background={"none"}
          _hover={{ background: "none" }}
          onClick={() => {
            setIsRunning(false);
            setFirst(true);
          }}
        >
          <VscDebugRestart />
        </Button>
      </Tooltip>

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

      <AlarmModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          stopAlarm();
        }}
      />
    </Box>
  );
}

export default TaskBox;
