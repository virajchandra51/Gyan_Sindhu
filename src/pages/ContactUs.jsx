import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const ContactUs = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Contact Us
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="flex justify-center items-center mb-24">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.816533900871!2d82.98427457938783!3d25.310367419980036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e320816f58b37%3A0x5b32cbee9fa630ae!2sGyan%20Sindhu!5e0!3m2!1sen!2sin!4v1702452222971!5m2!1sen!2sin"
            width="800"
            height="650"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default ContactUs;
