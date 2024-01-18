import Web3 from "web3";
import "./InputCustom.scss";
import { Input, Select } from "antd";
import bnb from "../../../assets/images/bnb.svg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDownIcon } from "../../../assets/Svg/SvgImages";
import SelectTokenModal from "../Modal/SelectTokenModal/SelectTokenModal";
import {
  setInputValue1,
  setInputValue2,
} from "../../../redux/InputValues/inputValues";
import {
  setTokenAselected,
  setTokenBselected,
} from "../../../redux/TokenSelected/tokenSelected";

const { Option } = Select;

const CoinInputTwo = ({ onChange, value, tokenType, tokenSwitch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tokenNameOne, settokenNameOne] = useState("");
  const [tokenNameTwo, settokenNameTwo] = useState("");

  const selectedtoken1Global = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenA
  );
  const selectedtoken2Global = useSelector(
    (state) => state?.tokenSelectedSlice?.tokenB
  );

  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    settokenNameOne(tokenNameTwo);
    settokenNameTwo(tokenNameOne);
  }, [tokenSwitch]);

  const handletoken = (value, key, type) => {
    if (type === "tk1") {
      dispatch(setTokenAselected(value));
      settokenNameOne(value.tokenName);
      setIsModalVisible(false);
    } else if (type === "tk2") {
      dispatch(setTokenBselected(value));
      settokenNameTwo(value.tokenName);
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <div className="coinInput_style">
        <div className="coinInput_input">
          <Input
            name={tokenType}
            placeholder="0.0"
            type="number"
            step=".01"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

          <p className="convText">~$0.00</p>
        </div>

        <div className="selectStyle" onClick={() => showModal(true)}>
          <img className="selectIcon" src={bnb} alt="icon" />
          {tokenType === "tk1"
            ? selectedtoken1Global.tokenName
            : selectedtoken2Global.tokenName}
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

export default CoinInputTwo;
