import React, { useState } from "react";
import { Row, Col, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { SelectDropdown, SearchBar } from "../../common";
import ButtonCommon from "../buttonCommon/ButtonCommon";
import "./EarnBar.scss";

const EarnBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComplete, setIsComplete] = useState("PENDING");
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const { Option } = SelectDropdown;
  function handleChange(value) {}
  var a = ["A Balance", "B Balance", "C Balance", "D Balance"];

  const PlatformType = () => {
    return (
      <SelectDropdown
        defaultValue="A Balance"
        onChange={handleChange}
        dropdownValue={a}
        className="lable_top"
        title="Platform"
      />
    );
  };
  return (
    <div className="earn_bar">
      <div className="container">
        <div className="earn_datawrap b_wrap">
          <div className="scrollBar">
            <Row gutter={16} className="earnData_First">
              <Col xl={8} lg={12} md={24} xs={24}>
                <div className="balance_box dflx b_wrap">
                  <div className="wrap_blance">
                    <div className="price">
                      $0.00
                      <span>
                        <Tooltip
                          placement="bottom"
                          title="A balance represents the total A you currently hold in your wallet and/or have staked within the A vault."
                        >
                          <ExclamationCircleOutlined />
                        </Tooltip>
                      </span>
                    </div>

                    <div className="currncy">
                      <span>0.00000</span> <span className="name">B</span>
                    </div>
                  </div>
                  <div className="slect_item">
                    <SelectDropdown
                      defaultValue="B Balance"
                      onChange={handleChange}
                      dropdownValue={a}
                    />
                  </div>
                </div>
              </Col>
              <Col xl={8} lg={12} md={24} xs={24} className="platformWrap">
                <div className="balance_box dflx b_wrap">
                  <PlatformType />
                </div>
              </Col>
              <Col xl={8} lg={12} md={24} xs={24}>
                <div className="balance_box dflx b_wrap">
                  <ButtonCommon
                    title="Claim All"
                    // className="disabled"
                    onClick={() => {
                      setTimeout(() => {
                        setIsComplete("COMPLETE");
                      }, 2000);
                      showModal(true);
                    }}
                  />
                  <ButtonCommon
                    title="Stake All"
                    className="disabled"
                    disabled
                  />
                </div>
              </Col>
            </Row>
          </div>
          <Row gutter={16} className="m-30">
            <Col xl={4} md={8} sm={12} xs={12}>
              <SelectDropdown
                defaultValue="All"
                onChange={handleChange}
                dropdownValue={a}
                className="lable_top"
                title="Type"
              />
            </Col>
            <Col xl={4} md={8} sm={12} xs={12} className="platformWrap">
              <PlatformType />
            </Col>
            <Col xl={4} md={8} sm={12} xs={12}>
              <SelectDropdown
                defaultValue="All"
                onChange={handleChange}
                dropdownValue={a}
                className="lable_top"
                title="Asset"
              />
            </Col>
            <Col xl={4} md={8} sm={12} xs={12}>
              <SelectDropdown
                defaultValue="Default"
                onChange={handleChange}
                dropdownValue={a}
                className="lable_top"
                title="Sort by"
              />
            </Col>
            <Col xl={12} md={24} xs={24}>
              <SearchBar
                placeholder="search me"
                className="lable_top"
                title="Search Vault"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export { EarnBar };
