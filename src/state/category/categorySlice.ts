import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/tauri";
import Category from "../../interfaces/category";

const initialState = {
  categories: [] as Category[],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
        }
      )
      .addCase(
        insertCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories = [...state.categories, action.payload];
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.categories = state.categories.filter(
            (c) => c.id !== action.payload
          );
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
        }
      );
  },
});

export const getCategories = createAsyncThunk<Category[]>(
  "category/getCategories",
  async () => {
    const res = await invoke<Category[]>("get_categories");
    return res;
  }
);

export const insertCategory = createAsyncThunk<Category, string>(
  "category/insertCategory",
  async (title: string) => {
    const res = await invoke<Category>("insert_category", { title });
    return res;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number) => {
    const res = await invoke<number>("delete_category", { id });
    return res;
  }
);

interface updateCategoryInterface {
  id: number;
  newTitle: string;
}

export const updateCategory = createAsyncThunk<
  Category[],
  updateCategoryInterface
>(
  "category/updateCategory",
  async ({ id, newTitle }: updateCategoryInterface) => {
    const res = await invoke<Category[]>("update_category", { id, newTitle });
    return res;
  }
);

export default categorySlice.reducer;
