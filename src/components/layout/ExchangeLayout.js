import React from "react";

const ExchangeLayout = ({ Component, ...props }) => {
  return (
    <React.Fragment>
      <div fluid className="main_box">
        <Component {...props} />
      </div>
    </React.Fragment>
  );
};

export default ExchangeLayout;
