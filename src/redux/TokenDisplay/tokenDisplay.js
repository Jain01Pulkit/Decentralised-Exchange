import { createSlice } from "@reduxjs/toolkit";

export const tokenSelectedSlice = createSlice({
    name: "tokenSelected",
    initialState: {
        tokenA: '',
        tokenB: '',
        tokenC: '',
        tokenD: '',

    },
    reducers: {
        setTokenAselected: (state, action) => {
            state.tokenA = action.payload;
        },
        setTokenBselected: (state, action) => {
            state.tokenB = action.payload;
        },
        setTokenCselected: (state, action) => {
            state.tokenC = action.payload;
        },
        setTokenDselected: (state, action) => {
            state.tokenD = action.payload;
        },
    },
});

export const { setTokenAselected, setTokenBselected, setTokenCselected, setTokenDselected } = tokenSelectedSlice.actions;
export default tokenSelectedSlice.reducer;
