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
        "&ipaddress=0.0.0.0&pageno=1&pagelimit=100"
    );
    var price = 0.0;
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
            Products in {location.state.class_name} by{" "}
            {location.state.school_name}
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        <div className="my-14 px-5 md:px-16">
          {productList.length > 0 ? (
            productList.map((productListItem, index) => {
              return (
                <>
                  <div
                    className="text-4xl font-bold my-8 text-green"
                    key={index}
                  >
                    {productListItem.item_type}
                  </div>
                  {productListItem.data.map((product, index) => {
                    return (
                      <div key={index} className="w-[97%] ml-auto">
                        <h2 className="text-lg font-medium">
                          {index + 1}. {product.item_name}
                        </h2>
                        <div className="flex items-center text-black/[0.5]">
                          <p className="mr-2 text-lg font-semibold">
                            Publisher/Brand - {product.publisher_name}
                          </p>
                          <div className="ml-auto flex items-end">
                            <p className="mr-20">{product.quantity} {product.unit_name}</p>
                            <p className="text-xl font-medium text-green-500">
                              &#8377;{product.net_sale_rate}
                            </p>
                          </div>
                        </div>
                        <div className="h-[1px] bg-gray-200 my-4"></div>
                      </div>
                    );
                  })}
                </>
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
            <h3 className="text-4xl">
              &#8377; {price} x {qty} = &#8377; {totalPrice}
            </h3>
            <div className="flex justify-center items-center max-w-fit">
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
                  className="text-center px-[6px] py-[10px] max-w-[80px] border-x-2"
                />
                <button
                  className="text-center p-3 bg-gray-200 text-xl"
                  type="button"
                  onClick={handleInc}
                >
                  <BiPlus />
                </button>
              </div>
              <div
                className="w-[200px] ml-4 py-4 rounded-full bg-[var(--primary-c)] text-white text-lg text-center cursor-pointer font-medium transition-transform active:scale-95 my-3 hover:bg-[var(--secondary-c)]"
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
