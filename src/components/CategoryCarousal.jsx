import React, { useState, useEffect, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const CategoryCarousal = ({ data, sellType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carousalStyle = {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "4rem 2rem",
    margin: "4rem 0",
    borderTop: "2px solid #f1f1f1aa",
  };

  const slidesOverflow = {
    overflow: "hidden",
    height: "100%",
  };

  const getSlidesStyle = () => {
    if (window.innerWidth > 1300)
      return {
        display: "flex",
        height: "100%",
        gap: "2rem",
        transition: "transform ease-out 0.3s",
        transform: `translateX(${-(currentIndex * (100 / data?.length))}%)`,
      };

    if (window.innerWidth > 1025)
      return {
        display: "flex",
        height: "100%",
        gap: "2rem",
        transition: "transform ease-out 0.3s",
        transform: `translateX(${-(currentIndex * (100 / data?.length))}%)`,
      };

    if (window.innerWidth > 450)
      return {
        display: "flex",
        height: "100%",
        gap: "2rem",
        transition: "transform ease-out 0.3s",
        transform: `translateX(${-(currentIndex * (100 / data?.length))}%)`,
      };

    return {
      display: "flex",
      height: "100%",
      gap: "2rem",
      transition: "transform ease-out 0.3s",
      transform: `translateX(${-(currentIndex * (100 / data?.length))}%)`,
    };
  };

  const goToPrevious = () => {
    if (window.innerWidth > 1300) {
      const isFirst = currentIndex === 0;
      const newIndex = isFirst ? data?.length - 3 : currentIndex - 1;
      setCurrentIndex(newIndex);
    } else if (window.innerWidth > 1025) {
      const isFirst = currentIndex === 0;
      const newIndex = isFirst ? data?.length - 2 : currentIndex - 1;
      setCurrentIndex(newIndex);
    } else {
      const isFirst = currentIndex === 0;
      const newIndex = isFirst ? data?.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const goToNext = () => {
    if (window.innerWidth > 1300) {
      const isLast = currentIndex === data?.length - 3;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    } else if (window.innerWidth > 1025) {
      const isLast = currentIndex === data?.length - 2;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    } else {
      const isLast = currentIndex === data?.length - 1;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };


  return (
    <div style={carousalStyle}>
      <div className="mb-4 text-2xl font-bold capitalize">
        Shop by {sellType} :
      </div>
      <div style={slidesOverflow}>
        <div style={getSlidesStyle()}>
          {data?.map((item, index) => {
            return (
              <div
                className="text-white flex justify-center items-center min-w-fit px-16 py-8 text-center bg-[var(--primary-c)]"
                key={index}
              >
                {item[`${sellType}_name`]}
              </div>
            );
          })}
        </div>
      </div>
      <Link
        className="absolute right-[2rem] top-15 h-[30px] md:h-[50px] text-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
        to={`/${sellType}`}
        state={{sellType: sellType}}
      >
        Show More
      </Link>
      <div
        className="absolute right-[4rem] md:right-[5.2rem] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
        onClick={() => goToPrevious()}
      >
        <BiArrowBack className="text-sm md:text-lg fill-white" />
      </div>
      <div
        className="absolute right-[2rem] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
        onClick={() => goToNext()}
      >
        <BiArrowBack className="rotate-180 text-sm md:text-lg fill-white" />
      </div>
    </div>
  );
};

export default CategoryCarousal;
