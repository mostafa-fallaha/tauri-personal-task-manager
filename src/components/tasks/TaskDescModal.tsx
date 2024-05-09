import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Task from "../../interfaces/Task";
import convert_to_date from "../../services/ConvertToDate";
import { LuTimer } from "react-icons/lu";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

function TaskDescModal({ isOpen, onClose, task }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack display={"flex"} justifyContent={"space-between"}>
            <Text fontWeight={700}>{task.title}</Text>
            <Text fontSize={"0.8rem"} marginRight={"10%"}>
              {convert_to_date(task.date_added)}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{task.text}</Text>
          <HStack marginTop={"6%"}>
            <LuTimer />
            <Text fontWeight={500}>{task.duration}</Text>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskDescModal;
