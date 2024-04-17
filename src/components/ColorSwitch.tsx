import { HStack, Switch, useColorMode } from "@chakra-ui/react";

function ColorSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      {/* <Show above="lg">
        <Text whiteSpace="nowrap">Dark Mode</Text>
      </Show> */}
    </HStack>
  );
}

export default ColorSwitch;
