import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../interfaces/category";
import { setCurrCatId } from "../../state/category/categorySlice";
import { RootState } from "../../state/store";
import CategoryMenu from "./CategoryMenu";

interface Props {
  category: Category;
}

function CategoryBox({ category }: Props) {
  const c = useSelector((state: RootState) => state.category.currentCategoryId);
  const dispatch = useDispatch();
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Button
        background={c === category.id ? "#B193F6" : "none"}
        borderRadius={0}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        onClick={() => dispatch(setCurrCatId(category.id))}
      >
        <HStack display={"flex"} justifyContent={"center"}>
          <FaCircle />
          <Text>
            {category.title} - {category.id} - {c}
          </Text>
        </HStack>
        <Box alignSelf={"center"}>
          <CategoryMenu id={category.id} />
        </Box>
      </Button>
    </Box>
  );
}

export default CategoryBox;
