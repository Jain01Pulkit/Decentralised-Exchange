import React from "react";
import "./BorderButton.scss";

const BorderButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`border_btn ${props.className}`}
    >
      {props.title}
      {props.children}
    </button>
  );
};

export default BorderButton;
