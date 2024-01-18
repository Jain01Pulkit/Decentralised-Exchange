import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Backsvg } from "../../../assets/images/back_btn.svg";
import "./ButtonBackStyle.scss";

const ButtonBack = (props) => {
  const navigate = useNavigate();
  return (
    <Link
      className="goBackButtonStyle"
      to={{ javascript: void 0 }}
      onClick={() => navigate(-1)}
    >
      <Backsvg className="back_arrow" />
      {props.title}
    </Link>
  );
};

export default ButtonBack;
