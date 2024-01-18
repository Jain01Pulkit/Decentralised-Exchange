import Web3 from "web3";
import "./SwapCard.scss";
import React, { useState, useEffect } from "react";
import SwapSetting from "../SwapModal/SwapSetting";
import { useDispatch, useSelector } from "react-redux";
import ConfirmSwapModal from "../SwapModal/ConfirmSwapModal";
import Web3Instance from "../../../../../components/web/web3Instance";
import { toast } from "../../../../../components/common/Toasts/Toast";
import ButtonCommon from "../../../../../components/common/buttonCommon/ButtonCommon";
import {
  PlusIcon,
  RefreshIcon,
  SettingIcon,
} from "../../../../../assets/Svg/SvgImages";
import CoinInputLiquidity from "../../../../../components/common/Inputs/coinInputLiquidity";
import {
  allowanceHelper,
  approvalHelper,
  getTokenAddress,
  pairBalanceHelper,
} from "../../../../../Swapping/Swap";
import RemoveLiqInModal from "../../../../../components/common/Modal/RemoveLiquidity/RemoveLiqInModal";
import {
  setInputValue1Liquidity,
  setInputValue2Liquidity,
} from "../../../../../redux/InputValues/inputValues";
import {
  AddLiquidity,
  AddLiquidityEth,
  RemoveLiquidity,
} from "../../../../../components/AddLiquidity/addLiquidity";
import {
  getPairHelper,
  pairApprovalHelper,
  pairAllowanceHelper,
} from "../../../../../Swapping/Swap";
import { TokenCollection } from "../../../../../assets/tokenCollections";

const SwapCard = ({ mode }) => {
  const dispatch = useDispatch();
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tokenSwitch, settokenSwitch] = useState(false);
  const [refreshstate, setRefreshState] = useState(false);
  const [inputValueOne, setinputValueOne] = useState(0);
  const [tokenBalanceA, setTokenBalanceA] = useState();
  const [swapButton, setswapButton] = useState("");
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [tokenBalanceB, setTokenBalanceB] = useState();
  const [maximumValue, setMaximumValue] = useState(0);
  const [resetState, setresetState] = useState(false);
  const [checkLiquidity, setcheckLiquidity] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const waddress = useSelector((state) => state.addressSlice.walletAddress);
  const input1 = useSelector(
    (state) => state?.inputValuesSlice?.input1Liquidity
  );
  const input2 = useSelector(
    (state) => state?.inputValuesSlice?.input2Liquidity
  );
  const selectedtoken1 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenA
  );
  const selectedtoken2 = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenB
  );

  useEffect(() => {
    if (selectedtoken1) balanceOfA();
    if (selectedtoken2) balanceOfB();
    if (selectedtoken1 && selectedtoken2) firstLiquidityCheck();
  }, [selectedtoken1, selectedtoken2, resetState]);

  useEffect(() => {
    convertInputValuesOne();
  }, [input1, input2]);

  // useEffect(() => {
  //   convertInputValuesTwo();
  // }, [input2])

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const balanceOfA = async () => {
    if (selectedtoken1.isNative) {
      let web3Object = new Web3(window.ethereum);
      let ethBalance = await web3Object.eth.getBalance(waddress);
      // let convertedAmount = await Web3.utils.fromWei(
      //   ethBalance.toString(),
      //   "ether"
      //   );
      //   console.log("ethBalance",ethBalance)
      setTokenBalanceA(ethBalance);
    } else {
      const contract = await Web3Instance(
        JSON.parse(JSON.stringify(selectedtoken1.abi)),
        selectedtoken1.address
      );
      let result = await contract.methods.balanceOf(waddress).call();
      setTokenBalanceA(result);
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
    } else {
      const contract = await Web3Instance(
        JSON.parse(JSON.stringify(selectedtoken2.abi)),
        selectedtoken2.address
      );
      let result = await contract.methods.balanceOf(waddress).call();
      setTokenBalanceB(result);
      return result;
    }
  };
  const firstLiquidityCheck = async () => {
    if (selectedtoken1 && selectedtoken2 && selectedtoken1 !== selectedtoken2) {
      const pairAddress = await getPairHelper(
        selectedtoken1.symbol,
        selectedtoken2.symbol
      );
      if (pairAddress == 0) {
        setcheckLiquidity(
          "You are the first Liquidity Provider, Choose the liquidity ratio wisely"
        );
      } else {
        setcheckLiquidity("");
      }
    }
  };
  const handleCancel1 = () => {
    setIsSettingVisible(false);
  };
  const showModal1 = (e) => {
    setIsSettingVisible(true);
  };

  const convertInputValuesOne = async () => {
    if (selectedtoken1.address && selectedtoken2.address) {
      const tokenInfo = TokenCollection.filter((a) => a.symbol === "TKNA");
      let tokenAbi = JSON.parse(JSON.stringify(tokenInfo[0].abi));
      const pairAddress = await getPairHelper(
        selectedtoken1.symbol,
        selectedtoken2.symbol
      );
      if (selectedField == "Field1") {
        if (input1 == "") {
          dispatch(setInputValue2Liquidity(0));
        } else {
          const { token0, token1 } = await getTokenAddress(pairAddress);
          const contract1 = await Web3Instance(tokenAbi, token0);
          const contract2 = await Web3Instance(tokenAbi, token1);
          const reserve1 = await contract1.methods
            .balanceOf(pairAddress)
            .call();
          const reserve2 = await contract2.methods
            .balanceOf(pairAddress)
            .call();
          if (selectedtoken1.address == token0) {
            const result = (input1 * reserve2) / reserve1;
            dispatch(setInputValue2Liquidity(result));
          } else {
            const result = (input1 * reserve1) / reserve2;
            dispatch(setInputValue2Liquidity(result));
          }
        }
      } else if (selectedField == "Field2") {
        if (input2 == "") {
          dispatch(setInputValue1Liquidity(0));
        } else {
          // const pairAddress = await getPairHelper(selectedtoken1.symbol, selectedtoken2.symbol);
          const { token0, token1 } = await getTokenAddress(pairAddress);
          const contract1 = await Web3Instance(tokenAbi, token0);
          const contract2 = await Web3Instance(tokenAbi, token1);

          const reserve1 = await contract1.methods
            .balanceOf(pairAddress)
            .call();
          const reserve2 = await contract2.methods
            .balanceOf(pairAddress)
            .call();
          if (selectedtoken2.address == token0) {
            const result = (input2 * reserve2) / reserve1;
            dispatch(setInputValue1Liquidity(result));
          } else {
            const result = (input2 * reserve1) / reserve2;
            dispatch(setInputValue1Liquidity(result));
          }
        }
      }
    }
  };

  // const convertInputValuesTwo = async () => {
  //   if (selectedtoken1.address && selectedtoken2.address) {
  //     if (input2 == '') {
  //       dispatch(setInputValue1Liquidity(0));
  //     } else {
  //       const pairAddress = await getPairHelper(selectedtoken1.symbol, selectedtoken2.symbol);
  //       console.log("pairAddresssss",pairAddress);
  //       const val = await getReservesHelper(pairAddress);
  //       console.log("valaaaaHalllaaa",val,input2);

  //       const result = (input2 * val[0]) / (val[1]);
  //       dispatch(setInputValue1Liquidity(result))
  //     }
  //   }
  // };

  const AddLiquidityWithTwoCustomTokens = async () => {
    let deadLine = Math.floor(new Date().getTime() / 1000);
    deadLine = deadLine + 10 * 60;
    try {
      let to = waddress.toString();
      setswapButton("Add Liquidity");
      const result = await AddLiquidity(
        selectedtoken1.symbol,
        selectedtoken2.symbol,
        input1,
        input2,
        1,
        1,
        to,
        deadLine
      );
      if (result?.status) {
        setresetState(!resetState);
        setswapButton("");
        toast.success("Add Liquidity Done");
      }
    } catch (err) {
      if (err?.code == 4001) {
        setswapButton("");
        toast.error("User denied Transaction");
      } else {
        setresetState(!resetState);
        setswapButton("");
        toast.error("Add Liquidity Failed");
      }
    }
  };

  const AddLiquidityWithNativeToken = async () => {
    let deadLine = Math.floor(new Date().getTime() / 1000);
    deadLine = deadLine + 10 * 60;
    try {
      if (selectedtoken1.isNative) {
        let to = waddress.toString();
        setswapButton("Add Liquidity");
        const result = await AddLiquidityEth(
          input1,
          selectedtoken2.symbol,
          input2,
          1,
          to,
          deadLine
        );
        if (result?.status) {
          setresetState(!resetState);
          setswapButton("");
          toast.success("Add Liquidity Done");
        }
      } else {
        let to = waddress.toString();
        setswapButton("Add Liquidity");
        const result = await AddLiquidityEth(
          input1,
          selectedtoken1.symbol,
          input2,
          1,
          to,
          deadLine
        );
        if (result?.status) {
          setresetState(!resetState);
          setswapButton("");
          toast.success("Add Liquidity Done");
        }
      }
    } catch (err) {
      if (err?.code == 4001) {
        setswapButton("");
        toast.error("User denied Transaction");
      } else {
        setresetState(!resetState);
        setswapButton("");
        toast.error("Add Liquidity Failed");
      }
    }
  };

  const handleAddLiquidity = async () => {
    let allowanceResultA;
    let allowanceResultB;
    if (!selectedtoken1.isNative && !selectedtoken2.isNative) {
      allowanceResultA = await allowanceHelper(waddress, selectedtoken1.symbol);
      allowanceResultB = await allowanceHelper(waddress, selectedtoken2.symbol);

      if (Number(allowanceResultA) > 0 && Number(allowanceResultB) > 0) {
        AddLiquidityWithTwoCustomTokens();
      } else if (Number(allowanceResultA) > 0 && !Number(allowanceResultB)) {
        const approval = await approvalHelper(waddress, selectedtoken2.symbol);
        if (approval.status) {
          AddLiquidityWithTwoCustomTokens();
        }
      } else if (Number(allowanceResultB) > 0 && !Number(allowanceResultA)) {
        const approval = await approvalHelper(waddress, selectedtoken1.symbol);
        if (approval.status) {
          AddLiquidityWithTwoCustomTokens();
        } else {
          toast.error("Approval Failed");
        }
      } else {
        const approval1 = await approvalHelper(waddress, selectedtoken1.symbol);
        const approval2 = await approvalHelper(waddress, selectedtoken2.symbol);
        if (approval1.status && approval2.status) {
          AddLiquidityWithTwoCustomTokens();
        } else {
          toast.error("Approval Failed");
        }
      }
    } else if (selectedtoken1.isNative && !selectedtoken2.isNative) {
      allowanceResultB = await allowanceHelper(waddress, selectedtoken2.symbol);
      if (Number(allowanceResultB > 0)) {
        AddLiquidityWithNativeToken();
      } else {
        const approval2 = await approvalHelper(waddress, selectedtoken2.symbol);
        if (approval2.status) {
          AddLiquidityWithNativeToken();
        } else {
          toast.error("Approval Failed");
        }
      }
    } else {
      allowanceResultA = await allowanceHelper(waddress, selectedtoken1.symbol);
      if (Number(allowanceResultA > 0)) {
        AddLiquidityWithNativeToken();
      } else {
        const approval1 = await approvalHelper(waddress, selectedtoken1.symbol);
        if (approval1.status) {
          AddLiquidityWithNativeToken();
        } else {
          toast.error("Approval Failed");
        }
      }
    }
  };

  const removeLiquidity = async () => {
    let deadLine = Math.floor(new Date().getTime() / 1000);
    deadLine = deadLine + 10 * 60;
    let to = waddress.toString();
    const pairAddress = await getPairHelper(
      selectedtoken1.symbol,
      selectedtoken2.symbol
    );
    const balance = await pairBalanceHelper(waddress.toString(), pairAddress);

    if (balance) {
      const result = await RemoveLiquidity(
        selectedtoken1.symbol,
        selectedtoken2.symbol,
        balance,
        1,
        1,
        to,
        deadLine
      );
      if (result?.status) {
        toast.success("Remove Liquidity Done");
      } else if (result?.code == 4001) {
        toast.error("User denied Transaction");
      } else {
        toast.error("Remove Liquidity Failed");
      }
    }
  };

  const handleRemoveLiquidity = async () => {
    const pairAddress = await getPairHelper(
      selectedtoken1.symbol,
      selectedtoken2.symbol
    );
    const balanceOfpair = await pairBalanceHelper(waddress, pairAddress);
    const allowanceResult = await pairAllowanceHelper(
      waddress,
      "PAIR",
      pairAddress
    );
    if (Number(allowanceResult) > balanceOfpair) {
      removeLiquidity();
    } else {
      const approval = await pairApprovalHelper(
        waddress,
        selectedtoken2.symbol,
        pairAddress
      );
      if (approval.status) {
        removeLiquidity();
      } else {
        toast.error("Approval Failed");
      }
    }
  };

  const MaximumFunction = () => {
    setMaximumValue(tokenBalanceA);
    setinputValueOne(tokenBalanceA / 10 ** 18);
    dispatch(setInputValue1Liquidity(tokenBalanceA));
  };

  const refresh = () => {
    setRefreshState(!refreshstate);
  };
  const inputTabSelected = (val) => {
    setSelectedField(val);
  };

  return (
    <div className="swapCard">
      <div className="swapCard_Top">
        <div className="swapTop_Left">
          <h5>Liquidity</h5>
          <p>Trade tokens in an instant</p>
        </div>
        <div className="swapTop_Right">
          <span className="refreshIcon" onClick={refresh}>
            <RefreshIcon />
          </span>
          <span className="settingIcon" onClick={(e) => showModal1(true, e)}>
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
          {checkLiquidity}
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
                  ? tokenBalanceA
                  : Number(tokenBalanceA / 10 ** 18).toFixed(3)
                : 0}
            </span>
          </div>
          <div className="brdrGradient">
            <CoinInputLiquidity
              tokenType="tk1"
              inputvalue={inputValueOne}
              setinputValue1={setinputValueOne}
              inputTabSelected={inputTabSelected}
              maximumValue={maximumValue}
              refresh={refreshstate}
              setcheckLiquidity={setcheckLiquidity}
              reset={resetState}
            />
            {/* maxamount1 ={} */}
          </div>
        </div>
        <div className="swapIcon_Div">
          {/* <span className="swapIcon"> */}
          <PlusIcon />
          {/* </span> */}
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
            <CoinInputLiquidity
              tokenType="tk2"
              inputTabSelected={inputTabSelected}
              tokenSwitch={tokenSwitch}
              setcheckLiquidity={setcheckLiquidity}
              refresh={refreshstate}
              reset={resetState}
            />
          </div>
        </div>
        <div className="address_input">
          <div className="button_css"></div>
        </div>
        {mode === "Liquidity" ? (
          <div>
            <ButtonCommon
              title={
                swapButton == "Add Liquidity"
                  ? "Adding Liquidity"
                  : "ADD liquidity"
              }
              onClick={() => handleAddLiquidity()}
              disabled={
                !input1 || !input2 || !selectedtoken1 || !selectedtoken2
              }
            />
            <ButtonCommon title="Remove Liquidity" onClick={showModal2} />
          </div>
        ) : (
          ""
        )}
        <ConfirmSwapModal
          isModalVisible={isModalVisible}
          showModal={showModal}
          handleCancel={handleCancel}
          onCancel={handleCancel}
          // showLiquidityModal={showLiquidityModal}
        />
        <RemoveLiqInModal
          isModalVisible={isModalVisible2}
          showModal={showModal2}
          handleCancel={handleCancel2}
          onCancel={handleCancel2}
          handleRemoveLiquidity={handleRemoveLiquidity}
          reset={resetState}
          setter={setresetState}
          // showLiquidityModal={showLiquidityModal}
        />
      </div>
    </div>
  );
};

export default SwapCard;
