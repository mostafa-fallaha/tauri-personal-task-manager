import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { insertCategory } from "../../state/category/categorySlice";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface Props {
  categoryAdded: (v: boolean) => void;
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
        borderRadius={0}
        onClick={() => {
          dispatch(insertCategory(catTitle));
          categoryAdded(false);
        }}
      >
        <FaCheck size={"100%"} />
      </Button>
      <Button borderRadius={0} onClick={() => categoryAdded(false)}>
        <FaTimes size={"100%"} />
      </Button>
    </HStack>
  );
}

export default AddCategory;
