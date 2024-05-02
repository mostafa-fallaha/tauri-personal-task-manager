import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";
import categoryReducer from "./category/categorySlice";
import colorReducer from "./color/colorSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    category: categoryReducer,
    color: colorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
