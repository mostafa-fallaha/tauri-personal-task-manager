import { Grid, GridItem } from "@chakra-ui/react";
import MainHome from "./components/tasks/MainHome";
import AsideHome from "./components/categories/AsideHome";

function App() {
  return (
    <Grid
      templateAreas={{ base: `"aside main"` }}
      templateColumns={"250px 1fr"}
      height={"100svh"}
    >
      <GridItem area={"aside"} borderRight={"1px "}>
        <AsideHome />
      </GridItem>

      <GridItem area={"main"}>
        <MainHome />
      </GridItem>
    </Grid>
  );
}

export default App;
