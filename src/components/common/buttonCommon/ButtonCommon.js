import React, { useEffect, useState } from "react";
import "./ButtonCommon.scss";
import { Button, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import RemoveLiqInModal from "../Modal/RemoveLiquidity/RemoveLiqInModal";

const ButtonCommon = (props) => {
  const [showElement, setShowElement] = useState(false);

  const dispatch = useDispatch();
  const waddress = useSelector((state) => state.addressSlice.walletAddress);

  useEffect(() => {
    setTimeout(function () {
      setShowElement(true);
    }, 3000);
  }, []);

  return (
    <>
      <button
        showModal={props.showModal}
        onClick={props.onClick}
        type={props.type}
        className={`commonBtn ${props.className}`}
        disabled={props?.disabled}
      >
        <img className="icon" src={props.icon} alt="icon" />
        {props.title}
      </button>

      <RemoveLiqInModal
        isModalVisible={props.isModalVisible}
        handleRemoveLiquidity={props.handleRemoveLiquidity}
        handleRemoveCancel={props.handleRemoveCancel}
      />
    </>
  );
};

export default ButtonCommon;
