import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux";

const Result = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const global = useSelector((state) => state.global);
  const location = useLocation();

  const [searchResult, setSearchResult] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, [location.state.search]);

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "itemlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&groupcode=0&itemname=" +
        `${location.state.search}` +
        "&ipaddress=0.0.0.0&pageno=1&pagelimit=1000"
    );
    setSearchResult({ data: data, loading: false });
  };

  console.log(searchResult);

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Search Results for "{location.state.search}"
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}
        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {searchResult.data.length>0 ? searchResult.data.map((product) => (
            <ProductCard key={product?.id} product={product} />
          )): <Skeleton containerClassName="flex-1 w-screen gap-4" count={10} height={20}/>}
        </div>
        {/* products grid end */}
      </Wrapper>
    </Layout>
  );
};

export default Result;
