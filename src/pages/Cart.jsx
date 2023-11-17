import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import emptyCart from '../assets/empty-cart.jpg'

const School = () => {
  const global = useSelector((state) => state.global);
  const [cityCode, setCityCode] = useState(0);
  const [schoolName, setSchoolName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityList, setCityList] = useState({
    data: [],
    loading: true,
  });
  const [data, setData] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, [cityCode, schoolName]);
  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "/api/schoollist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
        `${global.branch_id}` +
        "&citycode=" +
        `${cityCode}` +
        "&schoolname=" +
        `${schoolName}` +
        "&ipaddress=0.0.0.0&pageno=1&pagelimit=1000"
    );
    setData({ data: data, loading: false });
    data = await fetchDataFromApi(
      "/api/selectionlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=city&ipaddress=0.0.0.0"
    );
    var options = [];
    data.forEach((item) => {
      var ob = {};
      ob.label = item.city_name;
      ob.value = item.city_code;
      options.push(ob);
    });
    setCityList({ data: options, loading: false });
  };

  const handleChangeCity = (selectedOption) => {
    if (selectedOption === null) {
      setCityCode(0);
      setCityName("");
      return;
    }
    setCityCode(selectedOption.value);
  };
  const cartItems = [];

  const handleChangeSchool = (event) => {
    setSchoolName(event.target.value);
  };
  console.log(schoolName);
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
                                <div className="text-lg font-bold">
                                    Cart Items
                                </div>
                                {cartItems.map((item) => (
                                    {/* <CartItem key={item.id} data={item} /> */}
                                ))}
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
                                        The subtotal reflects the total price of
                                        your order, including duties and taxes,
                                        before any applicable discounts. It does
                                        not include delivery costs and
                                        international transaction fees.
                                    </div>
                                </div>

                                {/* BUTTON START */}
                                <button
                                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                                    // onClick={handlePayment}
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
                        <span className="text-xl font-bold">
                            Your cart is empty
                        </span>
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
