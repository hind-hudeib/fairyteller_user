import React from "react";
import "../css/Loader.css";
const Loader = () => {
  return (
    <div>
      <div className="typewriter">
        <div className="slide">
          <i></i>
        </div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
    </div>
  );
};

export default Loader;
