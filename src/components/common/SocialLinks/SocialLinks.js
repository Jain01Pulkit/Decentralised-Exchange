import React from "react";
import { Link } from "react-router-dom";
import "./SocialLinks.scss";

const SocialLinks = ({ className }) => {
  return (
    <>
      <div className={`social_links ${className}`}>
        <div className="icon">
          <Link to="#" target="_blank">
            <i className="twitter" />
          </Link>
        </div>
        <div className="icon">
          <Link to="#" target="_blank">
            <i className="discord" />
          </Link>
        </div>
        <div className="icon">
          <Link to="#" target="_blank">
            <i className="medium" />
          </Link>
        </div>
        <div className="icon">
          <Link to="#" target="_blank">
            <i className="telegram" />
          </Link>
        </div>
      </div>
    </>
  );
};

export { SocialLinks };
