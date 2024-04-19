import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { insertTask } from "../state/task/taskSlice";
import convertDateToString from "../services/ConvertDateToString";
import { Task } from "../interfaces/Task";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

function EditTaskModal({ isOpen, onClose, task }: Props) {
  const [hours2, minutes2, seconds2] = task.duration.split(":").map(Number);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [newTaskText, setNewTaskText] = useState(task.text);
  const [hours, setHours] = useState<number>(hours2);
  const [minutes, setMinutes] = useState<number>(minutes2);
  const [seconds, setSeconds] = useState<number>(seconds2);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Your Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            {/* ============ Task Title ================================ */}

            <Text alignSelf={"flex-start"}>Task Title</Text>
            <Input
              type="text"
              width={"100%"}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />

            {/* ============ Task Text ================================ */}

            <Text alignSelf={"flex-start"}>Task Description</Text>
            <Textarea
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />

            {/* ============ Duration ================================ */}

            <Text alignSelf={"flex-start"}>Task Duration</Text>
            <Box
              display={"flex"}
              justifyContent={"center"}
              gap={5}
              width={"100%"}
            >
              <HStack>
                <Text>Hours:</Text>
                <NumberInput
                  defaultValue={hours}
                  min={0}
                  max={5}
                  onChange={(v) => setHours(parseInt(v))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>

              <HStack>
                <Text>Minutes:</Text>
                <NumberInput
                  defaultValue={minutes}
                  min={0}
                  max={59}
                  onChange={(v) => setMinutes(parseInt(v))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>

              <HStack>
                <Text>Seconds:</Text>
                <NumberInput
                  defaultValue={seconds}
                  min={0}
                  max={59}
                  onChange={(v) => setSeconds(parseInt(v))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              dispatch(
                insertTask({
                  newTitle: newTaskTitle,
                  newText: newTaskText,
                  newDuration: convertDateToString(hours, minutes, seconds),
                })
              );
              setNewTaskText("");
              setNewTaskTitle("");
              onClose();
            }}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditTaskModal;
