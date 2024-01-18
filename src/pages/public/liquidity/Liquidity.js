import React, { useState } from "react";
import { Row, Col } from "antd";
import { Layout } from "../../../components/layout";
import SwapCard from "./Components/SwapCard/SwapCard";
import "./Swap.scss";

const Liquidity = () => {
  const [toggle, setToggle] = useState(false);
  const [swap, setSwap] = useState("Liquidity");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Layout className={`swap_page`}>
      <div className="container">
        <Row>
          <Col
            lg={10}
            md={24}
            xs={24}
            className={`forSwap ${toggle ? "show" : "hide"}`}
          >
            <div className="swapRight">
              <SwapCard handleToggle={handleToggle} mode={swap} />
              {/* <SwapDetail /> */}
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Liquidity;
