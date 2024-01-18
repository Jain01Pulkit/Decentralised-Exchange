import { Col } from "antd";
import React from "react";
import ButtonCommon from "../buttonCommon/ButtonCommon";
import "./Medialogos.scss";

const Medialogos = (props) => {
  return (
    <>
      <Col lg={8} xl={8}>
        <div className="Token-logo">
          <div className={`imgSec ${props.className}`}>
            <img src={props.img} alt="image" className="tokenImage" />
          </div>
          <div className="title-buttonsec">
            <h5 className="titlesecond">{props.title}</h5>
            <div className="svgPng-button">
              <ButtonCommon className="png-download" title="Download PNG" />
              <ButtonCommon className="svg-download" title="Download SVG" />
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Medialogos;
