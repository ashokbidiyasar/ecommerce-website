import React from "react";
import Starfilling from "./Starfilling";

const Rating = ({ rating, reviews }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const diff = rating - i;
    const fill = diff >= 1 ? 1 : diff > 0 ? diff : 0;
    stars.push(<Starfilling key={i} fill={fill} />);
  }

  return (
    <div className="d-flex align-items-center gap-2">
      {/* Stars */}
      <div className="d-flex">{stars}</div>

      {/* Review count */}
      <span className="small fw-medium text-secondary">
        {reviews} {reviews === 1 ? "review" : "reviews"}
      </span>
    </div>
  );
};

export default Rating;
