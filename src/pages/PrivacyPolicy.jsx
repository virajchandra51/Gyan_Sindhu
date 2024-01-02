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
        <div className="text-2xl font-extrabold mt-5">Terms & Conditions</div>
        <div className="text-base mt-5 mb-20">
          We are glad to introduce our Organization <b>“SKOOLIO”</b> A unit of
          Gyan Sindhu, which is a one stop shop for all Books / Stationery
          items. <br />
          <br /> The following Terms and conditions, together with our Privacy
          Policy and Website Use Terms apply to your access to use of our online
          shop. <br />
          <br />
          This Privacy Policy explains how we collect, use and (under certain
          conditions) disclose your personal information. This Privacy Policy
          also explains the steps we have taken to secure your personal
          information. Finally, this Privacy Policy explains your options
          regarding the collection, use and disclosure of your personal
          information. By visiting the Site directly or through another site,
          you accept the practices described in this policy.
          <br />
          <br /> Data protection is a matter of trust and your privacy is
          important to us. We shall therefore only use your name and other
          information which relates to you in the manner set out in this Privacy
          Policy. We will only collect information where it is necessary for us
          to do so and we will only collect information if it is relevant to our
          dealings with you. <br />
          <br />
          We will only keep your information for as long as we are either
          required to by law or as is relevant for the purposes for which it was
          collected.
          <br />
          <br /> You can visit the Site and browse without having to provide
          personal details. During your visit to the Site you remain anonymous
          and at no time can we identify you unless you have an account on the
          Site and log on with your user name and password. <br />
          <br />
          You may buy books offered online by us by completing the order form
          available on our website, and that all information you provide is
          accurate, complete and not misleading.
          <br />
          <br /> You agree to deal with us in good faith and in compliance with
          all applicable laws. We may cancel orders where we consider that you
          have not dealt with us in good faith.
          <br />
          <br /> To submit an order it’s necessary to register with our website,
          you will be able to make purchases from our online store. Once you
          submit an order, you cannot cancel it. All orders are subject to
          acceptance by us.
          <br />
          <br /> All prices are in Indian Rupees. Prices include delivery
          charges and customs duty and other taxes, if applicable. All prices
          are subject to change without prior notice. <br />
          <br />
          You acknowledge and agree that we are excused from performing our
          supply and other obligations and will not be responsible for any
          delays where and so long as we are prevented from performing our
          obligations under these Terms by events or causes beyond our
          reasonable control. We will endeavour to notify you of any delay and
          its expected duration. If we are prevented from performing our
          obligations for longer than a reasonable time, we may elect to cancel
          your order and issue you a credit in the amount paid for the order
          without further liability to you.
          <br />
          <br /> These terms (including any terms or policies incorporated by
          reference) set out the entire agreement between you and us concerning
          its subject matter and supersedes all prior communications.
        </div>
      </Wrapper>
    </Layout>
  );
};

export default PrivacyPolicy;
