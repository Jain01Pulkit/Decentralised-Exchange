import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    address: "",
    status: false,
  },
  reducers: {
    tokenAction: (state, action) => {
      state.address = action.payload.address || "";
    },
    setIsLoggedIn: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { tokenAction, setIsLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
