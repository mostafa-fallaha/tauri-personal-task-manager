import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { insertCategory } from "../../state/category/categorySlice";

interface Props {
  categoryAdded: () => void;
}

function AddCategory({ categoryAdded }: Props) {
  const [catTitle, setCatTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  return (
    <HStack marginTop={"1%"}>
      <Input
        type="text"
        value={catTitle}
        borderRadius={0}
        onChange={(e) => setCatTitle(e.target.value)}
      ></Input>
      <Button
        onClick={() => {
          dispatch(insertCategory(catTitle));
          categoryAdded();
        }}
      >
        Add
      </Button>
    </HStack>
  );
}

export default AddCategory;
