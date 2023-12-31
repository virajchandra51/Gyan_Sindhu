import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import { paginationValue } from "../utils/constants";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import PaginationLeft from "../components/PaginationLeft";
import PaginationRight from "../components/PaginationRight";

const SellType = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const location = useLocation();
  // console.log(location.key);
  const [data, setData] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, [location.key]);

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "selectionlist",
      "&compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=" +
        `${location.state.sellType}` +
        "&ipaddress=" +
        `${global.ip_address}`
    );
    setData({ data: data, loading: false });
  };
  // console.log(data.data);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + paginationValue;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(data.data.length / paginationValue);
  var currentItems = data.data.slice(itemOffset, endOffset);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * paginationValue) % data.data.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    currentItems = data.data.slice(newOffset, endOffset);
  };

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {location.state.sellTypeTitle}
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* grid start */}
        {!data.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
            {currentItems.map((item, index) => (
              <Link
                to={"/result"}
                state={{
                  name: item[`${location.state.sellType}_name`],
                  sellType: location.state.sellType,
                }}
                className="text-white duration-200 hover:scale-105 hover:bg-[var(--secondary-c)] flex justify-center items-center min-w-fit px-16 py-8 text-center bg-[var(--primary-c)]"
                key={index}
              >
                {item[`${location.state.sellType}_name`]}
              </Link>
            ))}
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
        {/* grid end */}
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
          activeClassName="bg-[var(--primary-c)] text-white"
          className="flex flex-row gap-4 my-4 justify-center md:justify-end px-4 text-xl items-center mb-12"
        />
      </Wrapper>
    </Layout>
  );
};

export default SellType;
