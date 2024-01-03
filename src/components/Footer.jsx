import { Link } from "react-router-dom";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaMapPin,
  FaLock,
  FaTruck,
} from "react-icons/fa";
import { MdCall, MdVerified } from "react-icons/md";
import Wrapper from "./Wrapper";
import { useState, useEffect } from "react";

const Footer = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (localStorage.getItem("UserData") === null) {
      var data = {
        member_id: "-1",
        person_name: "",
        salutation: "",
      };
      setUserData(data);
    } else {
      setUserData(JSON.parse(localStorage.getItem("UserData")));
    }
  }, []);
  return (
    <footer className="bg-white">
      <div className="flex w-full md:flex-row flex-col justify-between mb-14 items-center">
        <div className="flex py-12 flex-col items-center border-y-2 border-l-2 w-full md:w-1/4">
          <div className="bg-gray-300 flex items-center justify-center rounded-full p-4">
            <MdCall className="fill-black" size={24} />
          </div>
          <h2 className="font-semibold mt-2 text-lg">Customer Service</h2>
          <p className="text-md">Mail & Telephone</p>
        </div>
        <div className="flex py-12 flex-col items-center border-y-2 border-l-2 w-full md:w-1/4">
          <div className="bg-gray-300 flex items-center justify-center rounded-full p-4">
            <FaLock className="fill-black" size={24} />
          </div>
          <h2 className="font-semibold mt-2 text-lg">100% Secured</h2>
          <p className="text-md">Payment</p>
        </div>
        <div className="flex py-12 flex-col items-center border-y-2 border-l-2 w-full md:w-1/4">
          <div className="bg-gray-300 flex items-center justify-center rounded-full p-4">
            <FaTruck className="fill-black" size={24} />
          </div>
          <h2 className="font-semibold mt-2 text-lg">Express</h2>
          <p className="text-md">Delivery</p>
        </div>
        <div className="flex py-12 flex-col items-center border-y-2 border-l-2 w-full md:w-1/4">
          <div className="bg-gray-300 flex items-center justify-center rounded-full p-4">
            <MdVerified className="fill-black" size={24} />
          </div>
          <h2 className="font-semibold mt-2 text-lg">Highest Quality</h2>
          <p className="text-md">Guarantee</p>
        </div>
      </div>
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-bold uppercase text-lg cursor-pointer">
              Member
            </div>
            <Link to='/register' className="font-medium text-md cursor-pointer  hover:text-[var(--primary-c)] text-black duration-200">
              Register Now
            </Link>
            <Link to='/profile' state={{ member_id: userData.member_id }} className="font-medium text-md cursor-pointer  hover:text-[var(--primary-c)] text-black duration-200">
              My Profile
            </Link>
            <Link to='/login' className="font-medium text-md cursor-pointer  hover:text-[var(--primary-c)] text-black duration-200">
              Login
            </Link>
            <Link to='/contactus' className="font-medium text-md cursor-pointer  hover:text-[var(--primary-c)] text-black duration-200">
              Feedback
            </Link>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0 md:flex-row flex-col">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-bold uppercase text-lg">Pages</div>
              <Link
                to={"/about"}
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                About Us
              </Link>
              <div className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer">
                Order Policy
              </div>
              <Link
                to={"/returnpolicy"}
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                Return Policy
              </Link>
              <div className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer">
                Payment Options
              </div>
              <Link
                to={"/privacypolicy"}
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/contactus"}
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-bold uppercase text-lg">
                About Skoolio - A unit of Gyan Sindhu
              </div>
              {/* <a
                href="tel:+91-8874211000"
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                Phone : +91-8874211000
              </a> */}
              <a
                href="mailto:md@gyansindhu.com"
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                Email : sales@gyansindhu.com
              </a>
              <Link
                to="https://maps.app.goo.gl/ZxRwgmQ3jracFYpB6"
                target="_blank"
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                Address 1 : #44 Chandrika Colony, Sigra <br />
                Varanasi - 221010
                <br />
              </Link>
              <Link
                to="https://maps.app.goo.gl/DdudH9q9FwfHvBRa6"
                target="_blank"
                className="text-md hover:text-[var(--primary-c)] text-black duration-200 cursor-pointer"
              >
                Address 2 : #137, 2nd Cross, Amarjyothi, Domlur <br />
                Bengaluru - 560071
                <br />
              </Link>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex justify-center md:items-end md:justify-between flex-col">
          <div>
            <div className="flex justify-start md:justify-end items-center">
              <div
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/gyansindhu88/",
                    "_blank"
                  )
                }
                className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-start md:justify-end cursor-pointer"
              >
                <FaFacebookF
                  size={24}
                  className="duration-200 hover:fill-[var(--primary-c)]"
                />
              </div>
              <Link
                href="https://twitter.com"
                className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-start md:justify-end cursor-pointer"
              >
                <FaTwitter
                  size={24}
                  className="duration-200 hover:fill-[var(--primary-c)]"
                />
              </Link>
              <div className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-start md:justify-end cursor-pointer">
                <FaYoutube
                  size={24}
                  className="duration-200 hover:fill-[var(--primary-c)]"
                />
              </div>
              <div className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-start md:justify-end cursor-pointer">
                <FaInstagram
                  size={24}
                  className="duration-200 hover:fill-[var(--primary-c)]"
                />
              </div>
            </div>
            <div className="text-left md:text-right">For More Updates,</div>
            <div className="text-left md:text-right">
              Follow us on social media.
            </div>
          </div>
          <Link
            to="https://maps.app.goo.gl/ZxRwgmQ3jracFYpB6"
            target="_blank"
            className="flex items-center mt-8 text-lg font-bold duration-200 hover:text-[var(--primary-c)]"
          >
            View Map Location
            <FaMapPin size={18} fill="#a00" className="ml-1" />
          </Link>
        </div>
        {/* RIGHT END */}
      </Wrapper>
      <div className="flex justify-between flex-col md:flex-row gap-[10px] w-full md:gap-0 bg-black p-10 mt-10 text-white h-30">
        {/* LEFT START */}
        <div className="text-md  font-semibold text-center md:text-left">
          © 2024 Gyan Sindhu. All Rights Reserved.{" "}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="text-md font-semibold text-center md:text-left">
          <Link
            to={"https://www.onlinelko.co.in/"}
            target="_blank"
            className="cursor-pointer duration-200"
          >
            Designed and Developed By - FA SYSTEMS
          </Link>
        </div>
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default Footer;
