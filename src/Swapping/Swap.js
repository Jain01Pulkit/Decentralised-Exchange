import Web3Instance from "../components/web/web3Instance";
import { TokenCollection } from "../assets/tokenCollections";
import { uniswapContractsInfo } from "../components/ABI/abiSwapping";
import { BigNumber } from "bignumber.js";
import { toast } from "../components/common/Toasts/Toast";

const localeStringFunction = (value) => {
  return value.toLocaleString("fullwide", {
    useGrouping: !1,
  });
};

export const SwapExactTokenForTokenHelper = async (
  waddress,
  amountIn,
  amountOutMin,
  path,
  to,
  deadLine,
  selectedGasPrice,
  slippageTolerance
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const contract = await Web3Instance(router[0].abi, router[0].address);
  const input2WithSlippage =
    amountOutMin - (amountOutMin / 100) * slippageTolerance;
  const newvalue = BigNumber(input2WithSlippage);
  if (contract) {
    try {
      let gasLimit;
      gasLimit = await contract.methods
        .swapExactTokensForTokens(amountIn, newvalue, path, to, deadLine)
        .estimateGas({ from: waddress, value: 0 });

      const result = await contract.methods
        .swapExactTokensForTokens(amountIn, newvalue, path, to, deadLine)
        .send({
          from: waddress,
          gasPrice: selectedGasPrice * 10 ** 9,
          gas: gasLimit,
        });
      return result;
    } catch (err) {
      if (err.code == 4001) {
        toast.error("User denied Transaction");
      } else if (err?.code !== 4001) {
        let newSlippage = 50;
        try {
          let gasLimit;
          const taxedValue = BigNumber(
            amountOutMin - (amountOutMin / 100) * newSlippage
          );
          gasLimit = await contract.methods
            .swapExactTokensForTokensSupportingFeeOnTransferTokens(
              amountIn,
              taxedValue,
              path,
              to,
              deadLine
            )
            .estimateGas({ from: waddress, value: 0 });
          const result = await contract.methods
            .swapExactTokensForTokensSupportingFeeOnTransferTokens(
              amountIn,
              taxedValue,
              path,
              to,
              deadLine
            )
            .send({
              from: waddress,
              gasPrice: selectedGasPrice * 10 ** 9,
              gas: gasLimit,
            });
          return result;
        } catch (err) {
          toast.error("Swap Failed");
        }
      }
    }
  }
};

export const SwapTokenForExactTokenHelper = async (
  waddress,
  amountOut,
  amountInMax,
  path,
  to,
  deadLine,
  selectedGasPrice,
  slippageTolerance
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const input1WithSlippage =
    (amountInMax / 100) * slippageTolerance + amountInMax;
  const newvalue = localeStringFunction(input1WithSlippage);
  const contract = await Web3Instance(router[0].abi, router[0].address);
  const result = await contract.methods
    .swapTokensForExactTokens(amountOut, newvalue, path, to, deadLine)
    .send({ from: waddress, gasPrice: selectedGasPrice * 10 ** 9 });
  return result;
};

export const SwapExactTokensForEthHelper = async (
  waddress,
  amountIn,
  amountOut,
  path,
  to,
  deadLine,
  selectedGasPrice,
  slippageTolerance
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const contract = await Web3Instance(router[0].abi, router[0].address);
  const input2WithSlippage = amountOut - (amountOut / 100) * slippageTolerance;
  const newvalue = localeStringFunction(input2WithSlippage);

  if (contract) {
    try {
      let gasLimit;
      gasLimit = await contract.methods
        .swapExactTokensForETH(amountIn, newvalue, path, to, deadLine)
        .estimateGas({ from: waddress, gasPrice: selectedGasPrice * 10 ** 9 });

      const result = await contract.methods
        .swapExactTokensForETH(
          amountIn,
          amountOut.toString(),
          path,
          to,
          deadLine
        )
        .send({
          from: waddress,
          gasPrice: selectedGasPrice * 10 ** 9,
          gas: gasLimit,
        });
      return result;
    } catch (err) {
      if (err.code == 4001) {
        toast.error("User denied Transaction");
      } else if (err?.code !== 4001) {
        let newSlippage = 50;
        try {
          let gasLimit;
          const taxedValue = BigNumber(
            amountOut - (amountOut / 100) * newSlippage
          );
          gasLimit = await contract.methods
            .swapExactTokensForETHSupportingFeeOnTransferTokens(
              amountIn,
              taxedValue,
              path,
              to,
              deadLine
            )
            .estimateGas({
              from: waddress,
              gasPrice: selectedGasPrice * 10 ** 9,
            });

          const result = await contract.methods
            .swapExactTokensForETHSupportingFeeOnTransferTokens(
              amountIn,
              taxedValue,
              path,
              to,
              deadLine
            )
            .send({
              from: waddress,
              gasPrice: selectedGasPrice * 10 ** 9,
              gas: gasLimit,
            });
          return result;
        } catch (err) {
          toast.error("Swap Failed");
        }
      }
    }
  }
};

export const SwapEthForExactTokenHelper = async (
  waddress,
  amountOut,
  amountIn,
  path,
  to,
  deadLine
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const contract = await Web3Instance(router[0].abi, router[0].address);
  const newvalue = localeStringFunction(amountOut);
  const result = await contract.methods
    .swapETHForExactTokens(newvalue, path, to, deadLine)
    .send({ from: waddress, value: amountIn });
  return result;
};

export const SwapTokensForExactEthHelper = async (
  waddress,
  amountOut,
  amountIn,
  path,
  to,
  deadLine,
  selectedGasPrice,
  slippageTolerance
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const contract = await Web3Instance(router[0].abi, router[0].address);
  const input1WithSlippage = amountIn + (amountIn / 100) * slippageTolerance;
  const newvalue = localeStringFunction(input1WithSlippage);
  const result = await contract.methods
    .swapTokensForExactETH(amountOut, newvalue, path, to, deadLine)
    .send({ from: waddress, gasPrice: selectedGasPrice * 10 ** 9 });
  return result;
};

export const SwapExactEthForTokenHelper = async (
  waddress,
  amountIn,
  amountOutMin,
  path,
  to,
  deadLine,
  selectedGasPrice,
  slippageTolerance
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const contract = await Web3Instance(router[0].abi, router[0].address);
  const input2WithSlippage =
    amountOutMin - (amountOutMin / 100) * slippageTolerance;
  const newvalue = localeStringFunction(input2WithSlippage);
  if (contract) {
    try {
      let gasLimit;
      gasLimit = await contract.methods
        .swapExactETHForTokens(newvalue, path, to, deadLine)
        .estimateGas({ from: waddress, value: amountIn });
      const result = await contract.methods
        .swapExactETHForTokens(newvalue, path, to, deadLine)
        .send({
          from: waddress,
          value: amountIn,
          gasPrice: selectedGasPrice * 10 ** 9,
        });
      return result;
    } catch (err) {
      if (err.code == 4001) {
        toast.error("User denied Transaction");
      } else if (err?.code !== 4001) {
        let newSlippage = 50;
        try {
          let gasLimit;
          const taxedValue = BigNumber(
            amountOutMin - (amountOutMin / 100) * newSlippage
          );
          gasLimit = await contract.methods
            .swapExactETHForTokensSupportingFeeOnTransferTokens(
              taxedValue,
              path,
              to,
              deadLine
            )
            .estimateGas({ from: waddress, value: amountIn });
          const result = await contract.methods
            .swapExactETHForTokensSupportingFeeOnTransferTokens(
              taxedValue,
              path,
              to,
              deadLine
            )
            .send({
              from: waddress,
              value: amountIn,
              gasPrice: selectedGasPrice * 10 ** 9,
            });
          return result;
        } catch (err) {
          toast.error("Swap Failed");
        }
      }
    }
  }
};

export const getTokenAddress = async (poolAddress) => {
  try {
    const pairData = uniswapContractsInfo.filter((a) => a.symbol == "PAIR");
    let tokenAbiA = JSON.parse(JSON.stringify(pairData[0].abi));
    const pairContract = await Web3Instance(tokenAbiA, poolAddress);
    if (pairContract) {
      const token0 = await pairContract.methods.token0().call();
      const token1 = await pairContract.methods.token1().call();
      if (token0 && token1) {
        return { token0, token1 };
      }
    }
  } catch (err) {
    toast.error("Fetching token address Failed");
  }
};

export const pairAllowanceHelper = async (waddress, tokenName, pairAddress) => {
  const tokenInfo = TokenCollection.filter((a) => a.symbol === tokenName);
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  let tokenAbi = JSON.parse(JSON.stringify(tokenInfo[0].abi));
  const contract = await Web3Instance(tokenAbi, pairAddress);
  const result = await contract.methods
    .allowance(waddress.toString(), router[0]?.address)
    .call();
  return result;
};

export const allowanceHelper = async (waddress, tokenName) => {
  const tokenInfo = TokenCollection.filter((a) => a.symbol === tokenName);
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  let tokenAbi = JSON.parse(JSON.stringify(tokenInfo[0].abi));
  const contract = await Web3Instance(tokenAbi, tokenInfo[0]?.address);
  const result = await contract.methods
    .allowance(waddress.toString(), router[0]?.address)
    .call();
  return result;
};

export const pairApprovalHelper = async (waddress, tokenName, pairAddress) => {
  const tokenInfo = TokenCollection.filter((a) => a.symbol === tokenName);
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  let tokenAbi = JSON.parse(JSON.stringify(tokenInfo[0].abi));

  const contract = await Web3Instance(tokenAbi, pairAddress);
  let maxApproval = "0xfffffffffffffffffffffffffffffffffffffffff";
  if (contract) {
    const result = await contract.methods
      .approve(router[0].address, maxApproval)
      .send({ from: waddress });
    return result;
  }
};

export const approvalHelper = async (waddress, tokenName) => {
  const tokenInfo = TokenCollection.filter((a) => a.symbol === tokenName);
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  let tokenAbi = JSON.parse(JSON.stringify(tokenInfo[0].abi));
  const contract = await Web3Instance(tokenAbi, tokenInfo[0].address);
  let maxApproval = "0xfffffffffffffffffffffffffffffffffffffffff";
  const result = await contract.methods
    .approve(router[0].address, maxApproval)
    .send({ from: waddress });
  return result;
};

export const getPairHelper = async (tokenAname, tokenBname) => {
  const tokenInfoA = TokenCollection.filter((a) => a.symbol === tokenAname);
  const tokenInfoB = TokenCollection.filter((a) => a.symbol === tokenBname);

  const factory = uniswapContractsInfo.filter((a) => a.symbol === "FACTORY");
  let tokenAbi = JSON.parse(JSON.stringify(factory[0].abi));

  const contract = await Web3Instance(tokenAbi, factory[0].address);
  const result = await contract.methods
    .getPair(tokenInfoA[0].address, tokenInfoB[0].address)
    .call();

  return result;
};

export const pairBalanceHelper = async (waddress, pairAddress) => {
  const pair = uniswapContractsInfo.filter((a) => a.symbol === "PAIR");
  let pairAbi = JSON.parse(JSON.stringify(pair[0].abi));
  const contract = await Web3Instance(pairAbi, pairAddress);
  const balance = await contract.methods.balanceOf(waddress).call();
  return balance;
};
export const GetAmountsOut = async (amountIn, path) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const newvalue = localeStringFunction(amountIn);
  const contract = await Web3Instance(router[0].abi, router[0].address);
  if (contract && newvalue > 0) {
    const result = await contract.methods.getAmountsOut(newvalue, path).call();
    return result;
  }
};
export const GetAmountsIn = async (amountIn, path) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const contract = await Web3Instance(router[0].abi, router[0].address);
  const newvalue = localeStringFunction(amountIn);

  if (contract && newvalue > 0) {
    const result = await contract.methods.getAmountsIn(newvalue, path).call();
    return result;
  }
};

export const getReservesHelper = async (pairAddress) => {
  const pair = uniswapContractsInfo.filter((a) => a.symbol === "PAIR");
  let pairAbi = JSON.parse(JSON.stringify(pair[0].abi));

  const contract = await Web3Instance(pairAbi, pairAddress);
  if (contract) {
    const tokenInfo = TokenCollection.filter((a) => a.symbol === "weth");
    const address = await contract.methods.token0().call();
    if (address == tokenInfo[0].address) {
      const { _reserve0, _reserve1 } = await contract.methods
        .getReserves()
        .call();
      const values = [_reserve0, _reserve1];
      return values;
    } else {
      const { _reserve1, _reserve0 } = await contract.methods
        .getReserves()
        .call();
      const values = [_reserve1, _reserve0];
      return values;
      // return result;
    }
  }
};
