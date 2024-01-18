import React from "react";
import "./SmallBlocks.scss";

const SmallBlocks = (props) => {
  return (
    <div className="cake_block">
      <p>{props.heading}</p>
      <h4>{props.main}</h4>
      <p>{props.doller}</p>
    </div>
  );
};

export default SmallBlocks;
