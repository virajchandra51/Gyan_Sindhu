import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import dummy from "../../public/sampleProduct.jpeg";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const School = () => {
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
    var data = await fetchDataFromApi("schoollist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&citycode=" +
        `${cityCode}` +
        "&schoolname=" +
        `${schoolName}` +
        "&ipaddress=0.0.0.0&pageno=1&pagelimit=1000"
    );
    setData({ data: data, loading: false });
    data = await fetchDataFromApi("selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=city&ipaddress=0.0.0.0"
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
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
          <div className="flex justify-around flex-col md:flex-row gap-2">
            <div className="flex justify-center items-center text-start gap-4">
              <strong>City :</strong>
              <Select
                options={cityList.data}
                onChange={handleChangeCity}
                isSearchable={true}
                isClearable={true}
                placeholder="Filter by City ..."
              />
            </div>
            <div className="flex justify-center items-center text-start gap-4">
              <strong>School :</strong>
              <div className="md:w-[300px] rounded min-h-[38px] flex justify-start items-center border-[1px] border-[#ccc]">
                <BsSearch className="mx-3 fill-slate-500" />
                <input
                  className="w-full bg-transparent outline-none"
                  placeholder="Search our store here.."
                  type="text"
                  onChange={handleChangeSchool}
                />
              </div>
            </div>
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* grid start */}
        <div className="flex flex-wrap justify-center gap-5 my-14 px-5 md:px-0">
          {!data.loading ? (
            data.data[0].school_name !== undefined ? (
              data.data?.map((item, index) => (
                <Link
                  key={index}
                  to={"/class"}
                  state={{
                    school_code: item.school_code,
                    school_name: item.school_name,
                  }}
                  className="min-w-[30%] max-w-[30%] transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
                >
                  <div className="max-w-sm m-4 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
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
              ))
            ) : (
              <div className="text-2xl">Oops ... No School Found!</div>
            )
          ) : (
            <Skeleton containerClassName="w-screen flex-1 gap-4" count={10} height={20}/>
          )}
        </div>
        {/* grid end */}
      </Wrapper>
    </Layout>
  );
};

export default School;
