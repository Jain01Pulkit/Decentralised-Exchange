import React from "react";
import { Carousel } from "antd";
import green_up from "../../../assets/images/green_up.svg";
import green_chrt from "../../../assets/images/green_chart.svg";
import red_down from "../../../assets/images/red-down.svg";
import "./ChartSlider.scss";

const ChartSlider = (props) => {
  const ChartDetail = [
    {
      title: "TOTAL VALUE LOCKED",
      currentvalue: "12,330,000",
      fl_amount: "330,000",
      fl_prcentage: "-2.75",
      date_time: "October 30th 2021, 9:02:23pm",
      chartimg: red_down,
    },
    {
      title: "TOTAL VALUE LOCKED",
      currentvalue: "10,136,000",
      fl_amount: "176,030",
      fl_prcentage: "-2.75",
      date_time: "October 30th 2021, 9:02:23pm",
      chartimg: green_up,
    },
    {
      title: "TOTAL VALUE LOCKED",
      currentvalue: "12,330,000",
      fl_amount: "330,000",
      fl_prcentage: "-2.75",
      date_time: "October 30th 2021, 9:02:23pm",
      chartimg: red_down,
    },
    {
      title: "TOTAL VALUE LOCKED",
      currentvalue: "10,136,000",
      fl_amount: "176,030",
      fl_prcentage: "-2.75",
      date_time: "October 30th 2021, 9:02:23pm",
      chartimg: green_up,
    },
  ];

  return (
    <>
      <div className="valut_chart">
        <div className="container">
          <Carousel effect="fade">
            {ChartDetail.map((item, index) => (
              <div className={`chart_view ${props.className}`}>
                <div className="vaultchart_info">
                  <p className="valut_name">{item.title}</p>
                  <h2 className="valut_value">${item.currentvalue}</h2>
                  <div className="fluctuation increase decrease">
                    <span>${item.fl_amount}</span>
                    <span className="fl_prcentage">{item.fl_prcentage}%</span>
                  </div>
                  <p className="time">{item.date_time}</p>
                </div>
                <div className="chart_area">
                  <img src={item.chartimg} alt="chart_image" />
                  <div className="change_chart_buttons">
                    <button className="chrt_btn active">1D</button>
                    <button className="chrt_btn">1W</button>
                    <button className="chrt_btn">1M</button>
                    <button className="chrt_btn">1Y</button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export { ChartSlider };
