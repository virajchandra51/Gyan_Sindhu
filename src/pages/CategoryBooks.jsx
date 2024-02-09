import React from "react";
import Wrapper from "../components/Wrapper";
import ProductCard from "../components/ProductCard";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLayoutEffect } from "react";
import ReactPaginate from "react-paginate";
import { paginationValue } from "../utils/constants";
import PaginationLeft from "../components/PaginationLeft";
import PaginationRight from "../components/PaginationRight";

const CategoryBooks = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const location = useLocation();
  const [productList, setProductList] = useState([]);
  const [pageno, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(-1);

  //pagination logic starts

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  //pagination logic ends

  useEffect(() => {
    fetchData();
  }, [location.state.category.item_gr_code, global.branch_id, pageno]);

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "itemlist",
      "compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&groupcode=" +
        `${location.state.category.item_gr_code}` +
        "&ipaddress=" +
        `${global.ip_address}` +
        "&pageno=" +
        `${pageno}` +
        "&pagelimit=" +
        `${paginationValue}`
    );
    setPageCount(Math.ceil(data[0]?.record_count / paginationValue));
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
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        {productList.length > 0 && productList[0]?.success_status != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
            {productList.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : productList[0]?.success_status == 0 ? (
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
        {productList.length > 0 && productList[0]?.success_status != 0 && (
          <ReactPaginate
            breakLabel="..."
            pageClassName="border-2 w-10 h-10 rounded-md justify-center flex items-center"
            nextLabel={<PaginationRight />}
            onPageChange={(e) => handlePageClick(e)}
            pageRangeDisplayed={0}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            previousLabel={<PaginationLeft />}
            renderOnZeroPageCount={null}
            initialPage={0}
            activeClassName="bg-[var(--primary-c)] text-white"
            className="flex flex-row gap-4 my-4 justify-center md:justify-end px-4 text-xl items-center mb-12"
          />
        )}
      </Wrapper>
    </Layout>
  );
};

export default CategoryBooks;
