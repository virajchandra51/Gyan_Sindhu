import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { BiPlus, BiMinus } from "react-icons/bi";
import dummy from "../../public/sampleProduct.jpeg";
import { SimpleDialogContainer, simpleConfirm } from "react-simple-dialogs";

const CartItem = ({ data }) => {
  // const p = data.attributes;
  const dispatch = useDispatch();
  // const updateCartItem = (e, key) => {
  //   let payload = {
  //     key,
  //     val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
  //     id: data.id,
  //   };
  //   dispatch(updateCart(payload));
  // };
  const showConfirmationDelete = async () => {
    if (
      await simpleConfirm(
        "Are you sure you wish to remove this product from your cart?"
      )
    ) {
      dispatch(
        removeFromCart({
          school_code: data.school_code,
          class_code: data.class_code,
        })
      );
      console.log("Confirmed! 😄");
    } else {
      console.log("Not confirmed. 🥲");
    }
  };
  console.log(data);

  function handleInc(data) {
    let payload = {
      key: "quantity",
      quantity: data.quantity+1,
      school_code: data.school_code,
      class_code: data.class_code,
    };
    dispatch(updateCart(payload));
  }

  function handleDec() {}

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={dummy} alt="" width={120} height={120} />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            Products in {data.class_name} by {data.school_name}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            hehe
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377; {data.totalPrice}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          Yo
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center border-2">
                <button
                  className="text-center p-[10px] bg-gray-200 text-xl"
                  type="button"
                  onClick={() => handleDec(data)}
                >
                  <BiMinus />
                </button>
                <input
                  type="text"
                  name="qty"
                  value={data.quantity}
                  className="text-center px-[6px] py-[10px] max-w-[80px] border-x-2"
                />
                <button
                  className="text-center p-[10px] bg-gray-200 text-xl"
                  type="button"
                  onClick={() => handleInc(data)}
                >
                  <BiPlus />
                </button>
              </div>
              {/* <div className="font-semibold">Qty: {data.quantity}</div> */}
              {/* <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select> */}
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => showConfirmationDelete()}
            className="cursor-pointer text-red-500 hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
      <SimpleDialogContainer />
    </div>
  );
};

export default CartItem;
