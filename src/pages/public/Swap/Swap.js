import React, { useState } from "react";
import { Row, Col } from "antd";
import { Layout } from "../../../components/layout";
import SwapDetail from "../../../components/common/SwapDetail/SwapDetail";
import SwapCard from "./Components/SwapCard/SwapCard";
import "./Swap.scss";

const Swap = () => {
  const [toggle, setToggle] = useState(false);
  const [priceImpact, setPriceImpact] = useState(0);

  const [swap, setSwap] = useState("Swap");
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
              <SwapCard
                handleToggle={handleToggle}
                mode={swap}
                setPriceImpact={setPriceImpact}
              />
              <SwapDetail priceImpact={priceImpact} />
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Swap;
