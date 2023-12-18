import React from "react";
import Wrapper from "../components/Wrapper";
import { Link, useLocation } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";
import { useState } from "react";

import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sampleProduct from "../../public/sampleProduct.jpeg";

const Item = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <Layout>
      <ToastContainer />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            About Us
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            {location.state.product.photo_file_url === "" ||
            location.state.product.photo_file_url === null ||
            location.state.product.photo_file_url === undefined ? (
              <img width={500} height={500} alt="" src={sampleProduct} />
            ) : (
              <img
                className="object-contain h-[250px] w-full"
                alt=""
                src={location.state.product.photo_file_url}
              />
            )}
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {location.state.product.item_name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">
              Publisher - {location.state.product.publisher_name}
            </div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377; {location.state.product.net_sale_rate}
              </p>
              {true && (
                <>
                  <p className="text-base  font-medium line-through">
                    &#8377;30
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {/* {getDiscountedPricePercentage(p.original_price, p.price)}% */}
                    5% off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* ADD TO CART BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-[var(--primary-c)] text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:bg-[var(--secondary-c)]"
              onClick={() => {
                // dispatch(
                //   addToCart({
                //     ...product?.data?.[0],
                //     selectedSize,
                //     oneQuantityPrice: p.price,
                //   })
                // );
                notify();
              }}
            >
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                {/* <ReactMarkdown>{p.description}</ReactMarkdown> */}
                <p>Hello</p>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Item;
