import React from "react";
import Wrapper from "../components/Wrapper";
import { Link, useLocation } from "react-router-dom";
import Layout from "../Layout";
import { useState, useEffect } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sampleProduct from "../assets/sampleProduct.webp";
import { fetchDataFromApi } from "../utils/api";

const Item = () => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const global = useSelector((state) => state.global);

  const [ISBN, setISBN] = useState({ data: [], loading: true });

  useEffect(() => {
    setTotalPrice((qty * price).toFixed(2));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state.product.isbn_code) fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "barcode",
      "type=isbn&text=" +
        `${location.state.product.isbn_code}` +
        "&ipaddress=" +
        `${global.ip_address}`
    );
    setISBN({ data: data[0], loading: false });
  };

  function handleInc() {
    if (qty < 10) {
      setQty((prevQty) => (prevQty = prevQty + 1));
    } else {
      toast.info("Maximum Quantity Reached!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    e;
  }
  function handleDec() {
    if (qty > 1) {
      setQty((prevQty) => (prevQty = prevQty - 1));
    } else {
      toast.info("Minimum Quantity Reached!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const location = useLocation();
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

  console.log(location.state.product);

  return (
    <Layout>
      <ToastContainer />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Product
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[80px] mb-12">
          {/* left column start */}
          <div className="w-full md:w-auto border-2 flex-[1.5] max-w-[500px] flex justify-center items-center mx-auto lg:mx-0">
            {location.state.product.photo_file_url === "" ||
            location.state.product.photo_file_url === null ||
            location.state.product.photo_file_url === undefined ? (
              <img width={250} height={250} alt="" src={sampleProduct} />
            ) : (
              <img
                className="object-contain h-[500px] w-full"
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
            {/* <div className="text-lg font-semibold mb-5">
              Publisher - {location.state.product.publisher_name}
            </div> */}

            {/* PRODUCT PRICE */}
            {parseFloat(location.state.product.net_sale_rate) !==
            parseFloat(location.state.product.mrp) ? (
              <div className="flex mt-8 items-start flex-col">
                <div className="flex justify-between w-full">
                  <p className="mr-2 mb-2 text-xl font-extrabold text-[var(--primary-c)]">
                    MRP : &#8377; {location.state.product.mrp}
                  </p>
                  <p className="text-base font-medium text-green-500">
                    {(
                      ((location.state.product.mrp -
                        location.state.product.net_sale_rate) /
                        location.state.product.mrp) *
                      100
                    ).toFixed(2)}
                    % off
                  </p>
                </div>
                <p className="mr-2 mb-2 text-xl font-extrabold text-[var(--primary-c)]">
                  Sale Rate : &#8377; {location.state.product.net_sale_rate}
                </p>
              </div>
            ) : (
              <div className="flex mt-8 items-start flex-col">
                <p className="mr-2 mb-2 text-xl font-extrabold text-[var(--primary-c)]">
                  Sale Rate : &#8377; {location.state.product.net_sale_rate}
                </p>
              </div>
            )}

            <div className="text-md font-medium text-black/[0.5] mb-8">
              (Inclusive of All Taxes)
            </div>

            {!ISBN.loading && ISBN.data?.image_file_url && (
              <img
                src={ISBN.data?.image_file_url}
                className="w-[300px] mb-12"
              />
            )}

            <div>
              <div className="text-2xl font-bold mb-5">Product Details</div>
              <div className="text-md mb-5">
                {location.state.product.publisher_name && (
                  <p>
                    <b>Publication :</b> {location.state.product.publisher_name}
                  </p>
                )}
                {location.state.product.subject_name && (
                  <p>
                    <b>Subject :</b> {location.state.product.subject_name}
                  </p>
                )}
                {location.state.product.writer_name && (
                  <p>
                    <b>Author :</b> {location.state.product.writer_name}
                  </p>
                )}
                {location.state.product.edition_no && (
                  <p>
                    <b>Edition No. :</b> {location.state.product.edition_no}
                  </p>
                )}
                {location.state.product.item_type && (
                  <p>
                    <b>Item Type :</b> {location.state.product.item_type}
                  </p>
                )}
                {location.state.product.item_code && (
                  <p>
                    <b>Item Code :</b> {location.state.product.item_code}
                  </p>
                )}
                {location.state.product.item_stock && (
                  <p>
                    <b>Item Stock :</b> {location.state.product.item_stock}{" "}
                    {location.state.product.unit_name}
                  </p>
                )}
                {location.state.product.mrp && (
                  <p>
                    <b>MRP : &#8377;</b> {location.state.product.mrp}
                  </p>
                )}
                {location.state.product.sale_rate && (
                  <p>
                    <b>Sale Rate : &#8377;</b>{" "}
                    {location.state.product.sale_rate}
                  </p>
                )}
                {location.state.product.tax_percent && (
                  <p>
                    <b>Tax Percent :</b> {location.state.product.tax_percent}%
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-12">
              <div className="flex items-center w-1/2">
                <div className="flex items-center justify-center border-[1px] rounded-full">
                  <button
                    className="text-center py-[1.1rem] px-4 bg-gray-200 text-xl rounded-l-full"
                    type="button"
                    onClick={handleDec}
                  >
                    <BiMinus />
                  </button>
                  <input
                    type="text"
                    name="qty"
                    value={qty}
                    className="text-center p-[14px] w-full"
                  />
                  <button
                    className="text-center p-[1.1rem] px-4 bg-gray-200 text-xl rounded-r-full"
                    type="button"
                    onClick={handleInc}
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
              {/* ADD TO CART BUTTON START */}
              <button
                className="w-1/2 py-4 rounded-full bg-[var(--primary-c)] text-white text-lg font-medium transition-transform active:scale-95 hover:bg-[var(--secondary-c)]"
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
            </div>
          </div>
          {/* right column end */}
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Item;
