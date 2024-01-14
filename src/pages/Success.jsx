import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Layout from "../Layout";
import { useLocation } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const Success = () => {
  const location = useLocation();
  return (
    <Layout>
      <div className="min-h-[650px] flex items-center">
        <Wrapper>
          <div className="max-w-[600px] my-8 mt-16 rounded-lg p-5 mx-auto flex flex-col">
            <div className="text-2xl font-bold flex items-center">
              <MdVerified size={40} className="mr-2 fill-green-700" /> Thank
              you, {location.state.name}!
            </div>
            <div className="text-lg  mt-2">
              Your order has been placed successfully.
            </div>
            <div className="text-lg font-bold mt-2">Order Id {location.state.order_id}</div>
          </div>
          <div className="max-w-[600px] my-8 rounded-lg p-5 border border-black mx-auto flex flex-col">
            <div className="text-2xl font-bold">Order Details</div>
            <div className="text-lg font-bold mt-4">Contact Information</div>
            <div className="text-md font-medium">
              {location.state.email_id} <br /> {location.state.mobile}
            </div>
            <div className="text-lg font-bold mt-4">Shipping Address</div>
            <div className="text-md font-medium">
              C-1186, Indira Nagar, Lucknow - 226016
            </div>
            <div className="text-lg font-bold mt-4">Product Details</div>
            <div className="text-md font-medium">
              {location.state.school_name} - {location.state.class_name} <br /> Quantity ordered is 5
            </div>
            <div className="text-lg font-bold mt-4">Payment Details</div>
            <div className="text-md font-medium">Amount - &#8377;{location.state.amount}</div>
            <div className="text-md font-medium">Date - {location.state.date}</div>
          </div>
          <div className="max-w-[600px] my-8 mb-16 rounded-lg p-5 border border-black mx-auto flex flex-col">
            <div className="text-lg font-medium mt-2">
              For any query regarding your order, {" "}
              <Link to={"/contactus"} className="underline font-bold">
                Contact Us
              </Link>
            </div>
            <Link to="/" className="font-bold text-xl mt-5 underline">
              Continue Shopping
            </Link>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default Success;
