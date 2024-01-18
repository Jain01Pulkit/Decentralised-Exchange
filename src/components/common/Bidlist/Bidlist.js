import React from "react";
import vector from "../../../assets/images/Vector.png";
import { Link } from "react-router-dom";
import "./Bidlist.scss";
import { ExternalLinkIcon } from "../../../assets/Svg/SvgImages";

const Bidlist = (props) => {
  const Bid = [
    { name: "0x20674a0d0...AF12", time: "1 min ago", money: "25 BUSD" },
    { name: "0x20674a0d0...AF12", time: "1 min ago", money: "25 BUSD" },
    { name: "0x20674a0d0...AF12", time: "1 min ago", money: "25 BUSD" },
    { name: "0x20674a0d0...AF12", time: "1 min ago", money: "25 BUSD" },
    { name: "0x20674a0d0...AF12", time: "1 min ago", money: "25 BUSD" },
    { name: "0x20674a0d0...AF12", time: "1 min ago", money: "25 BUSD" },
    { name: "0x20674a0d0...AF12", time: "1 min ago", money: "25 BUSD" },
  ];
  return (
    <>
      {Bid.map((props) => (
        <ul>
          <li>
            <div className="Bid-sec">
              <p>{props.name}</p> <p>{props.time}</p>
              <p className="externalLink">
                {props.money}
                <Link to="">
                  <ExternalLinkIcon />
                </Link>
              </p>
            </div>
          </li>
        </ul>
      ))}
    </>
  );
};

export default Bidlist;
