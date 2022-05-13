import React from "react";
import reactDom from "react-dom";
import { BallTriangle } from "react-loader-spinner";
import "./index.scss";

export default function Loading() {
  return reactDom.createPortal(
    <div className="loader-container">
      <BallTriangle
        height="200"
        width="200"
        color="blue"
        ariaLabel="loading-indicator"
        className="loader"
      />
    </div>,
    document.getElementById("loader")
  );
}
