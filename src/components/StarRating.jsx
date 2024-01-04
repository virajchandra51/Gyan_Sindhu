import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({stars}) => {
  const starArr = [];
  for (let i = 1; i <= stars; i++) starArr.push("fill-yellow-300");
  for (let i = stars + 1; i <= 5; i++) starArr.push("fill-gray-300");

  return (
    <div className="flex">
      {starArr?.map((val, i) => {
        return <FaStar className={`${starArr[i]}`}/>;
      })}
    </div>
  );
};

export default StarRating;
