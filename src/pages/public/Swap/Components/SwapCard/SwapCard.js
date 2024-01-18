import Web3 from "web3";
import "./SwapCard.scss";
import { useEffect } from "react";
import React, { useState } from "react";
import SwapSetting from "../SwapModal/SwapSetting";
import { useDispatch, useSelector } from "react-redux";
import tokenABI from "../../../../../components/ABI/tokenA.json";
import {
  GetAmountsIn,
  GetAmountsOut,
  allowanceHelper,
  approvalHelper,
  SwapEthForExactTokenHelper,
  SwapExactTokensForEthHelper,
  SwapTokenForExactTokenHelper,
  SwapTokensForExactEthHelper,
  SwapExactEthForTokenHelper,
  SwapExactTokenForTokenHelper,
  getPairHelper,
  getReservesHelper,
  getTokenAddress,
} from "../../../../../Swapping/Swap";
import ConfirmSwapModal from "../SwapModal/ConfirmSwapModal";
import Web3Instance from "../../../../../components/web/web3Instance";
import CoinInput from "../../../../../components/common/Inputs/CoinInput";
import ButtonCommon from "../../../../../components/common/buttonCommon/ButtonCommon";
import { toast } from "../../../../../components/common/Toasts/Toast";
import { setToken1Bal, setToken2Bal } from "../../../../../redux/tokenAction";

import {
  setInputValue1,
  setInputValue2,
} from "../../../../../redux/InputValues/inputValues";
import {
  setTokenAselected,
  setTokenBselected,
} from "../../../../../redux/TokenSelected/tokenSelected";
import {
  ArrowIcon,
  ArrowSolidIcon,
  PlusIcon,
  RefreshIcon,
  SettingIcon,
} from "../../../../../assets/Svg/SvgImages";

const SwapCard = ({ mode, handleToggle, setPriceImpact }) => {
  const dispatch = useDispatch();

  const [tokenBalanceA, setTokenBalanceA] = useState(0);
  const [tokenBalanceB, setTokenBalanceB] = useState(0);
  const [tokenSwitch, settokenSwitch] = useState(false);
  const [refreshstate, setRefreshState] = useState(false);
  const [maximumValue, setMaximumValue] = useState(0);
  const [resetState, setresetState] = useState(false);
  const [swapButton, setswapButton] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [beforeSwapReserves, setBeforeSwapReserves] = useState({
    reserveOne: "",
    reserveTwo: "",
  });
  const [afterSwapReserves, setAfterSwapReserves] = useState({
    reserveOne: "",
    reserveTwo: "",
  });

  const waddress = useSelector((state) => state.addressSlice.walletAddress);
  const slippageTolerance = useSelector(
    (state) => state.addressSlice.slippageTolerance
  );
  const selectedGasPrice = useSelector(
    (state) => state.gasPrice.userSelectedPrice
  );

  const input1 = useSelector((state) => state?.inputValuesSlice?.input1);
  const input2 = useSelector((state) => state?.inputValuesSlice?.input2);
  const selectedtoken1 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenA
  );
  const selectedtoken2 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenB
  );

  useEffect(() => {
    if (selectedtoken1) balanceOfA();
    if (selectedtoken2) balanceOfB();
  }, [selectedtoken1, selectedtoken2, resetState]);

  useEffect(() => {
    convertInputValuesOne();
  }, [input1, tokenSwitch]);

  useEffect(() => {
    convertInputValuesTwo();
  }, [input2]);

  const balanceOfA = async () => {
    if (selectedtoken1.isNative) {
      let web3Object = new Web3(window.ethereum);
      let ethBalance = await web3Object.eth.getBalance(waddress);
      // let convertedAmount = await Web3.utils.fromWei(
      // ethBalance.toString(),
      // "ether"
      // );
      // console.log("convertedAmount",convertedAmount);
      setTokenBalanceA(ethBalance);
      dispatch(setToken1Bal(ethBalance));
    } else {
      const contract = await Web3Instance(
        JSON.parse(JSON.stringify(selectedtoken1.abi)),
        selectedtoken1.address
      );

      let result = await contract.methods.balanceOf(waddress).call();
      setTokenBalanceA(result);
      dispatch(setToken1Bal(result));
    }
  };
  const balanceOfB = async () => {
    if (selectedtoken2.isNative) {
      let web3Object = new Web3(window.ethereum);
      let ethBalance = await web3Object.eth.getBalance(waddress);
      let convertedAmount = await Web3.utils.fromWei(
        ethBalance.toString(),
        "ether"
      );

      setTokenBalanceB(convertedAmount);
      dispatch(setToken2Bal(convertedAmount));
    } else {
      const contract = await Web3Instance(
        JSON.parse(JSON.stringify(selectedtoken2.abi)),
        selectedtoken2.address
      );
      let result = await contract.methods.balanceOf(waddress).call();
      setTokenBalanceB(result);
      dispatch(setToken2Bal(result));
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const handleCancel1 = () => {
    setIsSettingVisible(false);
  };
  const showModal1 = () => {
    setIsSettingVisible(true);
  };

  const swapWithNativeTokens = async () => {
    let deadLine = Math.floor(new Date().getTime() / 1000);
    deadLine = deadLine + 10 * 60;

    if (selectedField == "Field1") {
      try {
        let path = [selectedtoken1.address, selectedtoken2.address];
        let to = waddress.toString();
        // const input2WithSlippage = input2 - (input2 / 100) * slippageTolerance;
        setswapButton("Swapping");
        const result = await SwapExactEthForTokenHelper(
          waddress.toString(),
          input1,
          input2,
          path,
          to,
          deadLine,
          selectedGasPrice,
          slippageTolerance
        );
        if (result?.status) {
          setresetState(!resetState);
          setswapButton("");
          toast.success("Swap Done");
        }
      } catch (error) {
        if (error.code == 4001) {
          setswapButton("");
          toast.error("User denied Transaction");
        } else {
          setresetState(!resetState);
          setswapButton("");
          toast.error("Swap Failed");
        }
      }
    } else if (selectedField == "Field2") {
      try {
        let path = [selectedtoken1.address, selectedtoken2.address];
        let to = waddress.toString();
        setswapButton("Swapping");
        const result = await SwapEthForExactTokenHelper(
          waddress.toString(),
          input2,
          input1,
          path,
          to,
          deadLine,
          selectedGasPrice
        );
        if (result?.status) {
          setresetState(!resetState);
          setswapButton("");
          toast.success("Swap Done");
        }
      } catch (error) {
        if (error?.code == 4001) {
          setswapButton("");
          toast.error("User denied Transaction");
        } else {
          setresetState(!resetState);
          setswapButton("");
          toast.error("Swap Failed");
        }
      }
    }
  };

  const swapWithCustomTokens = async () => {
    let deadLine = Math.floor(new Date().getTime() / 1000);
    deadLine = deadLine + 10 * 60;
    if (selectedField == "Field1") {
      try {
        let path = [selectedtoken1.address, selectedtoken2.address];
        let to = waddress.toString();
        // const input2WithSlippage = input2 - (input2 / 100) * slippageTolerance;
        setswapButton("Swapping");
        const result = await SwapExactTokenForTokenHelper(
          waddress.toString(),
          input1,
          input2,
          path,
          to,
          deadLine,
          selectedGasPrice,
          slippageTolerance
        );
        if (result?.status) {
          setresetState(!resetState);
          setswapButton("");
          toast.success("Swap Done");
        }
      } catch (error) {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeee", error);
        if (error?.code == 4001) {
          setswapButton("");
          toast.error("User denied Transaction");
        } else {
          setresetState(!resetState);
          setswapButton("");
          toast.error("Swap Failed");
        }
      }
    } else if (selectedField == "Field2") {
      try {
        let path = [selectedtoken2.address, selectedtoken1.address];
        // const input1WithSlippage = (input1 / 100) * slippageTolerance + input1;
        let to = waddress.toString();
        setswapButton("Swapping");
        const result = await SwapTokenForExactTokenHelper(
          waddress.toString(),
          input2,
          input1,
          path,
          to,
          deadLine,
          selectedGasPrice,
          slippageTolerance
        );
        if (result?.status) {
          setresetState(!resetState);
          setswapButton("");
          toast.success("Swap Done");
        }
      } catch (err) {
        if (err?.code == 4001) {
          setswapButton("");
          toast.error("User denied Transaction");
        } else {
          setresetState(!resetState);
          setswapButton("");
          toast.error("Swap Failed");
        }
      }
    }
  };

  const swapTokensWithNativeTokens = async () => {
    let deadLine = Math.floor(new Date().getTime() / 1000);
    deadLine = deadLine + 10 * 60;
    if (selectedField == "Field1") {
      let path = [selectedtoken1.address, selectedtoken2.address];
      let to = waddress.toString();
      // const input2WithSlippage = input2 - (input2 / 100) * slippageTolerance;
      setswapButton("Swapping");
      const result = await SwapExactTokensForEthHelper(
        waddress.toString(),
        input1,
        input2,
        path,
        to,
        deadLine,
        selectedGasPrice,
        slippageTolerance
      );
      if (result?.status) {
        setresetState(!resetState);
        setswapButton("");
        toast.success("Swap Done");
      } else if (result?.code == 4001) {
        setswapButton("");
        toast.error("User denied Transaction");
      } else {
        setresetState(!resetState);
        setswapButton("");
        toast.error("Swap Failed");
      }
    } else if (selectedField == "Field2") {
      let path = [selectedtoken1.address, selectedtoken2.address];
      let to = waddress.toString();
      // const input1WithSlippage = input1 + (input1 / 100) * slippageTolerance;
      setswapButton("Swapping");
      const result = await SwapTokensForExactEthHelper(
        waddress.toString(),
        input2,
        input1,
        path,
        to,
        deadLine,
        selectedGasPrice,
        slippageTolerance
      );
      if (result?.status) {
        setresetState(!resetState);
        setswapButton("");
        toast.success("Swap Done");
      } else if (result?.code == 4001) {
        setswapButton("");
        toast.error("User denied Transaction");
      } else {
        setresetState(!resetState);
        setswapButton("");
        toast.error("Swap Failed");
      }
    }
  };

  const handleSwap = async () => {
    // showModal(true);
    let allowance;
    if (selectedtoken1.isNative) {
      if (selectedtoken1.isNative) {
        allowance = await allowanceHelper(waddress, selectedtoken2.symbol);
      }
      if (selectedtoken2.isNative) {
        allowance = await allowanceHelper(waddress, selectedtoken1.symbol);
      }
      if (Number(allowance) > 0) {
        swapWithNativeTokens();
      } else {
        let approval;
        // if (selectedtoken1.isNative) {
        //   approval = await approvalHelper(waddress, selectedtoken1.symbol);
        // }
        // if (selectedtoken2.isNative) {
        //   approval = await approvalHelper(waddress, selectedtoken1.symbol);
        // }
        if (true) {
          swapWithNativeTokens();
        } else {
          console.log(
            "error in getting approval for swap when token 1 is native"
          );
        }
      }
    } else if (selectedtoken2.isNative) {
      let allowance;
      if (selectedtoken1.isNative) {
        allowance = await allowanceHelper(waddress, selectedtoken2.symbol);
      }
      if (selectedtoken2.isNative) {
        allowance = await allowanceHelper(waddress, selectedtoken1.symbol);
      }
      if (Number(allowance) > 0) {
        swapTokensWithNativeTokens();
      } else {
        let approval;
        if (selectedtoken2.isNative) {
          approval = await approvalHelper(waddress, selectedtoken1.symbol);
        }
        if (approval.status) {
          swapTokensWithNativeTokens();
        } else {
          console.log(
            "error in getting approval for swap when token 2 is native"
          );
        }
      }
    } else {
      let allowanceResultA;
      let allowanceResultB;
      if (!selectedtoken1.isNative) {
        allowanceResultA = await allowanceHelper(
          waddress,
          selectedtoken1.symbol
        );
      }
      if (!selectedtoken2.isNative) {
        allowanceResultB = await allowanceHelper(
          waddress,
          selectedtoken2.symbol
        );
      }
      if (Number(allowanceResultA) > 0 && Number(allowanceResultB) > 0) {
        swapWithCustomTokens();
      } else if (Number(allowanceResultA) > 0 && !Number(allowanceResultB)) {
        const approval = await approvalHelper(waddress, selectedtoken2.symbol);
        if (approval.status) {
          swapWithCustomTokens();
        }
      } else if (Number(allowanceResultB) > 0 && !Number(allowanceResultA)) {
        const approval = await approvalHelper(waddress, selectedtoken1.symbol);
        if (approval.status) {
          swapWithCustomTokens();
        }
      } else {
        const approval1 = await approvalHelper(waddress, selectedtoken1.symbol);
        const approval2 = await approvalHelper(waddress, selectedtoken2.symbol);
        if (approval1.status && approval2.status) {
          swapWithCustomTokens();
        } else {
          console.log(
            "error in getting approval for swap when both tokens are custom"
          );
        }
      }
    }
  };

  const convertInputValuesOne = async () => {
    if (selectedtoken1.address && selectedtoken2.address) {
      if (input1 == "") {
        dispatch(setInputValue2(0));
      } else {
        const array = [selectedtoken1.address, selectedtoken2.address];
        if (selectedtoken1.isNative) {
          // let convertedAmount = await Web3.utils.toWei(
          // input1.toString(),
          // "ether"
          // );
          const result = await GetAmountsOut(input1, array);
          dispatch(setInputValue2(result[1]));
        } else {
          const result = await GetAmountsOut(input1, array);
          dispatch(setInputValue2(result[1]));
        }
      }
    }
  };

  const convertInputValuesTwo = async () => {
    if (selectedtoken1.address && selectedtoken2.address) {
      if (input2 === "") {
        dispatch(setInputValue1(0));
      } else {
        const array = [selectedtoken1.address, selectedtoken2.address];
        if (selectedtoken2.isNative) {
          // let convertedAmount = await Web3.utils.toWei(
          // input2.toString(),
          // "ether"
          // );
          const result = await GetAmountsIn(input2, array);
          dispatch(setInputValue1(result[0]));
        } else {
          const result = await GetAmountsIn(input2, array);

          dispatch(setInputValue1(result[0]));
        }
      }
    }
  };

  const tokenSwitching = async () => {
    // convertInputValuesTwo();
    settokenSwitch(true);
    dispatch(setTokenAselected(selectedtoken2));
    dispatch(setTokenBselected(selectedtoken1));
    dispatch(setInputValue1(input2));
  };

  const MaximumFunction = () => {
    setMaximumValue(tokenBalanceA);
    // setinputValueOne(tokenBalanceA / 10 ** 18);
    dispatch(setInputValue1(tokenBalanceA));
    // convertInputValuesOne();
  };
  const inputTabSelected = (val) => {
    setSelectedField(val);
  };

  const refresh = () => {
    setRefreshState(!refreshstate);
  };

  useEffect(() => {
    if (selectedtoken1 && selectedtoken2) getPairAddress();
  }, [selectedtoken1, selectedtoken2]);

  const getPairAddress = async () => {
    const finalResult = await getPairHelper(
      selectedtoken1?.symbol,
      selectedtoken2?.symbol
    );
    let tokens = await getTokenAddress(finalResult);

    // let token1 = await Web3Instance(tokenABI, selectedtoken1.address);
    // let token2 = await Web3Instance(tokenABI, selectedtoken2.address);

    // let reserveOne = await token1.methods.balanceOf(finalResult).call();
    // let reserveTwo = await token2.methods.balanceOf(finalResult).call();

    let tokenReserves = await getReservesHelper(finalResult);
    let token1 = await Web3Instance(tokenABI, selectedtoken1.address);
    let token2 = await Web3Instance(tokenABI, selectedtoken2.address);
    setBeforeSwapReserves({
      // reserveOne: tokenReserves[0] / 10 ** 18,
      // reserveTwo: tokenReserves[1] / 10 ** 18,
      reserveOne:
        (await token1.methods.balanceOf(finalResult).call()) / 10 ** 18,
      reserveTwo:
        (await token2.methods.balanceOf(finalResult).call()) / 10 ** 18,
    });
  };

  useEffect(() => {
    input1 &&
      input2 &&
      beforeSwapReserves.reserveOne &&
      beforeSwapReserves.reserveTwo &&
      setAfterSwapReserves({
        reserveOne: +beforeSwapReserves.reserveOne + input1 / 10 ** 18,
        reserveTwo: +beforeSwapReserves.reserveTwo - input2 / 10 ** 18,
      });
  }, [input1, input2, beforeSwapReserves]);

  const AmountsOut = async (amountIn, reservesOut, reserveIn) => {
    let amountToken2 =
      (amountIn * 997 * reservesOut) / (reserveIn * 1000 + amountIn * 997);
    // amountIn * (reserveIn / reservesOut);

    return amountToken2;
  };

  const getAmountsOnOne = async () => {
    let beforeAmountOne = await AmountsOut(
      1,
      beforeSwapReserves.reserveTwo,
      beforeSwapReserves.reserveOne
    );
    let AfterAmountOne = await AmountsOut(
      1,
      afterSwapReserves.reserveOne,
      afterSwapReserves.reserveTwo
    );
    getPriceImpact(beforeAmountOne, AfterAmountOne);
  };

  const getPriceImpact = (beforeAmountOne, AfterAmountOne) => {
    let finalAmount =
      beforeAmountOne - AfterAmountOne != 0
        ? ((beforeAmountOne - AfterAmountOne) * 100) / beforeAmountOne
        : 0;
    // let finalAmount =
    // ((beforeAmountOne - AfterAmountOne) * 100) / beforeAmountOne;
    setPriceImpact(finalAmount.toFixed(2));
  };

  useEffect(() => {
    afterSwapReserves && getAmountsOnOne();
  }, [afterSwapReserves]);

  return (
    <div className="swapCard">
      <div className="swapCard_Top">
        <div className="swapTop_Left">
          <h5>Swap</h5>
          <p>Trade tokens in an instant</p>
        </div>
        <div className="swapTop_Right">
          <span className="refreshIcon" onClick={refresh}>
            <RefreshIcon />
          </span>
          <span className="settingIcon" onClick={() => showModal1(true)}>
            <SettingIcon />
          </span>
          <SwapSetting
            isSettingVisible={isSettingVisible}
            showModal1={showModal1}
            handleCancel1={handleCancel1}
            onCancel={handleCancel1}
          />
        </div>
      </div>
      <div className="swapCard_Mid">
        <div className="swapInput">
          <div className="swapInput_label">
            <button className="maxAmnt" onClick={() => MaximumFunction()}>
              <span className="maxIcon">
                <PlusIcon />
              </span>
              Max Amount
            </button>
            <span>
              Balance:
              {selectedtoken1.address !== undefined
                ? selectedtoken1.symbol === "weth"
                  ? Number(tokenBalanceA / 10 ** 18).toFixed(3)
                  : Number(tokenBalanceA / 10 ** 18).toFixed(3)
                : 0}
            </span>
          </div>
          <div className="brdrGradient">
            <CoinInput
              tokenType="tk1"
              maximumValue={maximumValue}
              tokenSwitch={tokenSwitch}
              inputTabSelected={inputTabSelected}
              refresh={refreshstate}
              reset={resetState}
              convertInputValuesinputOne={convertInputValuesOne}
              // convertInputValuesinputTwo={convertInputValuesTwo}
            />
          </div>
        </div>
        <div className="swapIcon_Div" onClick={tokenSwitching}>
          <span className="swapIcon">
            <ArrowIcon />
          </span>
        </div>
        <div className="swapInput">
          <div className="swapInput_label">
            To (Estimated){" "}
            <span>
              Balance:
              {selectedtoken2.address !== undefined
                ? selectedtoken2.symbol === "weth"
                  ? tokenBalanceB
                  : Number(tokenBalanceB / 10 ** 18).toFixed(3)
                : 0}
            </span>
          </div>
          <div className="brdrGradient">
            <CoinInput
              tokenType="tk2"
              tokenSwitch={tokenSwitch}
              inputTabSelected={inputTabSelected}
              refresh={refreshstate}
              reset={resetState}
              // convertInputValuesOne={convertInputValuesOne}
              convertInputValuesinputTwo={convertInputValuesTwo}
            />
          </div>
        </div>
        {/* <ButtonCommon title="UNLOCK WALLET" onClick={() => showModal(true)} /> */}
        {mode === "Swap" ? (
          <ButtonCommon
            title={"SWAP"}
            disabled={swapButton == "Swapping"}
            onClick={() => handleSwap()}
          />
        ) : (
          ""
        )}
        <ConfirmSwapModal
          isModalVisible={isModalVisible}
          showModal={showModal}
          handleCancel={handleCancel}
          onCancel={handleCancel}
        />
      </div>
      <button className="priceChartBtn" onClick={handleToggle}>
        <ArrowSolidIcon /> price chart
      </button>
    </div>
  );
};

export default SwapCard;
