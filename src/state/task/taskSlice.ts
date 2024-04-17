import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../interfaces/Task";
import { invoke } from "@tauri-apps/api/tauri";

const initialState = {
  tasks: [] as Task[],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })
      .addCase(insertTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })
      .addCase(
        setTaskStatus.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
        }
      );
  },
});

export const getTasks = createAsyncThunk<Task[]>("task/getTasks", async () => {
  const res = await invoke<Task[]>("get_tasks");
  return res;
});

interface InsertInterface {
  newTitle: string;
  newText: string;
  newDuration: string;
}

export const insertTask = createAsyncThunk<Task, InsertInterface>(
  "task/insertTask",
  async ({ newTitle, newText, newDuration }: InsertInterface) => {
    const res = await invoke<Task>("insert_task", {
      newTitle,
      newText,
      newDuration,
    });
    return res;
  }
);

export const deleteTask = createAsyncThunk<Task[], number>(
  "task/deleteTask",
  async (id: number) => {
    const res = await invoke<Task[]>("delete_task", { id });
    return res;
  }
);

interface TaskInfos {
  id: number;
  taskDone: boolean;
}

export const setTaskStatus = createAsyncThunk<Task[], TaskInfos>(
  "task/setTaskStatus",
  async ({ id, taskDone }: TaskInfos) => {
    const res = await invoke<Task[]>("set_task_status", { id, taskDone });
    return res;
  }
);

export default taskSlice.reducer;
