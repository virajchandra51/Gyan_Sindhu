import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi, fetchDataFromApiWithResponse } from "../utils/api";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import emptyCartPic from "../assets/empty-cart.webp";
import CartItem from "../components/CartItem";
import { RAZORPAY_KEY_ID } from "../utils/constants";
import logo from "../assets/logo3.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLayoutEffect } from "react";

const School = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (localStorage.getItem("UserData") === null) {
      var data = {
        member_id: "-1",
        person_name: "",
        salutation: "",
      };
      setUserData(data);
    } else {
      setUserData(JSON.parse(localStorage.getItem("UserData")));
    }
  }, []);

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

  const [data, setData] = useState({
    data: [],
    loading: true,
  });

  const { cartItems } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    var v = 0.0;
    cartItems.forEach((item) => {
      v += parseFloat(item.totalPrice, 2);
    });
    setSubTotal(v.toFixed(2));
  }, [cartItems]);
  // console.log(cartItems);

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Checkout failed to load. Are you online?", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (userData.member_id === "-1") {
      toast.error("Please Login to Skoolio in order to checkout!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const data = await fetchDataFromApi(
      "orderinitiate",
      "compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&membercode=" +
        `${userData.member_id}` +
        "&schoolcode=" +
        `${cartItems[0].school_code}` +
        "&classcode=" +
        `${cartItems[0].class_code}` +
        "&amount=" +
        `${subTotal}` +
        "&grandamount=" +
        `${subTotal}` +
        "&gateway=razorpay&ipaddress=" +
        `${global.ip_address}`
    );

    setData({ data: data, loading: false });

    const options = {
      key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: subTotal,
      currency: "INR",
      name: "A unit of Gyan Sindhu",
      description: "Test Transaction",
      image: logo,
      order_id: data[0].online_order_no,
      // callback_url: "/success",
      // redirect: true,
      handler: async (response) => {
        dispatch(emptyCart());
        // console.log("succeeded");
        // console.log(response);

        const cartItemsPost = { cart_items: [] };

        cartItems.forEach((cartItem, index) => {
          const currentSetQuantity = cartItem.quantity;
          cartItem.data.forEach((cartItemSub, index) => {
            cartItemSub.data.forEach((item, index) => {
              var obj = {
                item_code: item.item_code,
                net_sale_rate: item.net_sale_rate,
                item_stock: item.item_stock,
                cart_quantity: item.quantity * currentSetQuantity,
              };
              cartItemsPost.cart_items.push(obj);
            });
          });
        });
        const orderData = await fetchDataFromApiWithResponse(
          cartItemsPost,
          "orderfinalise",
          "compid=" +
            `${global.company_id}` +
            "&branchid=" +
            `${global.branch_id}` +
            "&vno=" +
            `${data[0].vno}` +
            "&paymentid=" +
            `${response.razorpay_payment_id}` +
            "&ipaddress=" +
            `${global.ip_address}`
        );

        // console.log(orderData);
        if (orderData[0].success_status === "1") {
          const date = new Date();
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          let currentDate = `${day}-${month}-${year}`;

          var emailData =
            "<p>Dear <strong>" +
            `${userData.member_name}` +
            "</strong>,</p><p>Thank you for placing your valuable order with us as per the following details -</p><ul><li><strong>Date</strong>: " +
            `${currentDate}` +
            "</li><li><strong>Order Id</strong>: " +
            `${response.razorpay_order_id}` +
            "</li><li><strong>Amount</strong>: " +
            `${subTotal}` +
            "</li><li><strong>Product</strong>: " +
            `${cartItems[0].school_name}` +
            " - " +
            `${cartItems[0].class_name}` +
            '</li></ul><p>Your order will be delivered soon.</p><p>Best wishes,<br>Skoolio Team.</p><p>Website: <a href="https://skoolio.co.in" target="_blank">www.skoolio.co.in</a></p>';
          fetch(
            "https://publisher.faonline.in/FAWebEComm/api/sendemail/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&servername=smtpout.secureserver.net&port=465&username=sales@skoolio.co.in&password=skoolio@5921&subject=Your Order At Skoolio&sendername=SKOOLIO&mailto=" +
              `${userData.email_id}` +
              "&ipaddress=" +
              `${global.ip_address}`,
            {
              method: "POST",
              body: emailData,
            }
          ).then((response) => {
            console.log(response);
          });

          var url;
          if (
            userData.mobile_no2 == undefined ||
            userData.mobile_no2.length == 0 ||
            userData.mobile_no2 == null
          ) {
            url =
              "http://secure.onlinesms.in/v7/api/sms_api.php?api_key=03cb220e70982223955eb6ec20da0a59&msg=Dear Member, %0D%0A%0D%0AThank you for placing your valuable order with us. %0D%0A%0D%0AOrder Id: " +
              `${response.razorpay_order_id}` +
              " , %0D%0AAmount: " +
              `${subTotal}` +
              " , %0D%0Awill be delivered soon. %0D%0A%0D%0ABest wishes, %0D%0ASkoolio Team. %0D%0A%0D%0Awww.skoolio.co.in %0D%0AGyan Sindhu&senderid=GSINDU&mobnum=" +
              `${userData.mobile_no1}` +
              "&route_id=3&entity_id=1701170435850383099&template_id=1707170453801307016";
          } else {
            url =
              "http://secure.onlinesms.in/v7/api/sms_api.php?api_key=03cb220e70982223955eb6ec20da0a59&msg=Dear Member, %0D%0A%0D%0AThank you for placing your valuable order with us. %0D%0A%0D%0AOrder Id: " +
              `${response.razorpay_order_id}` +
              " , %0D%0AAmount: " +
              `${subTotal}` +
              " , %0D%0Awill be delivered soon. %0D%0A%0D%0ABest wishes, %0D%0ASkoolio Team. %0D%0A%0D%0Awww.skoolio.co.in %0D%0AGyan Sindhu&senderid=GSINDU&mobnum=" +
              `${userData.mobile_no1}` +
              "," +
              `${userData.mobile_no2}` +
              "&route_id=3&entity_id=1701170435850383099&template_id=1707170453801307016";
          }
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(response);
            });

          navigate("/success", {
            state: { order_id: response.razorpay_order_id },
          });
        } else {
          navigate("/failed", {
            state: { order_id: response.razorpay_order_id },
          });
        }
      },
      prefill: {
        name: `${userData.salutation} ${userData.member_name}`,
        email: "olclko@gmail.com",
        contact: "9839076719",
      },
      notes: {
        address: "Lucknow",
      },
      theme: {
        color: "#000",
      },
      timeout: 300,
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <Layout>
      <div className="w-full md:py-20">
        <ToastContainer />
        <Wrapper>
          {cartItems.length > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-2 font-semibold leading-tight">
                  Shopping Cart
                </div>
                <div className="text-lg mb-4">
                  Ordering Branch - {global.branch_name}
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
                    className="w-full py-4 rounded-full bg-[var(--primary-c)] text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:bg-[var(--secondary-c)] flex items-center gap-2 justify-center"
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
                src={emptyCartPic}
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
