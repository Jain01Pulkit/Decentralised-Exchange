import React, { useState } from "react";
import { Modal } from "antd";
import MetamaskWallet from "../ConnectWallet/MetamaskWallet";
import vector from "../../../assets/images/Vector.png";
import Bidlist from "../Bidlist/Bidlist";
import "./PurchaseHistory.scss";
import Pagination from "../Pagenation/Pagination";

const PurchaseHistory = (props, Nft) => {
  const [isPurchaseVisible, setIsPurchaseVisible] = useState(false);
  const handleCancel4 = () => {
    setIsPurchaseVisible(false);
  };
  const showModal4 = () => {
    setIsPurchaseVisible(true);
  };
  return (
    <>
      <Modal
        title="Purchase History"
        scrollable={true}
        visible={props.isPurchaseVisible}
        onCancel={props.handleCancel4}
        className="list_History"
        footer={null}
        centered
      >
        <div className="history-listing">
          <div>
            <Bidlist />
          </div>
          <div className="pages-roll">
            <Pagination />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PurchaseHistory;
