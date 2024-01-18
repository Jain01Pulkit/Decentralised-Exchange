import { createSlice } from "@reduxjs/toolkit";
export const tokenAction = createSlice({
    name: "address",
    initialState: {
        tokenName: "",
        token1Bal: "",
        token2Bal: "",
        tokenlist: [],
        poolList:[],
        pairAddress: "",
        remLiqPercent:"1",
        slippageTolerance: "2"


    },
    reducers: {
        setTokenName: (state, action) => {
            state.tokenName = action.payload;
          },
          setToken1Bal: (state, action) => {
            state.token1Bal = action.payload;
          },
          setToken2Bal: (state, action) => {
            state.token2Bal = action.payload;
          },
          setTokenlist: (state, action) => {
            state.tokenlist = action.payload;
          },
          setPoolList: (state, action) => {
            state.poolList = action.payload;
          },
          setPairAddress: (state, action) => {
            state.pairAddress = action.payload;
          },
          setremLiqPercent: (state, action) => {
            state.remLiqPercent = action.payload;
          },
          setslippageTolerance: (state, action) => {
            state.slippageTolerance = action.payload;
          },
          
    }, 
});

export const { setTokenName , setToken1Bal , setToken2Bal,setTokenlist,setPoolList,setPairAddress,setremLiqPercent,setslippageTolerance} = tokenAction.actions;

export default tokenAction.reducer;
