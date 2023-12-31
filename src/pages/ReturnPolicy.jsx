import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const ReturnPolicy = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Return Policy
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="text-lg mb-10">
          Returning of defective / damaged item, if you receive a damaged or a
          defective item please return the same without any hesitation to us in
          a proper package. Kindly enclose a note stating the reason for the
          returns. Also state your order no & send it to us via a trusted
          courier or mail. As soon as we receive the defective item we will send
          you a fresh replacement. In case of non-availability of the item we
          will refund the amount to your respective account. This facility is
          only for goods bought from us. Return of any defective / damage item
          should be done within 7 days from the date of the receipt of the
          shipment to our working office:
        </div>
        <div className="text-2xl font-extrabold mt-5">
          Our Bengaluru Address:
        </div>
        <div className="text-base mt-2">Gyan Sindhu</div>
        <div className="text-base">137, 2nd Cross Road,</div>
        <div className="text-base">Amarjyoti Layout</div>
        <div className="text-base">Bangalore – 560071</div>
        <div className="text-2xl font-extrabold mt-5">
          Our Varanasi Address:
        </div>
        <div className="text-base mt-2">Gyan Sindhu</div>
        <div className="text-base">No. 44, Chandrika Nagar Colony,</div>
        <div className="text-base">Sigra, Varanasi - 221010</div>
        <div className="text-3xl font-extrabold mt-16">Please Make Note:</div>
        <div className="text-base mt-5 mb-20">
          The return courier charges incurred by you will be refunded by us into
          your account. The maximum courier refund amount we can credit into
          your account in Rs 100/-. Hence, please choose the right courier
          service for returning the product. Customers can only return products
          purchased in Skoolio online outlet, any product purchased through our
          retail outlet will be returned only in the retail outlet not on
          Skoolio online. Also make note that no product bought online is liable
          for an exchange at Skoolio/ Gyan Sindhu’s retail outlets.
        </div>
      </Wrapper>
    </Layout>
  );
};

export default ReturnPolicy;
