import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const PrivacyPolicy = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Privacy Policy
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        <ol className="text-md mt-5 mb-20 list-decimal">
          <li className="mb-8">
            Collection of Personal Information: We collect personal information,
            including but not limited to names, addresses, and contact details,
            to fulfill orders and enhance user experience.
          </li>
          <li className="mb-8">
            Use of Personal Information: Personal information is used for order
            processing, communication, and improving our services. Users may
            receive newsletters or promotional materials, but can opt-out at any
            time.
          </li>
          <li className="mb-8">
            Data Security: We implement industry-standard security measures to
            protect user data. However, users acknowledge that no online
            platform can guarantee absolute security.
          </li>
          <li className="mb-8">
            Third-Party Sharing: We may share necessary information with trusted
            third parties, such as shipping partners, to fulfill orders. Users'
            data is not sold or shared for marketing purposes without explicit
            consent.
          </li>
          <li className="mb-8">
            Cookies and Tracking: We use cookies and similar technologies to
            enhance user experience. Users can manage preferences related to
            cookies in their browser settings.
          </li>
          <li className="mb-8">
            User Rights: Users have the right to access, correct, and delete
            their personal information. Requests can be made through our
            designated channels.
          </li>
          <li className="mb-8">
            Changes to Privacy Policy: We reserve the right to update our
            privacy policy. Please check our website to see any updates in the
            privacy policy.
          </li>
        </ol>
      </Wrapper>
    </Layout>
  );
};

export default PrivacyPolicy;
