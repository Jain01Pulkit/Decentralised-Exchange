// import Web3 from "web3";
import tokenA from "../ABI/tokenA.json";

import tokenB from "../ABI/tokenB.json";
import routerv2 from "../ABI/routerv2.json";
import Web3Instance from "../web/web3Instance";
import {
  TokenA_address,
  TokenB_address,
  Routerv2address,
  Owner_address,
  MAX_AMOUNT,
} from "../../constant";

let web3Object;
export const allowTokenA = async (Owner_address, Routerv2address) => {
  try {
    let result;
    web3Object = await Web3Instance();
    let TokenAContract = new web3Object.eth.Contract(tokenA, TokenA_address);

    if (TokenAContract) {
      result = await TokenAContract.methods
        .allowance(Owner_address, Routerv2address)
        .call();
    }
    return result;
  } catch (error) {
    console.log("allowance TokenA eror", error);
  }
};

export const allowTokenB = async (Owner_address, Routerv2address) => {
  try {
    let result;
    web3Object = await Web3Instance();
    let TokenBContract = new web3Object.eth.Contract(tokenB, TokenB_address);

    if (TokenBContract) {
      result = await TokenBContract.methods
        .allowance(Owner_address, Routerv2address)
        .call();
    }
    return result;
  } catch (error) {
    console.log("allowance TokenB eror", error);
  }
};

export const approTokenA = async (amount, Routerv2address) => {
  try {
    let result;
    web3Object = await Web3Instance();

    let TokenAContract = new web3Object.eth.Contract(tokenA, TokenA_address);

    const gasLimit = await TokenAContract.methods
      .approve(Routerv2address, MAX_AMOUNT)
      .estimateGas({ from: Owner_address, value: 0 });

    if (TokenAContract) {
      result = await TokenAContract.methods
        .approve(Routerv2address, MAX_AMOUNT)
        .send({ from: Owner_address, gas: gasLimit });
    }
    return result;
  } catch (error) {
    console.log("approval TokenA error", error);
  }
};

export const approTokenB = async (amount, Routerv2address) => {
  try {
    const { ethereum } = window;
    web3Object = await Web3Instance();

    let TokenBContract = new web3Object.eth.Contract(tokenB, TokenB_address);
    const gasLimit = await TokenBContract.methods
      .approve(Routerv2address, MAX_AMOUNT)
      .estimateGas({ from: Owner_address, value: 0 });

    let result = await TokenBContract.methods
      .approve(Routerv2address, MAX_AMOUNT)
      .send({ from: Owner_address, gas: gasLimit });
    return result;
  } catch (error) {
    console.log("approval TokenB error", error);
  }
};

export const AddLiquidity = async (
  TokenA_address,
  TokenB_address,
  amount1,
  amount2,
  minamount1,
  minamount2,
  Owner_address,
  deadline
) => {
  try {
    web3Object = await Web3Instance();

    let amt1 = await web3Object.utils.toWei(String(amount1), "ether");

    let amt2 = await web3Object.utils.toWei(String(amount2), "ether");

    let minamt1 = await web3Object.utils.toWei(String(minamount1), "ether");

    let minamt2 = await web3Object.utils.toWei(String(minamount2), "ether");

    let router01Contract = new web3Object.eth.Contract(
      routerv2,
      Routerv2address
    );
    
    let result = await router01Contract?.methods
      ?.addLiquidity(
        TokenA_address,
        TokenB_address,
        amt1,
        amt2,
        minamt1,
        minamt2,
        Owner_address,
        deadline
      )
      .send({ from: Owner_address });
    return result;
  } catch (error) {
    console.log("error in add remove", error);
  }
};
