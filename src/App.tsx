import { Grid, GridItem } from "@chakra-ui/react";
import MainHome from "./components/tasks/MainHome";
import AsideHome from "./components/categories/AsideHome";
import { useState } from "react";

function App() {
  const [asideSize, setAsideSize] = useState<number>(250);
  return (
    <Grid
      templateAreas={{ base: `"aside main"` }}
      templateColumns={asideSize + "px 1fr"}
      height={"100svh"}
      // backgroundColor={colorMode === "dark" ? "#ffffff" : "#ffffff"}
    >
      <GridItem area={"aside"}>
        <AsideHome setNewSize={(size) => setAsideSize(size)} />
      </GridItem>

      <GridItem area={"main"}>
        <MainHome />
      </GridItem>
    </Grid>
  );
}

export default App;
