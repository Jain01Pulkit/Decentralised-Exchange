import Web3Instance, { callWeb3 } from "../web/web3Instance";
import { uniswapContractsInfo } from "../ABI/abiSwapping";
import { TokenCollection } from "../../assets/tokenCollections";
const localeStringFunction = (value) => {
  return value.toLocaleString("fullwide", {
    useGrouping: !1,
  });
};
export const AddLiquidity = async (
  TokenAname,
  TokenBname,
  amount1,
  amount2,
  minamount1,
  minamount2,
  waddress,
  deadline
) => {
  const tokenA = TokenCollection.filter((a) => a.symbol === TokenAname);
  const tokenB = TokenCollection.filter((a) => a.symbol === TokenBname);

  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const RouterContract = await Web3Instance(router[0].abi, router[0].address);
  let newAmount2 = localeStringFunction(amount2);
  let newAmount1 = localeStringFunction(amount1);

  let result = await RouterContract?.methods
    ?.addLiquidity(
      tokenA[0].address,
      tokenB[0].address,
      newAmount1,
      newAmount2,
      minamount1,
      minamount2,
      waddress,
      deadline
    )
    .send({ from: waddress });
  return result;
};

export const AddLiquidityEth = async (
  inputEth,
  tokenSymbol,
  tokenAmount,
  amountETHMin,
  waddress,
  deadline
) => {
  const tokenA = TokenCollection.filter((a) => a.symbol === tokenSymbol);

  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  const RouterContract = await Web3Instance(router[0].abi, router[0].address);
  let newAmount = localeStringFunction(tokenAmount);
  let result = await RouterContract?.methods
    ?.addLiquidityETH(
      tokenA[0].address,
      newAmount,
      1,
      amountETHMin,
      waddress,
      deadline
    )
    .send({ from: waddress, value: inputEth });
  return result;
};

export const RemoveLiquidity = async (
  TokenA,
  TokenB,
  amount1,
  minamount1,
  minamount2,
  waddress,
  deadline
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
  let newAmount1 = localeStringFunction(amount1);
  const RouterContract = await Web3Instance(router[0].abi, router[0].address);
  let result = await RouterContract?.methods
    ?.removeLiquidity(
      TokenA,
      TokenB,
      newAmount1,
      minamount1,
      minamount2,
      waddress,
      deadline
    )
    .send({ from: waddress });
  return result;
};

export const RemoveLiquidityETHWithPermitService = async (
  waddress,
  signature,
  calculatedLiquidity,
  tokenAmin,
  tokenBmin,
  customTokenAddress,
  deadLine
) => {
  try {
    const { v, r, s } = signature;
    const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");
    const contract = await Web3Instance(router[0].abi, router[0].address);
    if (contract) {
      let gasLimit;
      let result;

      // If no supporting fee then removeLiquidityETHWithPermit
      gasLimit = await contract.methods
        .removeLiquidityETHWithPermit(
          customTokenAddress, // token added along with weth
          calculatedLiquidity,
          tokenAmin,
          tokenBmin,
          waddress, // to (wallet address)
          deadLine,
          false,
          v,
          r,
          s
        )
        .estimateGas({
          // from : walletAddress, value : 0
          from: waddress,
          value: 0,
        });

      result = await contract.methods
        .removeLiquidityETHWithPermit(
          customTokenAddress, // token added along with weth
          calculatedLiquidity,
          tokenAmin,
          tokenBmin,
          waddress, // to (wallet address)
          deadLine,
          false,
          v,
          r,
          s
        )
        .send({ from: waddress, gas: gasLimit });
      return result;
    }
  } catch (err) {
    return err;
  }
};

export const RemoveLiquidityWithPermitService = async (
  waddress,
  signature,
  calculatedLiquidity,
  tokenAmin,
  tokenBmin,
  tokenAaddress,
  tokenBaddress,
  deadLine
) => {
  try {
    const { v, r, s } = signature;
    const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");

    const contract = await Web3Instance(router[0].abi, router[0].address);
    if (contract) {
      let gasLimit;
      let result;

      // If no supporting fee then removeLiquidityWithPermit
      gasLimit = await contract.methods
        .removeLiquidityWithPermit(
          tokenAaddress,
          tokenBaddress,
          calculatedLiquidity,
          tokenAmin,
          tokenBmin,
          waddress, // to (wallet address)
          deadLine,
          false,
          v,
          r,
          s
        )
        .estimateGas({
          // from : walletAddress, value : 0
          from: waddress,
          value: 0,
        });

      result = await contract.methods
        .removeLiquidityWithPermit(
          tokenAaddress,
          tokenBaddress,
          calculatedLiquidity,
          tokenAmin,
          tokenBmin,
          waddress, // to (wallet address)
          deadLine,
          false,
          v,
          r,
          s
        )
        .send({ from: waddress, gas: gasLimit });
      return result;
    }
  } catch (error) {
    console.log("Error in => removeLiquidityWithPermit", error);
    return 100;
  }
};
const getPairNonces = async (pairAddress, address) => {
  try {
    const pair = uniswapContractsInfo.filter((a) => a.symbol === "PAIR");
    let pairAbi = JSON.parse(JSON.stringify(pair[0].abi));
    const contract = await Web3Instance(pairAbi, pairAddress);
    return contract.methods.nonces(address).call();
  } catch (err) {
    return err;
  }
};
const splitSignature = async (signature) => {
  const result = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0,
  };

  if (isBytesLike(signature)) {
    const bytes = arrayify(signature);
    if (bytes.length !== 65) {
      throw new Error("invalid signature string; must be 65 bytes");
    }

    // Get the r, s and v
    result.r = hexlify(bytes.slice(0, 32));
    result.s = hexlify(bytes.slice(32, 64));
    result.v = bytes[64];

    // Allow a recid to be used as the v
    if (result.v < 27) {
      if (result.v === 0 || result.v === 1) {
        result.v += 27;
      } else {
        throw new Error("signature invalid v byte");
      }
    }

    // Compute recoveryParam from v
    result.recoveryParam = 1 - (result.v % 2);

    // Compute _vs from recoveryParam and s
    if (result.recoveryParam) {
      bytes[32] |= 0x80;
    }
    result._vs = hexlify(bytes.slice(32, 64));
  } else {
    result.r = signature.r;
    result.s = signature.s;
    result.v = signature.v;
    result.recoveryParam = signature.recoveryParam;
    result._vs = signature._vs;

    // If the _vs is available, use it to populate missing s, v and recoveryParam
    // and verify non-missing s, v and recoveryParam
    if (result._vs != null) {
      const vs = zeroPad(arrayify(result._vs), 32);
      result._vs = hexlify(vs);

      // Set or check the recid
      const recoveryParam = vs[0] >= 128 ? 1 : 0;
      if (result.recoveryParam == null) {
        result.recoveryParam = recoveryParam;
      } else if (result.recoveryParam !== recoveryParam) {
        throw new Error("signature recoveryParam mismatch _vs");
      }

      // Set or check the s
      vs[0] &= 0x7f;
      const s = hexlify(vs);
      if (result.s == null) {
        result.s = s;
      } else if (result.s !== s) {
        throw new Error("signature v mismatch _vs");
      }
    }

    // Use recid and v to populate each other
    if (result.recoveryParam == null) {
      if (result.v == null) {
        throw new Error("signature missing v and recoveryParam");
      } else if (result.v === 0 || result.v === 1) {
        result.recoveryParam = result.v;
      } else {
        result.recoveryParam = 1 - (result.v % 2);
      }
    } else {
      if (result.v == null) {
        result.v = 27 + result.recoveryParam;
      } else if (result.recoveryParam !== 1 - (result.v % 2)) {
        throw new Error("signature recoveryParam mismatch v");
      }
    }

    if (result.r == null || !isHexString(result.r)) {
      throw new Error("signature missing or invalid r");
    } else {
      result.r = hexZeroPad(result.r, 32);
    }

    if (result.s == null || !isHexString(result.s)) {
      throw new Error("signature missing or invalid s");
    } else {
      result.s = hexZeroPad(result.s, 32);
    }

    const vs = arrayify(result.s);
    if (vs[0] >= 128) {
      throw new Error("signature s out of range");
    }
    if (result.recoveryParam) {
      vs[0] |= 0x80;
    }
    const _vs = hexlify(vs);

    if (result._vs) {
      if (!isHexString(result._vs)) {
        throw new Error("signature invalid _vs");
      }
      result._vs = hexZeroPad(result._vs, 32);
    }

    // Set or check the _vs
    if (result._vs == null) {
      result._vs = _vs;
    } else if (result._vs !== _vs) {
      throw new Error("signature _vs mismatch v and s");
    }
  }
  return result;
};
function isBytesLike(value) {
  return (isHexString(value) && !(value.length % 2)) || isBytes(value);
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
function isBytes(value) {
  if (value == null) {
    return false;
  }

  if (typeof value === "string") {
    return false;
  }
  if (value.length == null) {
    return false;
  }

  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (typeof v !== "number" || v < 0 || v >= 256 || v % 1) {
      return false;
    }
  }
  return true;
}
// length is optional but may be required....

function arrayify(value, options) {
  if (!options) {
    options = {};
  }

  if (typeof value === "number") {
    // throw new Error(value, "invalid arrayify value");

    const result = [];
    while (value) {
      result.unshift(value & 0xff);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }

    return addSlice(result);
  }

  if (
    options.allowMissingPrefix &&
    typeof value === "string" &&
    value.substring(0, 2) !== "0x"
  ) {
    value = "0x" + value;
  }

  if (isHexable(value)) {
    value = value.toHexString();
  }

  if (isHexString(value)) {
    let hex = value.substring(2);
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0x0" + hex.substring(2);
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        throw new Error("hex data is odd-length");
      }
    }

    const result = [];
    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16));
    }

    return addSlice(result);
  }

  if (isBytes(value)) {
    return addSlice(value);
  }

  return new Error("invalid arrayify value");
}

function isHexable(value) {
  return !!value.toHexString;
}
function addSlice(array) {
  if (array.slice) {
    return array;
  }

  array.slice = function () {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(Array.prototype.slice.apply(array, args));
  };
  return array;
}

const HexCharacters = "0123456789abcdef";

function hexlify(value, options) {
  if (!options) {
    options = {};
  }

  if (typeof value === "number") {
    // logger.checkSafeUint53(value, "invalid hexlify value");

    let hex = "";
    while (value) {
      hex = HexCharacters[value & 0xf] + hex;
      value = Math.floor(value / 16);
    }

    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }

    return "0x00";
  }

  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }

  if (
    options.allowMissingPrefix &&
    typeof value === "string" &&
    value.substring(0, 2) !== "0x"
  ) {
    value = "0x" + value;
  }

  if (isHexable(value)) {
    return value.toHexString();
  }

  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.toString().substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        throw new Error("hex data is odd-length");
      }
    }
    return value.toString().toLowerCase();
  }

  if (isBytes(value)) {
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      let v = value[i];
      result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
    }
    return result;
  }

  return new Error("invalid hexlify value");
}

function zeroPad(value, length) {
  value = arrayify(value);

  if (value.length > length) {
    throw new Error("value out of range");
  }

  const result = [length];
  result.set(value, length - value.length);
  return addSlice(result);
}

function hexZeroPad(value, length) {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    throw new Error("invalid hex string");
  }

  if (value.length > 2 * length + 2) {
    throw new Error("value out of range");
  }

  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }
  return value;
}
export const getRemoveLiquiditySignature = async (
  waddress,
  pairAddress,
  liquidity,
  deadline
) => {
  const router = uniswapContractsInfo.filter((a) => a.symbol === "ROUTER");

  try {
    const owner = waddress;
    const spender = router[0]?.address;
    const value = liquidity;
    const web3 = await callWeb3();
    // let chainId = await web3?.currentProvider?.chainId;
    let chainId = 0;

    const nonce = await getPairNonces(pairAddress, owner);
    const EIP712Domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ];
    const domain = {
      name: "Uniswap V2",
      version: "1",
      value,
      chainId,
      verifyingContract: pairAddress,
    };
    const Permit = [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ];
    const message = {
      owner,
      spender,
      value,
      nonce: web3.utils.toHex(nonce),
      deadline,
    };
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: "Permit",
      message,
    });

    const from = owner;
    const params = [from, data];
    const method = "eth_signTypedData_v4";
    const res = await web3?.currentProvider?.request({
      method,
      params,
      from,
    });

    try {
      const splits = await splitSignature(res);
      return splits;
    } catch (err) {
      console.log("split signature error", err);
      return err;
    }
  } catch (error) {
    return error;
  }
};
