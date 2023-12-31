import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const Failed = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Layout>
      <div className="min-h-[650px] flex items-center">
        <Wrapper>
          <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
            <div className="text-2xl font-bold">Payment failed!</div>
            <div className="text-base mt-5">
              For any product related query, drop an email to
            </div>
            <a href="mailto:md@gyansindhu.com" className="underline">
              md@gyansindhu.com
            </a>
            <Link to="/" className="font-bold mt-5">
              Continue Shopping
            </Link>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default Failed;
