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
        <ol className="text-md mt-5 mb-20">
          <li className="mb-8">
            <div className="text-lg font-bold">1. Delivery Zones:</div>
            <div>
              We currently deliver to locations within the state of Karnataka.
              Additional regions may be added, and customers will be informed
              accordingly.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">2. Delivery Time:</div>
            <div>
              Orders are shipped and delivered through registered courier
              companies and/or speed post/ self only. Orders are delivered
              within 10 Working days of order date or as per the delivery date
              agreed at the time of order confirmation. The delivery of the
              shipment is subject to Courier Company / post office norms.
              “Skoolio A Unit of Gyan Sindhu” is not liable for any delay in
              delivery by the Courier Company / postal authorities. Delivery of
              all orders will be to registered address of the buyer as per the
              credit/debit card only at all times (Unless specified at the time
              of Order). Once the product is shipped, the shipment or courier
              tracking number will be emailed or communicated to the customer as
              early as possible. We require a signature for any goods delivered,
              at which point responsibility for your purchased goods passes to
              you.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">3. Shipping Costs:</div>
            <div>
              Shipping costs are calculated based on the delivery location,
              weight, and dimensions of the products. The applicable charges are
              displayed during the checkout process.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">4. Delivery Partners:</div>
            <div>
              We work with reputable courier services to ensure reliable and
              timely deliveries. Tracking information will be provided once the
              order is dispatched.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">5. Undeliverable Addresses:</div>
            <div>
              Customers are responsible for providing accurate delivery
              information. If an address is deemed undeliverable, we will
              attempt to contact the customer for an alternative address.
              Failure to provide one may result in order cancellation.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">6. Delivery Confirmation:</div>
            <div>
              Orders will be considered delivered when confirmed by the
              designated courier service. Customers are advised to inspect
              packages upon receipt and report any discrepancies promptly.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">7. International Shipping:</div>
            <div>
              Currently, we do not offer international shipping. Only addresses
              within the Bengaluru and Varanasi are eligible for delivery.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">8. Shipping Policy Updates:</div>
            <div>
              This policy is subject to change. Any updates will be reflected on
              our website.
            </div>
          </li>
          <li className="mb-8">
            <div className="text-lg font-bold">9. Customer Support:</div>
            <div>
              For any shipping-related inquiries or assistance, customers can
              reach out to our customer support team at sales@skoolio.co.in
            </div>
          </li>
        </ol>
      </Wrapper>
    </Layout>
  );
};

export default ShippingPolicy;
