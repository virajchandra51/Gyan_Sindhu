import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import dummy from "../assets/sampleProduct.jpeg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLayoutEffect } from "react";

const School = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const [cityCode, setCityCode] = useState(0);
  const [schoolName, setSchoolName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityList, setCityList] = useState({
    data: [],
    loading: true,
  });
  const [data, setData] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, [cityCode, schoolName]);
  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "schoollist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&citycode=" +
        `${cityCode}` +
        "&schoolname=" +
        `${schoolName}` +
        "&ipaddress=" +
        `${global.ip_address}` +
        "&pageno=1&pagelimit=1000"
    );
    // console.log(data)
    setData({ data: data, loading: false });
    data = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=city&ipaddress=" +
        `${global.ip_address}`
    );
    var options = [];
    data.forEach((item) => {
      var ob = {};
      ob.label = item.city_name;
      ob.value = item.city_code;
      options.push(ob);
    });
    setCityList({ data: options, loading: false });
  };

  const handleChangeCity = (selectedOption) => {
    if (selectedOption === null) {
      setCityCode(0);
      setCityName("");
      return;
    }
    setCityCode(selectedOption.value);
  };

  const handleChangeSchool = (event) => {
    setSchoolName(event.target.value);
  };

  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            School
          </div>
          <div className="text-md md:text-xl mb-5">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
          <div className="flex justify-around flex-col md:flex-row gap-2">
            <div className="flex justify-center w-full items-center text-start gap-4">
              <Select
                options={cityList.data}
                onChange={handleChangeCity}
                isSearchable={true}
                isClearable={true}
                className="w-full"
                placeholder="Search by City ..."
              />
            </div>
            <div className="w-full rounded min-h-[38px] flex justify-start items-center border-[1px] border-[#ccc]">
              <BsSearch className="mx-3 fill-slate-500" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Search by School Name ..."
                type="text"
                onChange={handleChangeSchool}
              />
            </div>
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* grid start */}
        {!data.loading ? (
          data.data[0].school_name !== undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {data.data?.map((item, index) => (
                <Link
                  key={index}
                  to={"/class"}
                  state={{
                    school_code: item.school_code,
                    school_name: item.school_name,
                  }}
                  className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
                >
                  <div className="max-w-sm m-4 bg-white border border-gray-200 shadow rounded-md">
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
                      <h5 className="my-4 font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                        {item.school_name}, {item.city_name}
                      </h5>
                      <h5 className="mb-2 text-md tracking-tight text-gray-900 dark:text-white">
                        Board - {item.board_name}
                      </h5>
                      <h5 className="mb-2 text-md tracking-tight text-gray-900 dark:text-white">
                        Medium - {item.medium_name}
                      </h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-2xl">Oops ... No School Found!</div>
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
      </Wrapper>
    </Layout>
  );
};

export default School;
