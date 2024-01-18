import React from "react";
import { Routes, Route } from "react-router-dom";
import { Swap, Liquidity } from "../../pages";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Swap />} />
        <Route path="/liquidity" element={<Liquidity />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
