import React from "react";
import { Header, Footer, SocialLinks } from "../common";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <>
      <Header {...props} />
      <SocialLinks className="forDesktop" />
      <div className={`baselayout ${props.className}`}>{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
