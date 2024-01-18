import React from "react";
import { Row } from "antd";
import { Link } from "react-router-dom";
import "./FooterStyle.scss";
import { SocialLinks } from "../SocialLinks/SocialLinks";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <SocialLinks className="forMob" />
        <Row>
          <ul className="footer_links">
            <li>
              <Link to="/">Terms of use</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Cookie Notice</Link>
            </li>
            <li>
              <Link to="/">Security Audits</Link>
            </li>
            <li>
              <Link to="/mediakit">Media Kit</Link>
            </li>
          </ul>
        </Row>
      </div>
    </div>
  );
};

export { Footer };
