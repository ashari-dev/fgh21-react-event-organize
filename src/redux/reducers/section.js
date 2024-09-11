import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

const initialState = {
  data: {},
};

const section = createSlice({
  name: "section",
  initialState,
  reducers: {
    addDataSection: (state, action) => {
      state.data = action.payload;
    },
    removeDataSection: (state) => {
      state.data = {};
    },
  },
});

export const { addDataSection, removeDataSection } = section.actions;
export default section.reducer;
