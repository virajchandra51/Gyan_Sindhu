import React, { useState } from "react";
import "./Login.css"; // Import your stylesheet

import logo from "../../public/logo.png";
import slide1 from "../../public/image1.png";

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleToggleClick = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const inputs = document.querySelectorAll(".input-field");

  inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
      inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
      if (inp.value !== "") return;
      inp.classList.remove("active");
    });
  });

  return (
    <main
      className={
        isSignUpMode
          ? "sign-up-mode bg-[var(--primary-c)] h-screen flex justify-center items-center"
          : "bg-[var(--primary-c)] h-screen flex justify-center items-center"
      }
    >
      <div className="relative w-full max-w-[1020px] h-[90%] bg-white rounded-[3rem] flex justify-center items-center shadow-md">
        <div className="absolute w-[calc(100%-4.1rem)] h-[calc(100%-4.1rem)]">
          <div
            className={`${isSignUpMode ? `left-[65%]` : `left-[10%]`} absolute h-full w-[45%] top-0  grid grid-cols-1 grid-rows-1 duration-[0.8s] ease-in-out`}
          >
            <form className={`${isSignUpMode ? "sign-in-form" : ""} col-start-1 col-end-2 row-start-1 row-end-2 max-w-[260px] w-full mx-0 my-auto h-full flex flex-col justify-evenly  transition-opacity transition-delay-[0.02s] duration-[0.4s]`}>
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registred yet?</h6>
                <span className="toggle" onClick={() => handleToggleClick()}>
                  Sign up
                </span>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input type="text" className="input-field" required />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input type="password" className="input-field" required />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign In" className="sign-btn" />

                <p className="text">
                  Forgotten your password or you login datails?
                  <a href="#">Get help</a> signing in
                </p>
              </div>
            </form>
            <form className="sign-up-form col-start-1 col-end-2 row-start-1 row-end-2 max-w-[260px] w-full mx-0 my-auto h-full flex flex-col justify-evenly  transition-opacity transition-delay-[0.02s] duration-[0.4s]">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a
                  href="#"
                  className="toggle"
                  onClick={() => handleToggleClick()}
                >
                  Sign in
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input type="text" className="input-field" required />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input type="email" className="input-field" required />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input type="password" className="input-field" required />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign Up" className="sign-btn" />

                <p className="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          <div className="arousel">
            <div className="images-wrapper">
              <img src={slide1} className={`image img-1 show`} alt="" />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group">
                  <h2>One Stop Solution by Gyan Sindhu</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
