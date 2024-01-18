import React, { useState, useEffect } from "react";
import { Modal, Row, Select, Col, Input } from "antd";
import { toggleTheme } from "../../../theme/ThemeSlice";
import { ReactComponent as Moon } from "../../../assets/images/moon_icon.svg";
import { ReactComponent as Sun } from "../../../assets/images/sun_icon.svg";
import "./SettingPop.scss";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "../../../assets/Svg/SvgImages";

const SettingPop = (props) => {
  const { Option } = Select;
  function handleChange(value) {}

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

  return (
    <>
      <Modal
        title="Setting"
        scrollable={true}
        visible={props.isSettingVisible}
        onCancel={props.handleCancel1}
        className="connect_wallet"
        footer={null}
        centered
      >
        <Row>
          <Col className="design_pop">
            <ul>
              <li>
                <div className="options">
                  <span>Theme</span>
                  <div className="theme_change">
                    <button onClick={toggleTheme}>
                      <span className="sunIcon">
                        <SunIcon />
                      </span>
                      <span className="slash">/</span>
                      <span className="moonIcon">
                        <MoonIcon />
                      </span>
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="options">
                  <span>Network Chain</span>
                  <Select defaultValue="BNB Chain" onChange={handleChange}>
                    <Option value="BNB Chain">BNB Chain</Option>
                    <Option value="ETH Mainnet">ETH Mainnet</Option>
                    <Option value="Matic">Matic</Option>
                  </Select>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SettingPop;
