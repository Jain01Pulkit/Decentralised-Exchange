import Web3 from "web3";
import "./InputCustom.scss";
import { Input } from "antd";
import bnb from "../../../assets/images/bnb.svg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDownIcon } from "../../../assets/Svg/SvgImages";
import SelectTokenModal from "../Modal/SelectTokenModal/SelectTokenModal";
import { setTokenAselected, setTokenBselected } from "../../../redux/TokenSelected/tokenSelected";
import { setInputValue1Liquidity, setInputValue2Liquidity } from "../../../redux/InputValues/inputValues";

const CoinInputLiquidity = ({
  tokenType,
  tokenSwitch,
  maximumValue,
  inputTabSelected,
  refresh,
  setcheckLiquidity,
  reset
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tokenNameOne, settokenNameOne] = useState("");
  const [tokenNameTwo, settokenNameTwo] = useState("");
  const [inputvalueOne, setInputvalueOne] = useState(0);
  const [inputvalueTwo, setInputvalueTwo] = useState(0);

  const input1 = useSelector((state) => state?.inputValuesSlice?.input1Liquidity);
  const input2 = useSelector((state) => state?.inputValuesSlice?.input2Liquidity);
  const selectedtoken1Global = useSelector((state) => state?.tokenSelectedSlice?.tokenA)
  const selectedtoken2Global = useSelector((state) => state?.tokenSelectedSlice?.tokenB)


  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    settokenNameOne(tokenNameTwo)
    settokenNameTwo(tokenNameOne)
  }, [tokenSwitch])

  useEffect(() => {
    refreshdata();
  }, [refresh])

  useEffect(() => {
    resetSwapdata();
  }, [reset])

  useEffect(() => {
    resetSwapdata();
  }, [])

  const refreshdata = async () => {
    dispatch(setTokenAselected(''));
    dispatch(setTokenBselected(''));
    dispatch(setInputValue1Liquidity(0));
    dispatch(setInputValue2Liquidity(0));
    setcheckLiquidity('')
    setInputvalueOne(0);
    setInputvalueTwo(0);

  }
  const resetSwapdata = async () => {
    dispatch(setInputValue1Liquidity(0));
    dispatch(setInputValue2Liquidity(0));
    setInputvalueOne(0);
    setInputvalueTwo(0);
  }

  useEffect(() => {
    resetSwapdata();
  }, [selectedtoken1Global, selectedtoken2Global])

  const handletoken = (value, key, type) => {
    if (type === "tk1") {
      dispatch(setTokenAselected(value));
      settokenNameOne(value.tokenName);
      setIsModalVisible(false);
    } else if (type === "tk2") {
      dispatch(setTokenBselected(value))
      settokenNameTwo(value.tokenName);
      setIsModalVisible(false);
    }
  };

  const convertInputValuesOne = async (e) => {
    inputTabSelected("Field1");
    if (maximumValue) {
      setInputvalueOne(maximumValue)
    }
    else {
      setInputvalueOne(e.target.value)
    }
    if (e.target.value == '') {
      dispatch(setInputValue1Liquidity(0))
      setInputvalueTwo(0)

    }
    else {
      let convertedAmount = await Web3.utils.toWei(e.target.value.toString(), "ether");
      dispatch(setInputValue1Liquidity(convertedAmount));
    }
  };
  const convertInputValuesTwo = async (e) => {
    inputTabSelected("Field2");
    if (maximumValue) {
      setInputvalueTwo(maximumValue)
    }
    else {
      setInputvalueTwo(e.target.value)
    }
    if (e.target.value == '') {
      dispatch(setInputValue2Liquidity(0))
      setInputvalueOne(0)

    }
    else {
      let convertedAmount = await Web3.utils.toWei(e.target.value.toString(), "ether");
      dispatch(setInputValue2Liquidity(convertedAmount));
    }

  };
  return (
    <>
      <div className="coinInput_style">
        <div className="coinInput_input">
          {tokenType === "tk1" ? (
            <Input
              placeholder={maximumValue ? Number(maximumValue).toFixed(2) : "0"}
              type="number"
              step=".01"
              value={tokenSwitch ? ((input1) / 10 ** 18).toLocaleString("fullwide", {
                useGrouping: !1,
              }) : input2 ? ((input1) / 10 ** 18).toLocaleString("fullwide", {
                useGrouping: !1,
              }) : inputvalueOne}
              // value={Number(input1).toFixed(2)}
              onChange={(e) => convertInputValuesOne(e)}
            />
          ) : (
            <Input
              placeholder={maximumValue ? Number(maximumValue).toFixed(2) : "0"}
              type="number"
              value={tokenSwitch ? ((input2) / 10 ** 18).toLocaleString("fullwide", {
                useGrouping: !1,
              }) : input1 ? ((input2) / 10 ** 18).toLocaleString("fullwide", {
                useGrouping: !1,
              }) : inputvalueTwo}
              // value={Number(input2).toFixed(2)}
              // value={Number(input2 / 10 ** 18).toFixed()}
              onChange={(e) => convertInputValuesTwo(e)}
            />
          )}
          <p className="convText">~$0.00</p>
        </div>

        <div className="selectStyle" onClick={() => showModal(true)}>
          <img className="selectIcon" src={bnb} alt="icon" />
          {tokenType === "tk1" ? selectedtoken1Global.tokenName : selectedtoken2Global.tokenName}
          {/* {tokenType === "tk1" && tokenSwitch ? tokenNameTwo : tokenType === "tk2" && tokenSwitch? tokenNameOne : tokenType === "tk1" && !tokenSwitch ? tokenNameOne :tokenNameTwo} */}

          <span className="selectDownIcon">
            <ArrowDownIcon />
          </span>
        </div>
        {tokenType === "tk1" ? (
          <SelectTokenModal
            isModalVisible={isModalVisible}
            showModal={showModal}
            handleCancel={handleCancel}
            onCancel={handleCancel}
            handletoken={handletoken}
            type={"tk1"}
            selectedToken={selectedtoken1Global}
          />
        ) : (
          <SelectTokenModal
            isModalVisible={isModalVisible}
            showModal={showModal}
            handleCancel={handleCancel}
            onCancel={handleCancel}
            handletoken={handletoken}
            type={"tk2"}
            selectedToken={selectedtoken2Global}
          />
        )}
      </div>
    </>
  );
};

export default CoinInputLiquidity;
