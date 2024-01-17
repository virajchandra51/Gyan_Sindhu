import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const OrderPolicy = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Order Policy
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        <ol className="text-md mt-5 mb-20 list-decimal">
          <li className="mb-8">
            As soon as an order is authorized for payment, you will receive
            e-mail / massage confirmation for the same. This will indicate your
            order no, which you can refer later for checking the online status
            of your order. Even if an order is confirmed, the price of the
            product might change if the supplier/publisher decides to change the
            MRP of the product. In such cases, "Skoolio" A Unit of Gyan Sindhu,
            shall not be liable and the customer will have to bear the
            difference in price. For Orders which have more than 10 product
            quantities, shipping charges might be applicable on case to case
            basis on the sole discretion of "Skoolio" A Unit of Gyan Sindhu,
            management. In such cases, customers will be called and informed
            about the same. In case of cancellation and refund due to error from
            the customer, the customer will be charged upto 7% on Debit Card/Net
            Banking transactions and upto 15% on Credit card transactions off
            the total order value. Orders that weigh more than 10 kgs, delivery
            shall be made by Surface Mode, where Customer will have to go to the
            depot and collect the parcel. Prior information of the same will be
            informed to the customer.
          </li>
          <li className="mb-8">
            Sale Policy: When your order is placed, we'll send you an e-mail
            message acknowledging receipt of your order. If you choose to pay
            using an electronic payment method (credit card, debit card or net
            banking), you will be directed to your bank's website to complete
            your payment. Your contract to purchase an item will not be complete
            until we receive your electronic payment and dispatch your item. If
            you choose to pay using Pay on Delivery (POD), you can pay using
            cash/card/net banking when you receive your item.
          </li>
        </ol>
      </Wrapper>
    </Layout>
  );
};

export default OrderPolicy;
