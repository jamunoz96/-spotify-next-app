import { createSlice } from "@reduxjs/toolkit";
import { State } from "./types";

const initialState: State = {
  query: "",
};

export const Slice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const { setQuery } = Slice.actions;

export default Slice.reducer;
