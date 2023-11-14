import React from "react";
import Wrapper from "../components/Wrapper";
import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";

const Class = () => {
  const global = useSelector((state) => state.global);

  const location = useLocation();
  console.log(location.state);
  const [data, setData] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "/api/classlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
        `${global.branch_id}` +
        "&schoolcode=" +
        `${location.state.school_code}` +
        "&ipaddress=0.0.0.0"
    );
    setData({ data: data, loading: false });
  };

  console.log(data);
  return (
    <Layout>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Classes under {location.state.school_name}
          </div>
          <div className="text-md md:text-xl mb-5">
            One Stop Solution for all Kinds of School Books & Supplies by Gyan
            Sindhu.
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* grid start */}
        <div className="flex flex-wrap justify-center gap-5 my-14 px-5 md:px-0">
          {!data.loading ? (
            data.data[0].class_name !== undefined ? (
              data.data?.map((item, index) => (
                <Link
                  to={"/classschoolbooks"}
                  state={{
                    school_code: location.state.school_code,
                    school_name: location.state.school_name,
                    class_name: item.class_name,
                    class_code: item.class_code,
                  }}
                >
                  <div
                    className="text-white flex justify-center items-center min-w-fit px-16 py-8 text-center bg-[var(--primary-c)]"
                    key={index}
                  >
                    {item.class_name}
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

export default Class;
