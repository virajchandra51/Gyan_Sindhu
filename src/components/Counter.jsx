import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

import React from "react";
import { useState } from "react";

const Counter = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <div className="flex flex-col items-center w-full my-8">
      <div className="text-center max-w-[800px] mx-auto my-8">
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          Why Should You Choose Us?
        </div>
      </div>
      <div className="bg-[var(--primary-c)] text-white w-[95%] rounded-md">
        <ScrollTrigger
          style={{ width: "100%" }}
          onEnter={() => setCounterOn(true)}
        >
          <div className="flex md:flex-row flex-col items-center gap-8 py-12 px-8 justify-around">
            <div className="text-2xl">
              <p className="font-xs text-center">
                <span className="font-extrabold text-4xl">
                  {counterOn && (
                    <CountUp start={0} end={25} duration={5} delay={0.5} />
                  )}
                  +
                  <br />
                </span>{" "}
                Years Experience
              </p>
            </div>
            <div className="text-2xl">
              <p className="font-xs text-center">
                <span className="font-extrabold text-4xl">
                  {counterOn && (
                    <CountUp start={0} end={50} duration={5} delay={0.5} />
                  )}
                  K+
                  <br />
                </span>{" "}
                Clients Served
              </p>
            </div>
            <div className="text-2xl">
              <p className="font-xs text-center">
                <span className="font-extrabold text-4xl">
                  {counterOn && (
                    <CountUp start={0} end={100} duration={5} delay={0.5} />
                  )}
                  +
                  <br />
                </span>{" "}
                Schools
              </p>
            </div>
            <div className="text-2xl">
              <p className="font-xs text-center">
                <span className="font-extrabold text-4xl">
                  {counterOn && (
                    <CountUp start={0} end={10} duration={5} delay={0.5} />
                  )}
                  K+
                  <br />
                </span>{" "}
                Products
              </p>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
};

export default Counter;
