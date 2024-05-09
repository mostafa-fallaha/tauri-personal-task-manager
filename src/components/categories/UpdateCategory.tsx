import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
// import { insertCategory } from "../../state/category/categorySlice";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { updateCategory } from "../../state/category/categorySlice";

interface Props {
  editingCat: (v: boolean) => void;
  id: number;
}

function UpdateCategory({ editingCat, id }: Props) {
  const [catTitle, setCatTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  return (
    <HStack marginTop={"1%"}>
      <Input
        type="text"
        value={catTitle}
        borderRadius={0}
        onChange={(e) => setCatTitle(e.target.value)}
      />
      <Button
        borderRadius={0}
        onClick={() => {
          dispatch(updateCategory({ id: id, newTitle: catTitle }));
          editingCat(false);
        }}
      >
        <FaCheck size={"100%"} />
      </Button>
      <Button borderRadius={0} onClick={() => editingCat(false)}>
        <FaTimes size={"100%"} />
      </Button>
    </HStack>
  );
}

export default UpdateCategory;
