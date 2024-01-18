import React, { useState, useEffect } from "react";
import { Tabs, Modal, Input } from "antd";

const { TabPane } = Tabs;

const WalletModal = (props) => {
  return (
    <Modal
      title="Select Token"
      scrollable={true}
      open={props.isModalVisible}
      onCancel={props.handleCancel}
      className="connect_wallet selectToken_Modal"
      footer={null}
      centered
    >
      <div className="searchField">
        <Input placeholder="Search name or paste address" />
      </div>
    </Modal>
  );
};

export default WalletModal;
