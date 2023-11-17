import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Layout from "../Layout";

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
    var data = await fetchDataFromApi(
      "/api/schoollist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
        `${global.branch_id}` +
        "&citycode=" +
        `${cityCode}` +
        "&schoolname=" +
        `${schoolName}` +
        "&ipaddress=0.0.0.0&pageno=1&pagelimit=1000"
    );
    setData({ data: data, loading: false });
    data = await fetchDataFromApi(
      "/api/selectionlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
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
          <div className="flex justify-around">
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
              <div className="w-[300px] rounded min-h-[38px] flex justify-start items-center border-[1px] border-[#ccc]">
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
                >
                  <div
                    className="text-white flex justify-center items-center min-w-fit px-16 py-8 text-center bg-[var(--primary-c)]"
                    key={index}
                  >
                    {item.school_name}
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-2xl">Oops ... No School Found!</div>
            )
          ) : (
            <></>
          )}
        </div>
        {/* grid end */}
      </Wrapper>
    </Layout>
  );
};

export default School;
