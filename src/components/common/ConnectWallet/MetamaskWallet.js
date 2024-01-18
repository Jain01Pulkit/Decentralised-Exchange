import React, { useState } from "react";
import { Modal, Row, Col, Progress } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./ConnectWallet.scss";
import Matamask from "../../../assets/images/metamask.svg";
import { ReactComponent as ProgressBar } from "../../../assets/images/progress-bar.svg";

const MetamaskWallet = (props) => {
  const [showElement, setShowElement] = useState(true);

  return (
    <>
      <Modal
        scrollable={true}
        visible={props.isSettingVisible}
        onCancel={props.handleCancel1}
        className="connect_wallet"
        footer={null}
        closable={false}
        centered
      >
        <Row>
          <Col className="design_pop pairwith_wallet">
            {showElement ? (
              <div className="nitialize">
                <ProgressBar className="progress_icon" />
                <span>Initializing ...</span>
              </div>
            ) : (
              <div className="nitialize">
                <span className="error">Error Connecting</span>
                <button className="try_btn">try again</button>
              </div>
            )}
            <div className="selected_wallet dflx">
              <div className="view_wallet">
                <h2>MetaMask</h2>
                <p>Connecting to MetaMask</p>
              </div>
              <span>
                <img src={Matamask} alt="icon" />
              </span>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default MetamaskWallet;
