import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
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
              ? "#bfbfbf"
              : "#bfbfbf"
            : "none"
        }
        boxShadow={
          c === category.id
            ? colorMode === "light"
              ? "inset 20px 20px 40px #d6d6d6, inset -20px -20px 40px #000000"
              : "inset 20px 20px 40px #4b4b4b, inset -20px -20px 40px #000000"
            : "none"
        }
        _hover={{
          background: "#bfbfbf",
          boxShadow:
            colorMode === "light"
              ? "inset 20px 20px 40px #d6d6d6, inset -20px -20px 40px #000000"
              : "inset 20px 20px 40px #4b4b4b, inset -20px -20px 40px #000000",
        }}
        borderRadius={0}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        onClick={() => dispatch(setCurrCatId(category.id))}
      >
        <HStack display={"flex"} justifyContent={"center"}>
          <MdOutlinePanoramaVerticalSelect color={"#0077b6"} />
          <Text>{category.title}</Text>
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
