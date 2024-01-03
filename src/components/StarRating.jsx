import React from "react";

const StarRating = () => {
  const starAverage = 4.5;
  const fullStars = Math.floor(starAverage);
  const starArr = [];
  for (let i = 1; i <= fullStars; i++) {
    starArr.push(1);
  }
  if (starAverage < 5) {
    const partialStar = starAverage - fullStars;
    starArr.push(partialStar);
    const emptyStars = 5 - starArr.length;
    for (let i = 1; i <= emptyStars; i++) {
      starArr.push(0);
    }
  }

  return (
    <div className="flex">
      {starArr?.map((val, i) => {
        return (
          <div
            key={i}
            style={{
              background: `linear-gradient(90deg, #ee0
              ${val * 100}%, #bbbac0 ${val * 100}%)`,
            }}
            className="border-[1px] w-[25px] flex items-center justify-center"
          >
            ★
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
