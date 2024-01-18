import backABI from "./abis/back.json";
import wethAbi from "./abis/weth.json";
import pair from "../components/ABI/pair.json";
import reflect from "./abis/reflectabi.json";
import {
  REACT_APP_NATIVE_TOKEN_ADDRESS,
  REACT_APP_REFLECTION_TOKEN_ADDRESS,
  REACT_APP_TOKEN_A_ADDRESS,
  REACT_APP_TOKEN_B_ADDRESS,
  REACT_APP_TOKEN_C_ADDRESS,
} from "../constant";

export const TokenCollection = [
  {
    tokenName: "WETH",
    symbol: "weth",
    address: REACT_APP_NATIVE_TOKEN_ADDRESS,
    abi: wethAbi,
    // tsub: "0.00000 BNB",
    totalBalance: 0,
    isSelected: true,
    isNative: true,
  },
  {
    tokenName: "TOKENA",
    symbol: "TKNA",
    address: REACT_APP_TOKEN_A_ADDRESS,
    abi: backABI,
    // tsub: "0.00000 BNB",
    totalBalance: 0,
    isSelected: true,
    isNative: false,
  },

  {
    tokenName: "TOKENB",
    symbol: "TKNB",
    address: REACT_APP_TOKEN_B_ADDRESS,
    abi: backABI,
    // tsub: "0.00000 BNB",
    totalBalance: 0,
    isSelected: true,
    isNative: false,
  },
  {
    tokenName: "TOKENC",
    symbol: "TKNC",
    address: REACT_APP_TOKEN_C_ADDRESS,
    abi: backABI,
    tsub: "0.00000 BNB",
    tbal: "$0.00",
    isSelected: true,
    isNative: false,
  },
  {
    tokenName: "reflection",
    symbol: "RFIT",
    address: REACT_APP_REFLECTION_TOKEN_ADDRESS,
    abi: reflect,
    tsub: "0.00000 BNB",
    tbal: "$0.00",
    isSelected: true,
    isNative: false,
  },
  //tokenA-tokenB
  // {
  //   symbol:"PAIR",
  //   address:"0x7fA355E98Baa545fcD3577D64A76197c387F2934",
  //   abi : pair
  // },
  // //weth-tokenA
  // {
  //   symbol:"PAIR2",
  //   address:"0xc529afe2cCF82930EDD66c853429C10A3AC34eAd",
  //   abi : pair
  // }
];
