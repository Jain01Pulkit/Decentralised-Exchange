import { createSlice } from "@reduxjs/toolkit";
import cookies from "js-cookie";

const initialState = {
  themeColor:
    cookies.get("selectTheme") != null
      ? cookies.get("selectTheme")
      : "darkTheme",
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      cookies.set(
        "selectTheme",
        state.themeColor === "lightTheme" ? "darkTheme" : "lightTheme"
      );
      state.themeColor =
        state.themeColor === "lightTheme" ? "darkTheme" : "lightTheme";
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
