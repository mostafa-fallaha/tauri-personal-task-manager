import { Button, HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
// import { insertCategory } from "../../state/category/categorySlice";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { updateCategory } from "../../state/category/categorySlice";

interface Props {
  editingCat: (v: boolean) => void;
  id: number;
}

function UpdateCategory({ editingCat, id }: Props) {
  const catToUpdate = useSelector(
    (state: RootState) =>
      state.category.categories.filter((c) => c.id === id)[0]
  );

  const [catTitle, setCatTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setCatTitle(catToUpdate.title);
  }, []);

  return (
    <HStack marginTop={"1%"} textColor={"#00274d"}>
      <Input
        type="text"
        value={catTitle}
        borderRadius={0}
        border={"1px solid #145caf"}
        _hover={{ border: "1px solid #145caf" }}
        onChange={(e) => setCatTitle(e.target.value)}
      />
      <Button
        borderRadius={0}
        onClick={() => {
          dispatch(updateCategory({ id: id, newTitle: catTitle }));
          editingCat(false);
        }}
      >
        <FaCheck size={"100%"} color="#145caf" />
      </Button>
      <Button borderRadius={0} onClick={() => editingCat(false)}>
        <FaTimes size={"100%"} color="#145caf" />
      </Button>
    </HStack>
  );
}

export default UpdateCategory;
