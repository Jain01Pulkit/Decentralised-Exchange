import React from "react";
import { Select } from "antd";
import "./SelectDropdown.scss";

const SelectDropdown = (props) => {
  const { Option } = Select;
  function handleChange(value) {
  }
  return (
    <>
      <div className={`slect_item ${props.className}`}>
        <span className="select_title">{props.title}</span>
        <Select
          defaultValue={props.defaultValue}
          onChange={handleChange}
          className={`option_selct ${props.className}`}
        >
          {props && props.dropdownValue
            ? props.dropdownValue.map((item, index) => (
                <Option value="first">{item}</Option>
              ))
            : "No list found"}
          {/* <Option value="first">{props.first}</Option>
          <Option value="second">{props.second}</Option>
          <Option value="third">{props.third}</Option>
          <Option value="foruth">{props.foruth}</Option> */}
        </Select>
      </div>
    </>
  );
};

export { SelectDropdown };
