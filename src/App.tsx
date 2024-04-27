import { Grid, GridItem } from "@chakra-ui/react";
import Home2 from "./components/tasks/Home2";
import Home from "./components/categories/Home";

function App() {
  // const [categories, setCategories] = useState<Category[]>([]);
  // useEffect(() => {
  //   invoke<Category[]>("get_categories")
  //     .then((res) => {
  //       setCategories(res);
  //       console.log("nigggggggggggggggga");
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // const handleClick = async () => {
  //   await invoke<Category[]>("get_categories")
  //     .then((res) => {
  //       setCategories(res);
  //       console.log("nigggggggggggggggga");
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Grid
      templateAreas={{ base: `"aside main"` }}
      templateColumns={"250px 1fr"}
      height={"100svh"}
    >
      <GridItem area={"aside"} borderRight={"1px "}>
        <Home />
      </GridItem>

      <GridItem area={"main"}>
        <Home2 />
      </GridItem>
    </Grid>
  );
}

export default App;
