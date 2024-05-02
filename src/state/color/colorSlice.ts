import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentColor: "#c1121f",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setCurrentColor: (state, action: PayloadAction<string>) => {
      state.currentColor = action.payload;
    },
  },
});

export const { setCurrentColor } = colorSlice.actions;

export default colorSlice.reducer;
