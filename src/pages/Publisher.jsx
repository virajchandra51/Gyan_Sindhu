import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import dummy from "../assets/sampleProduct.jpeg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import { paginationValue } from "../utils/constants";
import { useLayoutEffect } from "react";
import PaginationLeft from "../components/PaginationLeft";
import PaginationRight from "../components/PaginationRight";

const Publisher = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const [publisherName, setPublisherName] = useState("");
  const [data, setData] = useState({
    data: [],
    loading: true,
  });
  const [pageno, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(-1);

  //pagination logic starts

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  //pagination logic ends

  useEffect(() => {
    fetchData();
  }, [publisherName, pageno]);

  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "selectionlist",
      "&compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&seltype=publisher&publishername=" +
        `${publisherName}` +
        "&ipaddress=" +
        `${global.ip_address}` +
        "&pageno=" +
        `${pageno}` +
        "&pagelimit=" +
        `${paginationValue}`
    );
    setPageCount(Math.ceil(data[0]?.record_count / paginationValue));
    setData({ data: data, loading: false });
  };

  const handleChanglePublisher = (event) => {
    setPublisherName(event.target.value);
  };

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Publication
          </div>
          <div className="text-md md:text-xl mb-5">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
          <div className="flex justify-around gap-2">
            <div className="flex justify-center w-full items-center text-start gap-4">
              <div className="w-full rounded min-h-[38px] flex justify-start items-center border-[1px] border-[#ccc] bg-white">
                <BsSearch className="mx-3 fill-slate-500" />
                <input
                  className="w-full bg-transparent outline-none"
                  placeholder="Search by Publication Name ..."
                  type="text"
                  onChange={handleChanglePublisher}
                />
              </div>
            </div>
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* grid start */}
        {!data.loading ? (
          data.data[0].publisher_name !== undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {data.data?.map((item, index) => (
                <Link
                  key={index}
                  to={"/result"}
                  state={{ name: item.publisher_name, sellType: "publisher" }}
                  className="transform overflow-hidden duration-200 hover:scale-105 cursor-pointer"
                >
                  <div className="md:max-w-sm m-4 bg-white border border-gray-200 shadow rounded-md">
                    <div className="flex justify-center items-center min-h-[350px] max-h-[350px]">
                      {item.photo_file_url === null ? (
                        <img className="rounded-t-lg" src={dummy} alt="" />
                      ) : (
                        <img
                          className="rounded-t-lg"
                          src={item.photo_file_url}
                          alt=""
                        />
                      )}
                    </div>
                    <hr className="mx-2" />
                    <div className="flex justify-center items-start mb-4 px-4 flex-col">
                      <h5 className="mt-4 font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                        {item.publisher_name}
                      </h5>
                      {item.any_remark && (
                        <p className="text-lg tracking-tight text-gray-900 dark:text-white">
                          {item.any_remark.slice(3, item.any_remark.length - 4)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-2xl text-center mb-14">
              Oops ... No Publication Found!
            </div>
          )
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
        {pageCount > 1 && (
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

export default Publisher;
