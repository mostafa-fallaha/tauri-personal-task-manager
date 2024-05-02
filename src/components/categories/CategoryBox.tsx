import { Box, Button, HStack, Text } from "@chakra-ui/react";
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
  // const colors = ["#c1121f", "#0077b6", "#ffca3a", "#7209b7", "#ff4d6d"];
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Button
        background={c === category.id ? "#B193F6" : "none"}
        borderRadius={0}
        // borderLeft={"5px solid green"}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        onClick={() => dispatch(setCurrCatId(category.id))}
      >
        <HStack display={"flex"} justifyContent={"center"}>
          {/* <FaCircle color="green" /> */}
          <MdOutlinePanoramaVerticalSelect />
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
