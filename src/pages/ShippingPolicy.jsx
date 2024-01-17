import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const ShippingPolicy = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shipping Policy
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        <ol className="text-md mt-5 mb-20 list-decimal">
          <li className="mb-8">
            Delivery Zones: We currently deliver to locations within the state
            of Karnataka. Additional regions may be added, and customers will be
            informed accordingly.
          </li>
          <li className="mb-8">
            Delivery Time: Estimated delivery times are specified during the
            checkout process. Delays due to unforeseen circumstances will be
            communicated promptly. You acknowledge and agree that we are excused
            from performing our supply and other obligations and will not be
            responsible for any delays where and so long as we are prevented
            from performing our obligations under these Terms by events or
            causes beyond our reasonable control. We will endeavour to notify
            you of any delay and its expected duration. If we are prevented from
            performing our obligations for longer than a reasonable time, we may
            elect to cancel your order and issue you a credit in the amount paid
            for the order without further liability to you Shipping Costs:
            Shipping costs are calculated based on the delivery location,
            weight, and dimensions of the products. The applicable charges are
            displayed during the checkout process.
          </li>
          <li className="mb-8">
            Delivery Partners: We work with reputable courier services to ensure
            reliable and timely deliveries. Tracking information will be
            provided once the order is dispatched.
          </li>
          <li className="mb-8">
            Undeliverable Addresses: Customers are responsible for providing
            accurate delivery information. If an address is deemed
            undeliverable, we will attempt to contact the customer for an
            alternative address. Failure to provide one may result in order
            cancellation.
          </li>
          <li className="mb-8">
            Delivery Confirmation: Orders will be considered delivered when
            confirmed by the designated courier service. Customers are advised
            to inspect packages upon receipt and report any discrepancies
            promptly.
          </li>
          <li className="mb-8">
            International Shipping: Currently, we do not offer international
            shipping. Only addresses within the Bengaluru and Varanasi are
            eligible for delivery.
          </li>
          <li className="mb-8">
            Shipping Policy Updates: This policy is subject to change. Any
            updates will be reflected on our website.
          </li>
          <li className="mb-8">
            Customer Support: For any shipping-related inquiries or assistance,
            customers can reach out to our customer support team at
            sales@skoolio.co.in
          </li>
        </ol>
      </Wrapper>
    </Layout>
  );
};

export default ShippingPolicy;
