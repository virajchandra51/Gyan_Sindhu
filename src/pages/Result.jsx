import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { paginationValue } from "../utils/constants";
import PaginationLeft from "../components/PaginationLeft";
import PaginationRight from "../components/PaginationRight";

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

  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setPageNo(1);
  }, [location.state?.search]);

  const [pageno, setPageNo] = useState(location.state.pageno);
  const [pageCount, setPageCount] = useState(-1);

  //pagination logic starts

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  //pagination logic ends

  console.log(pageno);
  console.log(searchResult.data[0]);

  useEffect(() => {
    fetchData();
  }, [location.state?.search, pageno]);

  const fetchData = async () => {
    var url = "compid=9&branchid=" + `${global.branch_id}`;
    if (location.state.sellType) {
      if (location.state.sellType === "publisher")
        url +=
          "&publishername=" +
          `${location.state?.name}` +
          "&ipaddress=0.0.0.0&pageno=" +
          `${pageno}` +
          "&pagelimit=" +
          `${paginationValue}`;
      else if (location.state.sellType === "subject")
        url +=
          "&subjectname=" +
          `${location.state?.name}` +
          "&ipaddress=0.0.0.0&pageno=" +
          `${pageno}` +
          "&pagelimit=" +
          `${paginationValue}`;
      else if (location.state.sellType === "writer")
        url +=
          "&writername=" +
          `${location.state?.name}` +
          "&ipaddress=0.0.0.0&pageno=" +
          `${pageno}` +
          "&pagelimit=" +
          `${paginationValue}`;
    } else {
      url +=
        "&itemname=" +
        `${location.state?.search}` +
        "&ipaddress=0.0.0.0&pageno=" +
        `${pageno}` +
        "&pagelimit=" +
        `${paginationValue}`;
    }
    console.log(url);
    const data = await fetchDataFromApi("itemlist", url);
    setPageCount(Math.ceil(data[0]?.record_count / paginationValue));
    setSearchResult({ data: data, loading: false });
  };
  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {location.state.sellType
              ? "Search Results for " + `${location.state.name}`
              : "Search Results for " + `${location.state.search}`}
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        {/* products grid start */}
        {searchResult.data.length > 0 &&
        searchResult.data[0]?.success_status != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
            {searchResult.data.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        ) : searchResult.data[0]?.success_status == 0 ? (
          <div className="text-2xl text-center mb-14">
            Oops ... No Products Found!
          </div>
        ) : (
          <div className="mb-14">
            <Skeleton
              containerClassName="w-full gap-4"
              count={10}
              height={20}
            />
          </div>
        )}
        {/* products grid end */}
        {pageCount > 0 && (
          <div key={renderKey}>
            <ReactPaginate
              breakLabel="..."
              pageClassName="border-2 w-10 h-10 rounded-md justify-center flex items-center"
              nextLabel={<PaginationRight />}
              onPageChange={(e) => handlePageClick(e)}
              pageRangeDisplayed={0}
              pageCount={pageCount}
              forcePage={pageno - 1}
              marginPagesDisplayed={1}
              previousLabel={<PaginationLeft />}
              renderOnZeroPageCount={null}
              activeClassName="bg-[var(--primary-c)] text-white"
              className="flex flex-row gap-4 my-4 justify-end px-4 text-xl items-center mb-12"
            />
          </div>
        )}
      </Wrapper>
    </Layout>
  );
};

export default Result;
