import React from "react";

import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.css";

import CarouselData from "../assets/data/carouselData";

const HeroBanner = () => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] max-h-[600px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {CarouselData.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.img}
                className="aspect-[16/10] md:aspect-auto h-[600px] object-cover"
              />
              <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium">
                {item.caption}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
