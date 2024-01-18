import React, { useState } from "react";
import { Modal, Row, Col } from "antd";
import "./ConnectWallet.scss";
import Matamask from "../../../assets/images/metamask.svg";
import Trust from "../../../assets/images/trust_wallet.svg";
import Wallet from "../../../assets/images/wallet_connect.svg";
import Safepal from "../../../assets/images/Safepal.svg";
import Binance from "../../../assets/images/Binance.svg";
import "./ConnectWallet.scss";
import { Link } from "react-router-dom";
import MetamaskWallet from "./MetamaskWallet";
import CustomCheckbox from "../Checkbox/CustomCheckbox";

const ConnectWallet = (props) => {
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const handleCancel1 = () => {
    setIsSettingVisible(false);
  };
  const showModal1 = () => {
    setIsSettingVisible(true);
  };

  return (
    <>
      <Modal
        title="Connect Wallet"
        scrollable={true}
        visible={props.isModalVisible}
        onCancel={props.handleCancel}
        className="connect_wallet"
        footer={null}
        centered
      >
        <Row>
          <Col className="design_pop">
            <ul>
              <li>
                <button
                  className="connect_btn"
                  onClick={() => {
                    props.handleCancel();
                    showModal1(true);
                  }}
                >
                  <span>
                    <img src={Matamask} alt="icon" />
                  </span>
                  MetaMask
                </button>
              </li>
              <li>
                <button className="connect_btn">
                  <span>
                    <img src={Trust} alt="icon" />
                  </span>
                  TrustWallet
                </button>
              </li>
              <li>
                <button className="connect_btn">
                  <span>
                    <img src={Safepal} alt="icon" />
                  </span>
                  SafePal Wallet
                </button>
              </li>
              <li>
                <button className="connect_btn">
                  <span>
                    <img src={Binance} alt="icon" />
                  </span>
                  Binance Chain
                </button>
              </li>
              <li>
                <div className="connect_btn check_area">
                  <CustomCheckbox />
                  <p>
                    I have read, understand and agree to the
                    <Link
                      to="https://app.gitbook.com/o/-MVKPqOVpY3HiY9WFPaL/s/-MXvcS0ZV8v2RMjWwqcm/more-info/user-agreement/terms-of-service"
                      target="_blank"
                    >
                      Term of Service
                    </Link>
                  </p>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </Modal>
      <MetamaskWallet
        isSettingVisible={isSettingVisible}
        showModal1={showModal1}
        handleCancel1={handleCancel1}
        onCancel={handleCancel1}
      />
    </>
  );
};

export default ConnectWallet;
