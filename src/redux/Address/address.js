import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    walletAddress: "",
    slippageTolerance: "0.5",
  },
  reducers: {
  setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setSlippageTolerance: (state, action) => {
      state.slippageTolerance = action.payload;
    },
  },
});
export const { setWalletAddress, setSlippageTolerance } =
  addressSlice.actions;

export default addressSlice.reducer;
