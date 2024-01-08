import React, { useState, useEffect, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dummy from "../assets/sampleProduct.webp";
import StarRating from "./StarRating";

const bgColors = ["bg-yellow-500", "bg-red-600", "bg-green-600"];
const borderColors = [
  "border-yellow-500",
  "border-red-600",
  "border-green-600",
];
const textColors = ["text-yellow-500", "text-red-600", "text-green-600"];
const fillColors = ["fill-yellow-500", "fill-red-600", "fill-green-600"];

const CategoryCarousal = ({ index, data, sellType, sellTypeTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carousalStyle = {
    borderTop: "2px solid #fff",
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
        transition: "transform ease-out 0.3s",
        transform: `translateX(${-(currentIndex * (100 / data?.length))}%)`,
      };

    if (window.innerWidth > 1025)
      return {
        display: "flex",
        height: "100%",
        transition: "transform ease-out 0.3s",
        transform: `translateX(${-(currentIndex * (100 / data?.length))}%)`,
      };

    if (window.innerWidth > 450)
      return {
        display: "flex",
        height: "100%",
        transition: "transform ease-out 0.3s",
        transform: `translateX(${-(currentIndex * (100 / data?.length))}%)`,
      };

    return {
      display: "flex",
      height: "100%",
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
    <div
      style={carousalStyle}
      className="h-[100%] w-[100%] relative flex flex-col pt-10 pb-24 px-8 my-2 mx-0"
    >
      <div className="mb-8">
        <div
          className={`flex justify-between items-center bg-white border-t-2 ${borderColors[index]}`}
        >
          <div
            className={`text-md md:text-xl p-4 font-bold uppercase text-white ${bgColors[index]}`}
          >
            Shop by {sellTypeTitle} :
          </div>
          <Link
            className={`${textColors[index]} md:text-lg text-sm font-semibold hover:scale-105 duration-200 z-10 pr-2 flex items-center justify-center cursor-pointer hover:opacity-90`}
            to={`/${sellType}`}
            state={{ sellType: sellType }}
          >
            See all
            <BiArrowBack
              className={`rotate-180 ml-1 text-sm md:text-lg fill-${fillColors[index]}`}
            />
          </Link>
        </div>
      </div>
      <div style={slidesOverflow}>
        {sellType === "school" ? (
          <div style={getSlidesStyle()}>
            {data.length > 0 ? (
              data.map((item, ind) => {
                return (
                  <Link
                    to={"/class"}
                    state={{
                      school_code: item.school_code,
                      school_name: item.school_name,
                    }}
                    key={ind}
                    className="flex flex-col bg-white items-center p-2 m-2 pb-4 border hover:scale-[1.02] duration-200 shadow rounded-md"
                  >
                    <div className="flex items-center justify-center h-[250px] w-[250px]">
                      {item.photo_file_url ? (
                        <img
                          src={item.photo_file_url}
                          className="object-cover max-h-[220px]"
                        ></img>
                      ) : (
                        <img
                          src={dummy}
                          className="object-cover max-h-[220px]"
                        ></img>
                      )}
                    </div>
                    <hr className="h-2 w-full" />
                    <div
                      className={`${textColors[index]} my-2 text-xl font-bold text-center`}
                    >
                      {item[`${sellType}_name`]}
                    </div>
                    <StarRating stars = {parseInt(item.star_rating)}/>
                  </Link>
                );
              })
            ) : (
              <Skeleton
                containerClassName="flex-1 gap-4"
                count={5}
                height={20}
              />
            )}
          </div>
        ) : (
          <div style={getSlidesStyle()}>
            {data.length > 0 ? (
              data.map((item, ind) => {
                return (
                  <Link
                    to={"/result"}
                    state={{
                      name: item[`${sellType}_name`],
                      sellType: sellType,
                    }}
                    key={ind}
                    className="flex flex-col bg-white items-center p-2 m-2 pb-4 border hover:scale-[1.02] duration-200 shadow rounded-md"
                  >
                    <div className="flex items-center justify-center h-[250px] w-[250px]">
                      {item.photo_file_url ? (
                        <img
                          src={item.photo_file_url}
                          className="object-cover max-h-[220px]"
                        ></img>
                      ) : (
                        <img
                          src={dummy}
                          className="object-cover max-h-[220px]"
                        ></img>
                      )}
                    </div>
                    <hr className="h-2 w-full" />
                    <div
                      className={`${textColors[index]} my-2 text-xl font-bold text-center`}
                    >
                      {item[`${sellType}_name`]}
                    </div>
                    <StarRating stars = {parseInt(item.star_rating)}/>
                  </Link>
                );
              })
            ) : (
              <Skeleton
                containerClassName="flex-1 gap-4"
                count={5}
                height={20}
              />
            )}
          </div>
        )}
      </div>

      <div
        className="absolute right-[4rem] md:right-[5.2rem] bottom-8 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
        onClick={() => goToPrevious()}
      >
        <BiArrowBack className="text-sm md:text-lg fill-white" />
      </div>
      <div
        className="absolute right-[2rem] bottom-8 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
        onClick={() => goToNext()}
      >
        <BiArrowBack className="rotate-180 text-sm md:text-lg fill-white" />
      </div>
    </div>
  );
};

export default CategoryCarousal;
