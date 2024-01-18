import React from "react";
import { Checkbox } from "antd";
import "./CheckboxStyle.scss";

function onChange(e) {
}
const CustomCheckbox = ({ className, label }) => {
  return (
    <Checkbox className={`checkboxStyle ${className}`} onChange={onChange}>
      {label}
    </Checkbox>
  );
};

export default CustomCheckbox;
