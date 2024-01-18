import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import ButtonCommon from "../../../../../components/common/buttonCommon/ButtonCommon";
import bnb from "../../../../../assets/images/bnb.svg";
import { ArrowIcon, ErrorIcon } from "../../../../../assets/Svg/SvgImages";

const ConfirmSwapModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showElement, setShowElement] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    setTimeout(function () {
      setShowElement(true);
    }, 3000);
  }, []);

  const hideElement = () => {
    setShowElement(false);
  };
  return (
    <Modal
      title="Confirm Swap"
      scrollable={true}
      visible={props.isModalVisible}
      onCancel={props.handleCancel}
      className="connect_wallet confirmSwap_Modal"
      footer={null}
      centered
    >
      <div className="swapSetting_Style">
        <div className="swapSetting_Top">
          <div className="swapPrice_wrap">
            <span className="swapPrice">
              <img src={bnb} alt="icon" />
              550.425
            </span>
            <span>BUSD</span>
          </div>
          <div className="text-center arrowIcon">
            <ArrowIcon />
          </div>
          <div className="swapPrice_wrap">
            <span className="swapPrice">
              <img src={bnb} alt="icon" />
              20.000
            </span>
            <span>B</span>
          </div>
        </div>
        {showElement && (
          <div className="priceUpdated">
            <span className="priceUpdated_txt">
              <ErrorIcon />
              Price Updated
            </span>
            <ButtonCommon title="Accept" onClick={hideElement} />
          </div>
        )}

        <div className="swapNote">
          Output is estimated. You will receive a minimum of{" "}
          <span>20.0000 B</span> or the transaction will revert.
        </div>
        <ButtonCommon
          className="cnfmSwap_Btn"
          title="CONFIRM SWAP"
          onClick={() => showModal(true)}
        />
      </div>
    </Modal>
  );
};

export default ConfirmSwapModal;
