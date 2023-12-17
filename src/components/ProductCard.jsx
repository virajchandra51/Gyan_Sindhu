import React from "react";
import { Link } from "react-router-dom";
import sampleProduct from "../../public/sampleProduct.jpeg";

const ProductCard = ({ product }) => {
  return (
    <Link
      href="/"
      className="transform overflow-hidden border-2 bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img width={500} height={500} alt="" src={sampleProduct} />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-bold">{product.item_name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-md font-semibold">
            Publisher - {product.publisher_name}
          </p>
          <>
            <p className="ml-auto text-base font-medium text-green-500">
              &#8377;{product.net_sale_rate}
            </p>
          </>
        </div>
        <p className="text-sm font-medium">Item Code - {product.item_code}</p>
        <p className="text-sm font-medium">Item Stock - {product.item_stock}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
