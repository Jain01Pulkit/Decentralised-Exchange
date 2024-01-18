import { createSlice } from "@reduxjs/toolkit";

export const tokenSelectedSlice = createSlice({
  name: "tokenSelected",
  initialState: {
    tokenA: "",
    tokenB: "",
  },
  reducers: {
    setTokenAselected: (state, action) => {
      state.tokenA = action.payload;
    },
    setTokenBselected: (state, action) => {
      state.tokenB = action.payload;
    },
  },
});

export const { setTokenAselected, setTokenBselected } =
  tokenSelectedSlice.actions;
export default tokenSelectedSlice.reducer;
