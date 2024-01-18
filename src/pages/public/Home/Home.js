import React, { useEffect } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="landing_page">
        <div className="welcome_area"></div>
      </div>
    </>
  );
};

export default Home;
