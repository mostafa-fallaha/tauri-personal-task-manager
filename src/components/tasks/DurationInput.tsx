import {
  Box,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

function DurationInput() {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  return (
    <Box display={"flex"} justifyContent={"center"} gap={5} width={"100%"}>
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
  );
}

export default DurationInput;
