import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Layout from "../Layout";
import { useLocation } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Success = () => {
  const location = useLocation();
  return (
    <Layout>
      <div className="min-h-[650px] flex items-center">
        <Wrapper>
          <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
            <div className="text-2xl font-bold">
              Thanks for shopping with us!
            </div>
            <div className="text-lg font-bold mt-2">
              Your order has been placed successfully.
            </div>
            <div className="text-lg font-bold mt-2">
              Your order id is
              <BsFillPatchCheckFill />
            </div>
            <div className="text-base mt-5">
              For any query regarding your order, {" "}
              <Link to={"/contactus"} className="underline">
                contact us.
              </Link>
            </div>
            <Link to="/" className="font-bold mt-5">
              Continue Shopping
            </Link>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default Success;
