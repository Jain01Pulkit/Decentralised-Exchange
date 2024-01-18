import React from "react";
import { Input } from "antd";
import "./InputCustom.scss";

const InputCustom = (props) => {
  return (
    <div className="inputCustom_Style">
      <label>{props.label}</label>
      <Input placeholder={props.placeholder} />
    </div>
  );
};
export { InputCustom };
