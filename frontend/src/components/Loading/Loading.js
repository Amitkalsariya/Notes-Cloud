import React from "react";
import "./Loading.css"; // ✅ Import the CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div> {/* ✅ Custom loader */}
    </div>
  );
};

export default Loading;
