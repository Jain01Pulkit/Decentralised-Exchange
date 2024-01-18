import React, { useState, useEffect } from "react";
import { Menu, Row } from "antd";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import { useDispatch } from "react-redux";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import SettingPop from "../SettingPop/SettingPop";
import BorderButton from "../BorderButton/BorderButton";
import "./HeaderStyle.scss";
import {
  CloseIcon,
  CogIcon,
  MobMenu,
  PeckShieldIcon,
} from "../../../assets/Svg/SvgImages";
import WalletDisconnect from "../Popover/WalletDisconnect/WalletDisconnect";

const Header = (props) => {
  const [day, setDay] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.remove("lightTheme");
      return document.body.classList.add("darkTheme");
    }
    document.body.classList.remove("darkTheme");
    document.body.classList.add("lightTheme");
  }, []);

  async function toggleTheme() {
    const theme = await localStorage.getItem("theme");
    if (theme === "dark") {
      setDay(false);
      document.body.classList.remove("darkTheme");
      document.body.classList.add("lightTheme");
      localStorage.removeItem("theme");
    } else {
      setDay(true);
      document.body.classList.remove("lightTheme");
      document.body.classList.add("darkTheme");
      localStorage.setItem("theme", "dark");
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const handleCancel1 = () => {
    setIsSettingVisible(false);
  };
  const showModal1 = () => {
    setIsSettingVisible(true);
  };

  const [isReferralVisible, setIsReferralVisible] = useState(false);
  const handleCancel2 = () => {
    setIsReferralVisible(false);
  };
  const showModal2 = () => {
    setIsReferralVisible(true);
  };

  // learn refferal modal

  const [isLearnRfrlVisible, setisLearnRfrlVisible] = useState(false);
  const LearnRfrlhandleCancel = () => {
    setisLearnRfrlVisible(false);
  };
  const LearnRfrlshowModal = () => {
    setisLearnRfrlVisible(true);
  };

  const [isMobile, setMobile] = useState(false);

  const toggleClass = () => {
    setMobile(!isMobile);
  };

  const [classToggle, setClassToggle] = useState(false);

  const ConnectWalletBtn = () => {
    return (
      <BorderButton
        onClick={() => showModal(true)}
        className="connect_wallet_style connected_wllet"
        title="Connect Wallet"
      />
    );
  };

  return (
    <>
      <section className="header">
        <div className={isMobile ? "mobileNav" : null}>
          <div className="container">
            <Row>
              <div className="HeaderStyle dflx">
                <div className="leftHead">
                  <div className="navlinkWrap">
                    <Menu>
                      <Menu.Item>
                        <Link
                          activeclassname="active"
                          className="link_style"
                          to="/liquidity"
                        >
                          Pools
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link className="link_style" to="/">
                          Swap
                        </Link>
                      </Menu.Item>
                    </Menu>
                  </div>
                </div>

                <div className="right_head dflx">
                  <div className="setting_pop" onClick={() => showModal1(true)}>
                    <CogIcon />
                  </div>
                  <div className="mobile_drawer" onClick={toggleClass}>
                    <button
                      className={`menu_toggle ${classToggle ? "open" : ""}`}
                      onClick={() => setClassToggle(!classToggle)}
                    >
                      {/* <div className="icon_left"></div>
                      <div className="icon_right"></div> */}
                      {classToggle ? <CloseIcon /> : <MobMenu />}
                    </button>
                  </div>

                  {/* for wallet is not connected  */}
                  {/* <ConnectWalletBtn /> */}

                  {/* for wallet is connected  */}
                  <WalletDisconnect />

                  {/* <Tooltip
                  placement="bottom"
                  title="A balance represents the total A you currently hold in your wallet and/or have staked within the A vault."
                >
                  <button className="connect_wallet_style connected_wllet">
                    hello
                  </button>
                </Tooltip> */}
                </div>
              </div>
            </Row>
            <ConnectWallet
              isModalVisible={isModalVisible}
              showModal={showModal}
              handleCancel={handleCancel}
              onCancel={handleCancel}
            />

            <SettingPop
              isSettingVisible={isSettingVisible}
              showModal1={showModal1}
              handleCancel1={handleCancel1}
              onCancel={handleCancel1}
            />
          </div>
        </div>
      </section>
      <div className="connectWallet_Btm">
        <div className="auditiedBy">
          <p>Auditied By</p>
          <PeckShieldIcon />
        </div>
        {/* for wallet is not connected  */}
        <ConnectWalletBtn />

        {/* for wallet is connected  */}
        {/* <WalletDisconnect /> */}
      </div>
    </>
  );
};

export { Header };
