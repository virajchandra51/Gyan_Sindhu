import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";
import { BiPlus, BiMinus } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useLayoutEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";

const ClassSchoolBooks = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const location = useLocation();

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

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

  useEffect(() => {
    setTotalPrice((qty * price).toFixed(2));
  }, [qty]);

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

  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "booklist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&schoolcode=" +
        `${location.state.school_code}` +
        "&classcode=" +
        `${location.state.class_code}` +
        "&ipaddress=" +
        `${global.ip_address}` +
        "&pageno=1&pagelimit=100"
    );
    var price = 0.0;
    // console.log(data);
    data.forEach((item) => {
      price += parseFloat(item.net_sale_rate);
    });
    data = Object.values(
      data.reduce((a, { item_type, ...props }) => {
        if (!a[item_type])
          a[item_type] = Object.assign({}, { item_type, data: [props] });
        else a[item_type].data.push(props);
        return a;
      }, {})
    );
    setProductList(data);
    setPrice(price.toFixed(2));
    setTotalPrice(qty * price.toFixed(2));
  };

  return (
    <Layout>
      <ToastContainer />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {location.state.class_name} - {location.state.school_name}
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        <div className="mb-14 md:px-16">
          {productList.length > 0 ? (
            productList.map((productListItem, index) => {
              return (
                <div key={index}>
                  <div className="text-4xl font-bold my-8 text-[var(--primary-c)]">
                    {productListItem.item_type}
                  </div>
                  {productListItem.data.map((product, index) => {
                    return (
                      <div key={index} className="w-[97%] ml-auto">
                        <div className="flex items-center justify-between text-black/[0.5]">
                          <div className="text-md md:text-lg w-[60%] md:w-[80%] font-bold text-black">
                            {index + 1}. {product.item_name}
                          </div>
                          <div className="md:w-[10%] text-left text-md">
                            {product.quantity} {product.unit_name}
                          </div>
                          <div className="text-md md:text-xl font-medium text-right text-green-500 md:w-[10%]">
                            &#8377;{product.net_sale_rate}
                          </div>
                        </div>
                        <div className="h-[1px] bg-gray-200 my-3"></div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <Skeleton
              containerClassName="w-screen flex-1 gap-4"
              count={10}
              height={20}
            />
          )}
          <div className="text-right my-10 flex flex-col items-end">
            <h2 className="text-xl font-bold">Price x Quantity = Total</h2>
            <h3 className="text-2xl md:text-4xl">
              &#8377; {price} x {qty} = &#8377; {totalPrice}
            </h3>
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="flex items-center w-1/2">
                <div className="flex items-center justify-center border-2 rounded-full">
                  <button
                    className="text-center py-[1.1rem] px-4 rounded-l-full bg-gray-200 text-xl"
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
                    className="text-center py-[1.1rem] px-4 rounded-r-full bg-gray-200 text-xl"
                    type="button"
                    onClick={handleInc}
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
              <div
                className="w-1/2 py-4 rounded-full bg-[var(--primary-c)] text-white text-lg text-center cursor-pointer font-medium transition-transform active:scale-95 hover:bg-[var(--secondary-c)]"
                onClick={() => {
                  notify();
                  dispatch(
                    addToCart({
                      data: productList,
                      selectedQuantity: qty,
                      oneQuantityPrice: price,
                      totalPrice: totalPrice,
                      school_code: location.state.school_code,
                      school_name: location.state.school_name,
                      class_code: location.state.class_code,
                      class_name: location.state.class_name,
                    })
                  );
                }}
              >
                Add to Cart
              </div>
            </div>
          </div>
        </div>
        {/* products grid end */}
      </Wrapper>
    </Layout>
  );
};

export default ClassSchoolBooks;
