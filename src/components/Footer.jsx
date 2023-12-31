import { Link } from "react-router-dom";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <footer className="bg-gray-300 pt-14 pb-10">
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-bold uppercase text-lg cursor-pointer">
              Member
            </div>
            <div className="font-medium text-md cursor-pointer  hover:text-gray-500 text-black duration-200">
              Register Now
            </div>
            <div className="font-medium text-md cursor-pointer  hover:text-gray-500 text-black duration-200">
              My Profile
            </div>
            <div className="font-medium text-md cursor-pointer  hover:text-gray-500 text-black duration-200">
              Login
            </div>
            <div className="font-medium text-md cursor-pointer  hover:text-gray-500 text-black duration-200">
              Feedback
            </div>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-bold uppercase text-lg">Pages</div>
              <Link
                to={"/about"}
                className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer"
              >
                About Us
              </Link>
              <div className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer">
                Order Policy
              </div>
              <Link
                to={"/returnpolicy"}
                className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer"
              >
                Return Policy
              </Link>
              <div className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer">
                Payment Options
              </div>
              <div className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer">
                Privacy Policy
              </div>
              <Link
                to={"/contactus"}
                className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer"
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
                className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer"
              >
                Phone : +91-8874211000
              </a> */}
              <a
                href="mailto:md@gyansindhu.com"
                className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer"
              >
                Email : md@gyansindhu.com
              </a>
              <Link
                to="https://maps.app.goo.gl/ZxRwgmQ3jracFYpB6"
                target="_blank"
                className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer"
              >
                Address 1 : #44 Chandrika Colony, Sigra <br />
                Varanasi - 221010
                <br />
                gyansindhu_vns@yahoo.co.in
              </Link>
              <Link
                to="https://maps.app.goo.gl/DdudH9q9FwfHvBRa6"
                target="_blank"
                className="text-md hover:text-gray-500 text-black duration-200 cursor-pointer"
              >
                Address 2 : #137, 2nd Cross, Amarjyothi, Domlur <br />
                Bengaluru - 560071
                <br />
                admin@gyansindhu.com
              </Link>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <div
            onClick={() =>
              window.open("https://www.facebook.com/gyansindhu88/", "_blank")
            }
            className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-center hover:bg-white/[0.5] cursor-pointer"
          >
            <FaFacebookF size={20} />
          </div>
          <Link
            href="https://twitter.com"
            className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-center hover:bg-white/[0.5] cursor-pointer"
          >
            <FaTwitter size={20} />
          </Link>
          <div className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-center hover:bg-white/[0.5] cursor-pointer">
            <FaYoutube size={20} />
          </div>
          <div className="w-10 h-10 rounded-full duration-200 bg-white/[0.25] flex items-center justify-center hover:bg-white/[0.5] cursor-pointer">
            <FaInstagram size={20} />
          </div>
        </div>
        {/* RIGHT END */}
      </Wrapper>
      <hr className="my-10" />
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[10px] md:gap-0">
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
            className="cursor-pointer text-black duration-200"
          >
            Designed and Developed By - FA SYSTEMS
          </Link>
        </div>
        {/* RIGHT END */}
      </Wrapper>
    </footer>
  );
};

export default Footer;
