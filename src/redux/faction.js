import { createSlice } from "@reduxjs/toolkit";
export const faction = createSlice({
  name: "token",
  initialState: {
    address: "",
    balanceOf: "",
    tokenname: "",
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setBalanceOf: (state, action) => {
      state.balanceOf = action.payload;
    },
    setTokenname: (state, action) => {
      state.tokenname = action.payload;
    },
  },
});

export const { setAddress, setBalanceOf, setTokenname } = faction.actions;

export default faction.reducer;
