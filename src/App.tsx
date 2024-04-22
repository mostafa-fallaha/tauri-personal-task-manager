import { Grid, GridItem } from "@chakra-ui/react";
import Home2 from "./components/Home2";

function App() {
  return (
    <Grid
      templateAreas={{ base: `"aside main"` }}
      templateColumns={"250px 1fr"}
      height={"100svh"}
    >
      {/* <GridItem area={"aside"} borderRight={"1px "}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        blanditiis, incidunt repudiandae distinctio iste iure deleniti
        doloremque eius modi, temporibus nisi eaque, doloribus fuga nostrum
        eveniet sequi corrupti unde quibusdam.
      </GridItem> */}
      <GridItem area={"main"}>
        <Home2 />
      </GridItem>
    </Grid>
  );
}

export default App;
