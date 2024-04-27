import { Box, Button, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import Category from "../../interfaces/category";

interface Props {
  category: Category;
}

function CategoryBox({ category }: Props) {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Button
        background={"none"}
        borderRadius={0}
        width={"100%"}
        display={"flex"}
        justifyContent={"flex=start"}
      >
        <FaCircle />
        <Text marginLeft={"5%"}>{category.title}</Text>
      </Button>
    </Box>
  );
}

export default CategoryBox;
