import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },
    removeData: (state) => {
      state.data = null;
    },
  },
});

export const { addData, removeData } = profile.actions;
export default profile.reducer;
