import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  // Checkbox,
  HStack,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  VscDebugContinue,
  VscDebugPause,
  VscDebugRestart,
  VscDebugStart,
} from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../interfaces/Task";
import { AppDispatch, RootState } from "../../state/store";
import AlarmModal from "./AlarmModal";
import { FaLevelDownAlt } from "react-icons/fa";
import { setCurrTaskRunnig } from "../../state/task/taskSlice";

interface Props {
  task: Task;
}

// check point 3

function TaskBox({ task }: Props) {
  const curRunTaskId = useSelector(
    (state: RootState) => state.task.curRunTaskId
  );
  const curRunCat = useSelector(
    (state: RootState) =>
      state.category.categories.filter((c) => c.id === task.category_id)[0]
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
    <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}>
      <Box width={"50%"}>
        <HStack>
          <VStack display={"flex"} alignItems={"flex-start"}>
            <Text>{task.title}</Text>
            <Text>
              {"["}
              {curRunCat.title}
              {"]"}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Box>
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

        <CircularProgress value={sizePer} size={"100px"}>
          <CircularProgressLabel>
            <Text fontSize={"0.8rem"}>{first ? task.duration : timeLeft}</Text>
          </CircularProgressLabel>
        </CircularProgress>

        <Tooltip label="restart">
          <Button
            isDisabled={first}
            background={"none"}
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
      </Box>
      <Tooltip label="Remove from running task">
        <Button
          background={"none"}
          _hover={{ background: "none" }}
          onClick={() => dispatch(setCurrTaskRunnig(0))}
        >
          <FaLevelDownAlt />
        </Button>
      </Tooltip>
    </Box>
    /*<Box
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      // width={"90%"}
      height={"7svh"}
      marginTop={"1%"}
      backgroundColor={"lightblue"}
      // border={"1px"}
      //   borderRadius={"10px"}
    >
      <Text width={"40%"}>{task.title}</Text>

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
    </Box>*/
  );
}

export default TaskBox;
