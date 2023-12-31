import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../utils/api";
import HeroBanner from "../components/HeroBanner";
import CategoryCarousal from "../components/CategoryCarousal";
import Counter from "../components/Counter";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const sellTypes = ["publisher", "school", "writer"];
const sellTypesTitle = ["publication", "school", "author"];

const Home = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const [data1, setData1] = useState({
    data: [],
    loading: true,
  });
  const [data2, setData2] = useState({
    data: [],
    loading: true,
  });
  const [data3, setData3] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var res = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=" +
        `${sellTypes[0]}` +
        "&ipaddress=" +
        `${global.ip_address}`
    );
    res = res.slice(0, 10);
    setData1({ data: res, loading: false });
    res = await fetchDataFromApi(
      "schoollist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&citycode=0" +
        "&schoolname=" +
        "&ipaddress=" +
        `${global.ip_address}` +
        "&pageno=1&pagelimit=1000"
    );
    res = res.slice(0, 10);
    setData2({ data: res, loading: false });
    res = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=" +
        `${sellTypes[2]}` +
        "&ipaddress=" +
        `${global.ip_address}`
    );
    res = res.slice(0, 10);
    setData3({ data: res, loading: false });
  };

  return (
    <Layout>
      {/* heading and paragaph start */}
      <HeroBanner />
      <Counter />
      {
        <CategoryCarousal
          data={data1.data}
          sellType={sellTypes[0]}
          sellTypeTitle={sellTypesTitle[0]}
        />
      }
      {
        <CategoryCarousal
          data={data2.data}
          sellType={sellTypes[1]}
          sellTypeTitle={sellTypesTitle[1]}
        />
      }
      {
        <CategoryCarousal
          data={data3.data}
          sellType={sellTypes[2]}
          sellTypeTitle={sellTypesTitle[2]}
        />
      }
    </Layout>
  );
};

export default Home;
