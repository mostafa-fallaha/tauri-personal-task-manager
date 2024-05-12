import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  // Checkbox,
  HStack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLevelDownAlt } from "react-icons/fa";
import {
  VscDebugContinue,
  VscDebugPause,
  VscDebugRestart,
  VscDebugStart,
} from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../interfaces/Task";
import { AppDispatch, RootState } from "../../state/store";
import {
  setCurrRunningCategory,
  setCurrRunningTask,
} from "../../state/task/taskSlice";
import AlarmModal from "./AlarmModal";

interface Props {
  task: Task;
}

// check point 3

function TaskBox({ task }: Props) {
  const curRunTaskId = useSelector(
    (state: RootState) => state.task.curRunTaskId
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();

  const [isRunning, setIsRunning] = useState(false);
  const [first, setFirst] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [alarm] = useState(new Audio("a.mp3"));
  const [sizePer, setSizePer] = useState<number>(0);

  useEffect(() => {
    if (isRunning) {
      const intervalID = setInterval(() => {
        if (remainingSeconds > 0) {
          getDurationPrecentage();
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
          getDurationPrecentage();
          setSizePer(0);
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

  const getDurationPrecentage = () => {
    const [hours, minutes, seconds] = task.duration.split(":").map(Number);
    const duration = hours * 3600 + minutes * 60 + seconds;
    const percentage = ((duration - remainingSeconds) / duration) * 100;
    setSizePer(percentage);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      marginTop={"2%"}
    >
      <HStack>
        <Tooltip label="start">
          <Button
            isDisabled={!first || curRunTaskId !== task.id}
            background={"none"}
            _hover={{ background: "none" }}
            onClick={() => {
              startCountdown();
            }}
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

        <Box>
          <CircularProgress
            value={sizePer}
            size={"80px"}
            color="#06d6a0"
            thickness={"8%"}
          >
            <CircularProgressLabel>
              <Text
                fontSize={{
                  base: "0.7rem",
                  md: "0.7rem",
                  lg: "0.9rem",
                }}
              >
                {first ? task.duration : timeLeft}
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
        </Box>

        <Tooltip label="restart">
          <Button
            isDisabled={first}
            background={"none"}
            width={"20%"}
            _hover={{ background: "none" }}
            onClick={() => {
              setIsRunning(false);
              setFirst(true);
              setSizePer(0);
            }}
          >
            <VscDebugRestart />
          </Button>
        </Tooltip>
        <AlarmModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            stopAlarm();
          }}
        />
      </HStack>
      <Box>
        <Tooltip label="Remove from running task">
          <Button
            background={"none"}
            width={"10%"}
            _hover={{ background: "none" }}
            onClick={() => {
              dispatch(setCurrRunningTask(0));
              dispatch(setCurrRunningCategory(0));
            }}
          >
            <FaLevelDownAlt />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default TaskBox;
