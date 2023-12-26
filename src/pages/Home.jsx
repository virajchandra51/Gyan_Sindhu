import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../utils/api";
import HeroBanner from "../components/HeroBanner";
import CategoryCarousal from "../components/CategoryCarousal";
import Layout from "../Layout";
import { useLayoutEffect } from "react";

const sellTypes = ["publisher", "subject", "writer"];
const sellTypesTitle = ["publication", "subject", "author"];

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
  // const [data4, setData4] = useState({
  //   data: [],
  //   loading: true,
  // });
  // const [data5, setData5] = useState({
  //   data: [],
  //   loading: true,
  // });

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
        "&ipaddress=0.0.0.0"
    );
    res = res.slice(0, 10);
    setData1({ data: res, loading: false });
    res = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=" +
        `${sellTypes[1]}` +
        "&ipaddress=0.0.0.0"
    );
    res = res.slice(0, 10);
    setData2({ data: res, loading: false });
    res = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=" +
        `${sellTypes[2]}` +
        "&ipaddress=0.0.0.0"
    );
    res = res.slice(0, 10);
    setData3({ data: res, loading: false });
    // res = await fetchDataFromApi(
    //   "/api/selectionlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
    //     `${global.branch_id}` +
    //     "&seltype=" +
    //     `${sellTypes[3]}` +
    //     "&ipaddress=0.0.0.0"
    // );
    // res = res.slice(0, 10);
    // setData4({ data: res, loading: false });
    // res = await fetchDataFromApi(
    //   "/api/selectionlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
    //     `${global.branch_id}` +
    //     "&seltype=" +
    //     `${sellTypes[4]}` +
    //     "&ipaddress=0.0.0.0"
    // );
    // res = res.slice(0, 10);
    // setData5({ data: res, loading: false });
  };

  return (
    <Layout>
      {/* heading and paragaph start */}
      <HeroBanner />
      {<CategoryCarousal data={data1.data} sellType={sellTypes[0]} sellTypeTitle={sellTypesTitle[0]} />}
      {<CategoryCarousal data={data2.data} sellType={sellTypes[1]} sellTypeTitle={sellTypesTitle[1]} />}
      {<CategoryCarousal data={data3.data} sellType={sellTypes[2]} sellTypeTitle={sellTypesTitle[2]} />}
      {/* {<CategoryCarousal data={data4.data} sellType={sellTypes[3]} />}
      {<CategoryCarousal data={data5.data} sellType={sellTypes[4]} />} */}
      {/* heading and paragaph end */}
    </Layout>
  );
};

export default Home;
