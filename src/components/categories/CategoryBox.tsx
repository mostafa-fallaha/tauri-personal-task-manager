import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
// import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../interfaces/category";
import { setCurrCatId } from "../../state/category/categorySlice";
import { RootState } from "../../state/store";
import CategoryMenu from "./CategoryMenu";
import { MdOutlinePanoramaVerticalSelect } from "react-icons/md";

interface Props {
  category: Category;
}

function CategoryBox({ category }: Props) {
  const c = useSelector((state: RootState) => state.category.currentCategoryId);
  const dispatch = useDispatch();

  const { colorMode } = useColorMode();

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Button
        background={
          c === category.id
            ? colorMode === "dark"
              ? "#383838"
              : "#d3d3d3"
            : "none"
        }
        borderRadius={0}
        // borderLeft={"5px solid green"}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        onClick={() => dispatch(setCurrCatId(category.id))}
      >
        <HStack display={"flex"} justifyContent={"center"}>
          {/* <FaCircle color="green" /> */}
          <MdOutlinePanoramaVerticalSelect color={"#0077b6"} />
          <Text>{category.title}</Text>
        </HStack>
        <Box alignSelf={"center"}>
          <CategoryMenu id={category.id} />
        </Box>
      </Button>
    </Box>
  );
}

export default CategoryBox;
