import React from "react";
import Wrapper from "../components/Wrapper";
import ProductCard from "../components/ProductCard";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CategoryBooks = () => {
  const global = useSelector((state) => state.global);
  const location = useLocation();
  console.log(location.state);

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetchData();
  }, [location.state.category.item_gr_code, global.branch_id]);
  const fetchData = async () => {
    const data = await fetchDataFromApi("itemlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&groupcode=" +
        `${location.state.category.item_gr_code}` +
        "&ipaddress=0.0.0.0&pageno=2&pagelimit=10"
    );
    console.log(data);
    setProductList(data);
  };

  console.log(productList);

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {location.state.category.item_gr_name}
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {productList.length>0 ? productList.map((product) => (
            <ProductCard key={product?.id} product={product} />
          )): <Skeleton containerClassName="flex-1 w-screen gap-4" count={10} height={20}/>}
        </div>
        {/* products grid end */}
      </Wrapper>
    </Layout>
  );
};

export default CategoryBooks;
