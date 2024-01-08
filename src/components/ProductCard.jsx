import React from "react";
import { Link } from "react-router-dom";
import sampleProduct from "../assets/sampleProduct.webp";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={"/item"}
      state={{ product: product }}
      className="p-2 m-2 shadow transform overflow-hidden border-[1px] rounded-md bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <div className="h-[250px]">
        {product.photo_file_url === "" ||
        product.photo_file_url === null ||
        product.photo_file_url === undefined ? (
          <img width={500} height={500} alt="" src={sampleProduct} />
        ) : (
          <img
            className="object-contain max-h-[220px] w-full"
            alt=""
            src={product.photo_file_url}
          />
        )}
      </div>
      <hr className="h-2 w-full mt-4" />
      <div className="m-2 text-black/[0.9]">
        <h2 className="text-lg font-bold">{product.item_name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-md font-semibold">
            MRP : &#8377; {product.net_sale_rate}
          </p>
          <>
            <p className="ml-auto text-base font-medium text-green-500">
              {product.disc_percent}% off
            </p>
          </>
        </div>
        <p className="text-sm font-medium">Item Code - {product.item_code}</p>
        <p className="text-sm font-medium">
          Item Stock - {product.item_stock} {product.unit_name}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
