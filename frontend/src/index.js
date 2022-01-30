import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MetaMaskProvider } from "metamask-react";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
