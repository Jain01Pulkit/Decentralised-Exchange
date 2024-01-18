import React from "react";
import "./Pagination.scss";
import { Link } from "react-router-dom";
import { Col } from "antd";
import paginationarrow from "../../../assets/images/paginationarrow.svg";
import leftarrow from "../../../assets/images/leftarrow.svg";

const Pagination = () => {
  return (
    <div>
      <Col lg={24}>
        <div className="pagination">
          <Link to="">
            <span>
              <img src={leftarrow} alt="token_icon" />
            </span>
          </Link>
          <Link to="">
            <span>1</span>
          </Link>
          <Link to="">
            <span>2</span>
          </Link>
          <Link to="">
            <span>3</span>
          </Link>
          <Link to="">
            <span>...</span>
          </Link>
          <Link to="/">
            <span>
              <img src={paginationarrow} alt="token_icon" />
            </span>
          </Link>
        </div>
      </Col>
    </div>
  );
};

export default Pagination;
