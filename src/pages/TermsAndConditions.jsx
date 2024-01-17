import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const TermsAndConditions = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Terms And Conditions
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        <ol className="text-md mt-5 mb-20 list-decimal">
          <li className="mb-8">
            User Eligibility: Users must be of legal age to make purchases. By
            using our platform, users confirm eligibility.
          </li>
          <li className="mb-8">
            Product Information: We strive for accuracy in product descriptions,
            but do not warrant that product information is error-free. Any
            discrepancies should be reported to our customer service. Prices of
            products are subject to change without prior notice.
          </li>
          <li className="mb-8">
            Ordering and Payment: Users agree to provide accurate information
            during the ordering process. Payments are processed securely, and
            users are responsible for any transaction fees. To submit an order
            it’s necessary to register with our website. Once you submit an
            order, you cannot cancel it. All orders are subject to acceptance by
            us.
          </li>
          <li className="mb-8">
            Shipping and Delivery: Details on shipping costs, delivery times,
            and terms are outlined in our shipping policy. Delays may occur due
            to unforeseen circumstances.
          </li>
          <li className="mb-8">
            Returns and Refunds: Users may refer to our returns policy for
            information on returning products and eligibility for refunds.
          </li>
          <li className="mb-8">
            Intellectual Property: All content on the platform, including logos
            and images, is the property of Gyan Sindhu. Users may not use,
            reproduce, or distribute it without permission.
          </li>
          <li className="mb-8">
            Dispute Resolution: Disputes will be resolved through arbitration in
            accordance with the laws of Bangalore Jurisdiction. Users agree to
            this mechanism.
          </li>
        </ol>
      </Wrapper>
    </Layout>
  );
};

export default TermsAndConditions;
