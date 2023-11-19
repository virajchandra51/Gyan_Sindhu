import React, { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import { fetchDataFromApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const salutation = [
  {
    label: "Mr.",
    value: "1",
  },
  {
    label: "Ms.",
    value: "2",
  },
  {
    label: "Mrs.",
    value: "3",
  },
];

const gender = [
  {
    label: "Male",
    value: "1",
  },
  {
    label: "Female",
    value: "2",
  },
  {
    label: "Other",
    value: "3",
  },
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [designationList, setDesignationList] = useState({
    data: [],
    loading: true,
  });
  const [stateList, setStateList] = useState({
    data: [],
    loading: true,
  });
  const global = useSelector((state) => state.global);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "/api/selectionlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=designation&ipaddress=0.0.0.0"
    );
    var copyData = [];
    data.forEach((item) => {
      var obj = {
        label: item.desig_name,
        value: item.desig_code,
      };
      copyData.push(obj);
    });
    setDesignationList({ data: copyData, loading: false });
    copyData = [];
    data = await fetchDataFromApi(
      "/api/selectionlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=state&ipaddress=0.0.0.0"
    );
    data.forEach((item) => {
      var obj = {
        label: item.state_name,
        value: item.state_code,
      };
      copyData.push(obj);
    });
    setStateList({ data: copyData, loading: false });
  };

  console.log(designationList);
  console.log(stateList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = await fetchDataFromApi(
      "/api/memberlogin/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&userid=" +
        `${form.userid}` +
        "&password=" +
        `${form.password}` +
        "&ipaddress=0.0.0.0"
    );
    data = data[0];
    if (data.member_id === null || data.member_id === undefined) {
      toast.error("Sign In Unsuccessful. Check your Email or Password.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      localStorage.setItem("UserData", JSON.stringify(data));
      toast.success("Sign In Successful", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
    console.log(data[0].member_id);
  };
  // https://publisher.faonline.in/FAWebEComm/api/memberregister/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&&membername=Rupesh%20Chandra&nickname=Rupesh%20Kumar&salutation=Mr.&sexcode=1&age=55&desigcode=1&spousename=Archana&children=Viraj&mobileno1=9129916977&mobileno2=9889355229&emailid=fasystems@gmail.com&address=C-1186,%20Indira%20Nagar&city=Lucknow&statecode=1&pincode=226016&countrycode=IND&birthdate=1968-06-04&annidate=1999-12-01&reggstin=09ABCD&regaadhar=1111222233334444&languagesknown=Hindi,English&newpassword=123&ipaddress=0.0.0.0

  const [form, setForm] = useState({
    membername: "",
    nickname: "",
    salutation: "",
    sexcode: "",
    age: "",
    desigcode: "",
    spousename: "",
    children: "",
    mobileno1: "",
    mobileno2: "",
    emailid: "",
    address: "",
    city: "",
    statecode: "",
    pincode: "",
    countrycode: "",
    birthdate: "",
    annidate: "",
    reggstin: "",
    regaadhar: "",
    languagesknown: "",
    newpassword: "",
  });

  function handle(e) {
    const n = { ...form };
    n[e.target.name] = e.target.value;
    setForm(n);
  }

  return (
    <div className="">
      <ToastContainer />
      <div className=" bg-gray-100 flex-col md:flex-row shadow-lg flex">
        <div className="px-12 md:py-12 flex justify-center flex-col w-full md:w-[80%]">
          <h2 className="font-bold text-4xl my-4 text-[var(--primary-c)]">
            Register
          </h2>
          <p className="text-xl text-[var(--primary-c)]">
            Welcome to Gyan Sindhu!
          </p>

          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className="px-3 py-1.5 mt-8 rounded-md border"
              type="text"
              name="userid"
              placeholder="Member Name"
              required
              onChange={(e) => handle(e)}
            />
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="userid"
              placeholder="Nick Name"
              onChange={(e) => handle(e)}
            />
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="userid"
              placeholder="Email"
              required
              onChange={(e) => handle(e)}
            />

            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="userid"
                placeholder="Spouse Name"
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="userid"
                placeholder="Children Name"
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="userid"
                placeholder="Mobile 1"
                required
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="userid"
                placeholder="Mobile 2"
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 rounded-md border"
                type="text"
                name="userid"
                placeholder="Age"
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                name="userid"
                placeholder="Birth Date"
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="userid"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Anniversary Date"
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="userid"
                placeholder="GST No."
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="userid"
                placeholder="Aadhar No."
                onChange={(e) => handle(e)}
              />
            </div>
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="userid"
              placeholder="Address"
              required
              onChange={(e) => handle(e)}
            />
            <div className="flex gap-4">
              <Select
                options={gender}
                // onChange={handleChangeCity}
                placeholder="Gender"
                className="w-1/2"
              />
              <Select
                options={salutation}
                // onChange={handleChangeCity}
                placeholder="Salutation"
                className="w-1/2"
              />
              <Select
                options={designationList.data}
                // onChange={handleChangeCity}
                placeholder="Designation"
                className="w-1/2"
              />
            </div>
            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 rounded-md border"
                type="text"
                name="userid"
                placeholder="City"
                required
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 rounded-md border"
                type="text"
                name="userid"
                placeholder="Country Code"
                onChange={(e) => handle(e)}
                required
              />
              <Select
                options={stateList.data}
                // onChange={handleChangeCity}
                placeholder="State"
                className="w-1/2"
                required
              />
              <input
                className="px-3 py-1.5 rounded-md border"
                type="text"
                name="userid"
                placeholder="Pin Code"
                onChange={(e) => handle(e)}
                required
              />
            </div>
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="userid"
              placeholder="Languages Known"
              onChange={(e) => handle(e)}
            />
            <div className="relative">
              <input
                className="px-3 py-1.5 rounded-md border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={(e) => handle(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button className="my-8 bg-[var(--primary-c)] rounded-full text-white py-2 hover:bg-[var(--secondary-c)] duration-300">
              Register
            </button>
          </form>

          <div className="mt-3 text-xs gap-4 flex justify-between items-center text-[var(--primary-c)]">
            <p>Already have an account? </p>
            <Link to="/login">
              <div className="py-2 px-5 bg-white border rounded-full hover:opacity-[0.7] duration-300">
                Login
              </div>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-[var(--primary-c)] w-[50%] text-center">
          <div className="text-white px-8 text-xl font-bold text-center">
            One Stop Solution Gyan Sindhu
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
