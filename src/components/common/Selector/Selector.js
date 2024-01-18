import React, { useState } from "react";
import { Input, Select, Space, Cascader } from "antd";
import "./Selector.scss";
import ButtonCommon from "../buttonCommon/ButtonCommon";
// import { SettingOutlined } from "@ant-design/icons";
const { Option } = Select;

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">CAKE</Option>
    <Option value=".jp">baffer</Option>
    <Option value=".cn">paste</Option>
    <Option value=".org">patte</Option>
  </Select>
);

export default (props) => (
  <div className="cake-Selector" lg={12}>
    <label>
      {props.Deposit}
      <span>{props.point}</span>
    </label>

    <Space direction="vertical" className="selector_space">
      <Input addonAfter={selectAfter} defaultValue="0.0" placeholder="0.0" />
    </Space>
  </div>
);
