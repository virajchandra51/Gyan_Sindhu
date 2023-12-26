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
      <div className="bg-[var(--primary-c)] text-white w-full">
        <ScrollTrigger
          style={{ width: "100%" }}
          onEnter={() => setCounterOn(true)}
        >
            <div className="flex items-center h-[130px] justify-around">
              <div className="text-3xl">
                <p className="codeutsava__section-statistics-format-card-description">
                  <span style={{ color: "black" }}>
                    {counterOn && (
                      <CountUp
                        start={500}
                        end={1000}
                        duration={1.5}
                        delay={0}
                      />
                    )}
                    +
                  </span>{" "}
                  TEAMS
                </p>
              </div>
              <div className="text-3xl">
                <p className="codeutsava__section-statistics-format-card-description">
                  <span style={{ color: "black" }}>
                    {counterOn && (
                      <CountUp start={50} end={100} duration={1.5} delay={0} />
                    )}
                    +
                  </span>{" "}
                  COLLEGES
                </p>
              </div>
              <div className="text-3xl">
                <p className="codeutsava__section-statistics-format-card-description">
                  <span style={{ color: "black" }}>
                    {counterOn && (
                      <CountUp
                        start={1000}
                        end={2000}
                        duration={1.5}
                        delay={0}
                      />
                    )}
                    +
                  </span>{" "}
                  DEVELOPERS
                </p>
              </div>
              <div className="text-3xl">
                <p className="codeutsava__section-statistics-format-card-description">
                  <span style={{ color: "black" }}>
                    {counterOn && (
                      <CountUp
                        start={100}
                        end={3000}
                        duration={1.5}
                        delay={0}
                      />
                    )}
                    +
                  </span>{" "}
                  VISITORS
                </p>
              </div>
            </div>
        </ScrollTrigger>
      </div>
    </div>
  );
};

export default Counter;
