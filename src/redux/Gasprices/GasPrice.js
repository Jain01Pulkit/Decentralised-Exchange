import { createSlice } from "@reduxjs/toolkit";

export const gasPrice = createSlice({
    name: "gasPrice",
    initialState: {
        lowPrice:0,
        mediumPrice: 0,
        highPrice:0,
        userSelectedPrice: 0,
    },
    reducers: {
        setLowPrice: (state, action) => {
            state.lowPrice = action.payload;
        },
        setMediumPrice: (state, action) => {
            state.mediumPrice = action.payload;
        },
        setHighPrice: (state, action) => {
            state.highPrice = action.payload;
        },
        setuserSelectedPrice: (state, action) => {
            state.userSelectedPrice = action.payload;
        },
    },
});

export const { setLowPrice,setMediumPrice,setHighPrice,setuserSelectedPrice} = gasPrice.actions;

export default gasPrice.reducer;
