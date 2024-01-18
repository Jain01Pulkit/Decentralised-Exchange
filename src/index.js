import React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/antd.min.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const loading = <div>Loading...</div>;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
reportWebVitals();
