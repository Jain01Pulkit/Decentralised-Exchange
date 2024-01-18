import { createSlice } from "@reduxjs/toolkit";

export const inputValuesSlice = createSlice({
  name: "inputValues",
  initialState: {
    input1: 0,
    input2: 0,
    input1Liquidity: 0,
    input2Liquidity: 0,
  },
  reducers: {
    setInputValue1: (state, action) => {
      state.input1 = action.payload;
    },
    setInputValue2: (state, action) => {
        state.input2 = action.payload;
      },
    setInputValue1Liquidity: (state, action) => {
        state.input1Liquidity = action.payload;
      },
    setInputValue2Liquidity: (state, action) => {
          state.input2Liquidity = action.payload;
        },
  },
});
export const { setInputValue1,setInputValue2,setInputValue1Liquidity,setInputValue2Liquidity } =
inputValuesSlice.actions;

export default inputValuesSlice.reducer;
