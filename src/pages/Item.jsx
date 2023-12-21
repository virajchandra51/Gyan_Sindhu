import React from "react";
import Wrapper from "../components/Wrapper";
import { Link, useLocation } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sampleProduct from "../../public/sampleProduct.jpeg";
import { fetchDataFromApi } from "../utils/api";

const Item = () => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [ISBN, setISBN] = useState({ data: [], loading: true });

  useEffect(() => {
    setTotalPrice((qty * price).toFixed(2));
  }, [qty]);

  useEffect(() => {
    if (location.state.product.isbn_code) fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "barcode",
      "type=isbn&text=" +
        `${location.state.product.isbn_code}` +
        "&ipaddress=0.0.0.0"
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
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] mb-12">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] flex justify-center items-center mx-auto lg:mx-0">
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
            <div className="flex mt-8 items-center">
              <p className="mr-2 mb-4 text-xl font-extrabold text-[var(--primary-c)]">
                MRP : &#8377; {location.state.product.net_sale_rate}
              </p>
              {true && (
                <>
                  <p className="ml-auto mb-4 text-base font-medium text-green-500">
                    {/* {getDiscountedPricePercentage(p.original_price, p.price)}% */}
                    {location.state.product.disc_percent}% off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-8">
              {`(Also includes all applicable duties)`}
            </div>

            {!ISBN.loading && ISBN.data?.image_file_url && <img src={ISBN.data?.image_file_url} className="w-[300px] mb-12"/>}

            <div>
              <div className="text-2xl font-bold mb-5">Product Details</div>
              <div className="text-md mb-5">
                {location.state.product.publisher_name && (
                  <p>
                    <b>Publisher :</b> {location.state.product.publisher_name}
                  </p>
                )}
                {location.state.product.subject_name && (
                  <p>
                    <b>Subject :</b> {location.state.product.subject_name}
                  </p>
                )}
                {location.state.product.writer_name && (
                  <p>
                    <b>Writer :</b> {location.state.product.writer_name}
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

            <div className="flex md:flex-row flex-col items-center gap-4 my-12">
              <div className="flex items-center">
                <h1 className="font-bold">Qty: </h1>
                <div className="ml-4 flex items-center justify-center border-2">
                  <button
                    className="text-center p-3 bg-gray-200 text-xl"
                    type="button"
                    onClick={handleDec}
                  >
                    <BiMinus />
                  </button>
                  <input
                    type="text"
                    name="qty"
                    value={qty}
                    className="text-center px-[6px] py-[10px] w-full md:w-[80px] border-x-2"
                  />
                  <button
                    className="text-center p-3 bg-gray-200 text-xl"
                    type="button"
                    onClick={handleInc}
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
              {/* ADD TO CART BUTTON START */}
              <button
                className="w-full py-4 rounded-full bg-[var(--primary-c)] text-white text-lg font-medium transition-transform active:scale-95 hover:bg-[var(--secondary-c)]"
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
