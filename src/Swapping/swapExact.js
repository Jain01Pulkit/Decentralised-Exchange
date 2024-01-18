import routerv2 from "../components/ABI/routerv2.json";
import Weth from "../components/ABI/Weth.json";
import Web3Instance from "../components/web/web3Instance";
import {
  Routerv2address,
  Owner_address,
  MAX_AMOUNT,
  Wethaddress,
} from "../constant";

let web3Object;
export const allowanceHelper = async (Owner_address, Routerv2address) => {
  try {
    let result;
    web3Object = await Web3Instance();
    let TokenExactSwap = new web3Object.eth.Contract(Weth, Wethaddress);
    if (TokenExactSwap) {
      result = await TokenExactSwap.methods
        .allowance(Owner_address, Routerv2address)
        .call();
    }
    return result;
  } catch (error) {
    console.log("allowance Swap eror", error);
  }
};

export const approvalHelper = async (Routerv2address) => {
  try {
    let result;
    // let amt = await web3Object.utils.toWei(String(amount), "ether");

    web3Object = await Web3Instance();

    let TokenExactSwap = new web3Object.eth.Contract(Weth, Wethaddress);
    // console.log("Owner_address1111", Routerv2address)

    const gasLimit = await TokenExactSwap.methods
      .approve(Routerv2address, MAX_AMOUNT)
      .estimateGas({ from: Owner_address, value: 0 });
    if (TokenExactSwap) {
      result = await TokenExactSwap.methods
        .approve(Routerv2address, MAX_AMOUNT)
        .send({ from: Owner_address, gas: gasLimit });
    }
    return result;
  } catch (error) {
    console.log("approval Swap error", error);
  }
};

export const SwapExactEthForTokenHelper = async (
  Owner_address,
  amountIn,
  amountOutMin,
  path,
  to,
  deadLine
) => {
  try {
    web3Object = await Web3Instance();

    let amt1 = await web3Object.utils.toWei(String(amountIn), "ether");
    // let amt2 = await web3Object.utils.toWei(String(amount2), "ether");
    // console.log("amt2", amt2);

    // let minamt1 = await web3Object.utils.toWei(String(minamount1), "ether");
    // console.log("minamt1", minamt1);

    // let minamt2 = await web3Object.utils.toWei(String(minamount2), "ether");
    // console.log("minamt2", minamt2);

    let router01Contract = new web3Object.eth.Contract(
      routerv2,
      Routerv2address
    );

    let result = await router01Contract?.methods
      ?.swapExactETHForTokens(amountOutMin, path, to, deadLine)
      .send({ from: Owner_address, value: amt1 });
    return result;
  } catch (error) {
    console.log("error in add Swap", error);
  }
};
