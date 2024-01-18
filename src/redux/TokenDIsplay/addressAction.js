import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const addressAction = createSlice({
  name: "TokenData",

  initialState: {
    tokenData: [],
    address: "",
  },
  reducers: {
    setTokenData: (state, action) => {
      state.tokenData = [...state.tokenData, action.payload];
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress, setTokenData } = addressAction.actions;

export default addressAction.reducer;
