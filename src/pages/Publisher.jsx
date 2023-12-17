import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import dummy from "../../public/sampleProduct.jpeg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import { paginationValue } from "../utils/constants";

const Publisher = () => {
  const global = useSelector((state) => state.global);
  const [publishername, setPublisherName] = useState("");
  const [data, setData] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "selectionlist",
      "&compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=publisher" +
        "&ipaddress=0.0.0.0"
    );
    setData({ data: data, loading: false });
  };

  // console.log(data);

  const handleChanglePublisher = (event) => {
    setPublisherName(event.target.value);
  };

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + paginationValue;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(data.data.length / paginationValue);
  const currentItems = data.data.slice(itemOffset, endOffset);

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
            Publisher
          </div>
          <div className="text-md md:text-xl mb-5">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
          <div className="flex justify-around flex-col md:flex-row gap-2">
            <div className="flex justify-center items-center text-start gap-4">
              <strong>Publisher :</strong>
              <div className="md:w-[300px] rounded min-h-[38px] flex justify-start items-center border-[1px] border-[#ccc]">
                <BsSearch className="mx-3 fill-slate-500" />
                <input
                  className="w-full bg-transparent outline-none"
                  placeholder="Search our publishers here.."
                  type="text"
                  onChange={handleChanglePublisher}
                />
              </div>
            </div>
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {!data.loading ? (
            data.data[0].publisher_name !== undefined ? (
              currentItems?.map((item, index) => (
                <Link
                  key={index}
                  className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
                >
                  <div className="md:max-w-sm m-4 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
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
                    <div className="border-t-2 flex justify-center items-start mb-4 px-4 flex-col">
                      <h5 className="my-4 font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                        {item.publisher_name}
                      </h5>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-2xl">Oops ... No Publisher Found!</div>
            )
          ) : (
            <Skeleton
              containerClassName="w-screen flex-1 gap-4"
              count={10}
              height={20}
            />
          )}
        </div>
        {/* grid end */}
        <ReactPaginate
          breakLabel="..."
          pageClassName="border-2 w-10 h-10 justify-center flex items-center mb-12"
          nextLabel="next >"
          onPageChange={(e) => handlePageClick(e)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeClassName="bg-[var(--secondary-c)] text-white"
          className="flex flex-row gap-4 my-4 justify-end px-4 text-xl items-center"
        />
      </Wrapper>
    </Layout>
  );
};

export default Publisher;
