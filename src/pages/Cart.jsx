import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import emptyCart from "../assets/empty-cart.jpg";
import CartItem from "../components/CartItem";
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from '../utils/constants'
import axios from "axios";
import useRazorpay from "react-razorpay";

const School = () => {
  const [Razorpay] = useRazorpay();
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    } else {
      alert("Razorpay SDK successfully loaded");
    }

    const instance = new Razorpay({
      key: 'rzp_test_aXmQn9w64q0Ubg',
      key_secret: 'QVQSYTLQcmGmAU7n4isz5yJK',
    });

    // console.log(instance);

    const options = {
      amount: 50000, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    // const response = await axios.post(
    //   'https://api.razorpay.com/v1/orders',
    //   options,
    //   {
    //     auth: {
    //       username: RAZORPAY_KEY_ID,
    //       password: RAZORPAY_SECRET,
    //     },

    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
    //     },
    //   },
    // );


    // const order = await instance.orders.create(options);
    // console.log(order);

    // if (!order) return res.status(500).send("Some error occured");

    // console.log(response.json());

    // creating a new order
    // const result = await axios.post("http://localhost:5000/payment/orders");

    // if (!result) {
    //   alert("Server error. Are you online?");
    //   return;
    // }

    // Getting the order details back
    // const { amount, id: order_id, currency } = result.data;

    // const options = {
    //   key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
    //   amount: amount.toString(),
    //   currency: currency,
    //   name: "Soumya Corp.",
    //   description: "Test Transaction",
    //   image: { logo },
    //   order_id: order_id,
    //   handler: async function (response) {
    //     const data = {
    //       orderCreationId: order_id,
    //       razorpayPaymentId: response.razorpay_payment_id,
    //       razorpayOrderId: response.razorpay_order_id,
    //       razorpaySignature: response.razorpay_signature,
    //     };

    //     const result = await axios.post(
    //       "http://localhost:5000/payment/success",
    //       data
    //     );

    //     alert(result.data.msg);
    //   },
    //   prefill: {
    //     name: "Soumya Dey",
    //     email: "SoumyaDey@example.com",
    //     contact: "9999999999",
    //   },
    //   notes: {
    //     address: "Soumya Dey Corporate Office",
    //   },
    //   theme: {
    //     color: "#61dafb",
    //   },
    // };

    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();
  }
  const { cartItems } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    var v = 0.0;
    cartItems.forEach((item) => {
      v += parseFloat(item.totalPrice, 2);
    });
    setSubTotal(v.toFixed(2));
  }, [cartItems]);
  console.log(cartItems);
  return (
    <Layout>
      <div className="w-full md:py-20">
        <Wrapper>
          {cartItems.length > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  Shopping Cart
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* CART ITEMS START */}
                <div className="flex-[2]">
                  <div className="text-lg font-bold">Cart Items</div>
                  {cartItems.map((item, index) => {
                    return <CartItem key={index} data={item} />;
                  })}
                </div>
                {/* CART ITEMS END */}

                {/* SUMMARY START */}
                <div className="flex-[1]">
                  <div className="text-lg font-bold">Summary</div>

                  <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                    <div className="flex justify-between">
                      <div className="uppercase text-md md:text-lg font-medium text-black">
                        Subtotal
                      </div>
                      <div className="text-md md:text-lg font-medium text-black">
                        &#8377;{subTotal}
                      </div>
                    </div>
                    <div className="text-sm md:text-md py-5 border-t mt-5">
                      The subtotal reflects the total price of your order,
                      including duties and taxes, before any applicable
                      discounts. It does not include delivery costs and
                      international transaction fees.
                    </div>
                  </div>

                  {/* BUTTON START */}
                  <button
                    className="w-full py-4 rounded-full bg-[var(--primary-c)] text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                    onClick={displayRazorpay}
                  >
                    Checkout
                    {/* {loading && <img src="/spinner.svg" />} */}
                  </button>
                  {/* BUTTON END */}
                </div>
                {/* SUMMARY END */}
              </div>
              {/* CART CONTENT END */}
            </>
          )}

          {/* This is empty screen */}
          {cartItems.length < 1 && (
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
              <img
                src={emptyCart}
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
              />
              <span className="text-xl font-bold">Your cart is empty</span>
              <span className="text-center mt-4">
                Looks like you have not added anything in your cart.
                <br />
                Go ahead and explore top categories.
              </span>
              <Link
                to="/"
                className="py-4 px-8 rounded-full bg-[var(--primary-c)] text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:bg-[var(--secondary-c)] mt-8"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </Wrapper>
      </div>
    </Layout>
  );
};

export default School;
