import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
// import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../interfaces/category";
import { setCurrCatId } from "../../state/category/categorySlice";
import { RootState } from "../../state/store";
import CategoryMenu from "./CategoryMenu";
import { MdOutlinePanoramaVerticalSelect } from "react-icons/md";
import { useState } from "react";
import UpdateCategory from "./UpdateCategory";

interface Props {
  category: Category;
}

function CategoryBox({ category }: Props) {
  const c = useSelector((state: RootState) => state.category.currentCategoryId);
  const dispatch = useDispatch();
  const [editingCat, setEditingCat] = useState(false);

  const { colorMode } = useColorMode();

  if (editingCat && c === category.id)
    return (
      <UpdateCategory id={category.id} editingCat={(v) => setEditingCat(v)} />
    );

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Button
        background={
          c === category.id
            ? colorMode === "dark"
              ? "#b3daff"
              : "#b3daff"
            : "none"
        }
        _hover={{ background: "#b3daff" }}
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
          <Text textColor={"#00274d"}>{category.title}</Text>
        </HStack>
        {category.id !== 1 && (
          <Box alignSelf={"center"}>
            <CategoryMenu
              id={category.id}
              editingCat={(v) => setEditingCat(v)}
            />
          </Box>
        )}
      </Button>
    </Box>
  );
}

export default CategoryBox;
