import React from "react";

const Starfilling = ({ fill = 0 }) => (
  <div className="star">
    <div className="star-fill" style={{ width: `${fill * 100}%` }} />
  </div>
);

export default Starfilling
