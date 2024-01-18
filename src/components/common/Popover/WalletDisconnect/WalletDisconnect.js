import React, { useState } from "react";
import { Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ButtonCommon from "../../buttonCommon/ButtonCommon";
import { setIsLoggedIn } from "../../../../redux/Login/Login";
import { setWalletAddress } from "../../../../redux/Address/address";
import { CopyIcon, ExternalLinkIcon } from "../../../../assets/Svg/SvgImages";
import "./WalletDisconnect.scss";
import WalletModal from "../../../common/Modal/walletModal/WalletModal";
import { toast } from "../../Toasts/Toast";
import { connectmetamask } from "../../../web/connect";
import { EXPLORAR_LINK } from "../../../../constant";

const WalletDisconnect = () => {
  const [showLogout, setshowLogout] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginSlice.status);
  const waddress = useSelector((state) => state.addressSlice.walletAddress);
  const MetamaskClicked = () => {
    handleConnect1();
  };
  const closeLogoutModal = () => setshowLogout(false);

  const handleCancel = () => {
    setIsModalVisible2(false);
  };
  const slicedAddress = `${waddress?.slice(0, 6)}...${waddress?.slice(
    waddress.length - 4,
    waddress.length
  )}`;
  const handleConnect1 = async () => {
    try {
      await dispatch(connectmetamask());
      // const account = await provider.enable();

      dispatch(setIsLoggedIn(true));
      toast.success("Metamask Connected");
    } catch (err) {
      toast.error("Metamask could not Connect");
    }
  };

  const handleLogout = () => {
    toast.success("Metamask Disconnected");
    closeLogoutModal();
    dispatch(setIsLoggedIn(false));
    dispatch(setWalletAddress(""));
  };

  const content = (
    <div className="disconnectWallet">
      <div className="walletWrap dflx">
        <div className="walletDetail">
          {/* <img src={metamask} alt="icon" /> */}
          <div className="walletName">
            <button className="boldTxt" onClick={MetamaskClicked}>
              MetaMask
            </button>
            <span className="lightTxt">{isLoggedIn ? slicedAddress : ""}</span>
          </div>
        </div>
        <ButtonCommon title="Disconnect" onClick={handleLogout} />
      </div>
      <div className="walletExtra_Wrap dflx">
        <a href="#">
          <CopyIcon />
          Copy Address
        </a>
        <a href={`${EXPLORAR_LINK}address/${waddress}`} target="_blank">
          <ExternalLinkIcon />
          View on Bscscan
        </a>
      </div>
    </div>
  );
  return (
    <Popover placement="bottom" content={content} trigger="click">
      <ButtonCommon
        className="connect_wallet_style connected_wllet"
        title={
          <span className="walletAddress">
            {isLoggedIn ? slicedAddress : "Connect"}
            {/* <img src={metamask} /> */}
          </span>
        }
      />
    </Popover>
  );
};

export default WalletDisconnect;
