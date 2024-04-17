import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TimerState {
  isRunning: boolean;
  First: boolean;
  timeLeft: string;
  remainingSeconds: number;
}

const initialState: TimerState = {
  isRunning: false,
  First: true,
  timeLeft: "",
  remainingSeconds: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setIsRunningTrue: (state) => {
      state.isRunning = true;
    },
    setIsRunningFalse: (state) => {
      state.isRunning = false;
    },
    setIsRunningOp: (state) => {
      state.isRunning = !state.isRunning;
    },
    onRestart: (state) => {
      state.isRunning = false;
      state.First = true;
    },
    setFirstTrue: (state) => {
      state.First = true;
    },
    setFirstFalse: (state) => {
      state.First = false;
    },
    setRemainingSeconds: (state, action: PayloadAction<number>) => {
      state.remainingSeconds = action.payload;
    },
    setTimeLeft: (state, action: PayloadAction<string>) => {
      state.timeLeft = action.payload;
    },
  },
});

export const {
  setFirstFalse,
  setFirstTrue,
  setIsRunningFalse,
  setIsRunningTrue,
  setIsRunningOp,
  onRestart,
  setRemainingSeconds,
  setTimeLeft,
} = timerSlice.actions;

export default timerSlice.reducer;
