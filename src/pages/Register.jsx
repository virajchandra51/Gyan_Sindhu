import React, { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import { fetchDataFromApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const salutationList = [
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

const genderList = [
  {
    label: "Undefined",
    value: "0",
  },
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
  const [countryList, setCountryList] = useState({
    data: [],
    loading: true,
  });
  const [cityList, setCityList] = useState({
    data: [],
    loading: true,
  });
  const global = useSelector((state) => state.global);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
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
      "selectionlist",
      "compid=9&branchid=" +
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
    copyData = [];
    data = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=country&ipaddress=0.0.0.0"
    );
    data.forEach((item) => {
      var obj = {
        label: `${item.country_code} - ${item.country_name}`,
        value: item.country_code,
      };
      copyData.push(obj);
    });
    setCountryList({ data: copyData, loading: false });
    copyData = [];
    data = await fetchDataFromApi(
      "selectionlist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&seltype=city&ipaddress=0.0.0.0"
    );
    data.forEach((item) => {
      var obj = {
        label: item.city_name,
        value: item.city_code,
      };
      copyData.push(obj);
    });
    setCityList({ data: copyData, loading: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.regaadhar.length > 0 && form.regaadhar.length !== 16) {
      toast.error("Aadhar Number should be 16 digits!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    var data = await fetchDataFromApi(
      "memberregister",
      "membername=" +
        `${form.membername}` +
        "&nickname=" +
        `${form.nickname}` +
        "&salutation=" +
        `${form.salutation}` +
        "&sexcode=" +
        `${form.sexcode}` +
        "&age=" +
        `${form.age}` +
        "&desigcode=" +
        `${form.desigcode}` +
        "&spousename=" +
        `${form.spousename}` +
        "&children=" +
        `${form.children}` +
        "&mobileno1=" +
        `${form.mobileno1}` +
        "&mobileno2=" +
        `${form.mobileno2}` +
        "&emailid=" +
        `${form.emailid}` +
        "&address1=" +
        `${form.address1}` +
        "&address2=" +
        `${form.address2}` +
        "&city=" +
        `${form.city}` +
        "&statecode=" +
        `${form.statecode}` +
        "&pincode=" +
        `${form.pincode}` +
        "&countrycode=" +
        `${form.countrycode}` +
        "&birthdate=" +
        `${form.birthdate}` +
        "&annidate=" +
        `${form.annidate}` +
        "&reggstin=" +
        `${form.reggstin}` +
        "&regaadhar=" +
        `${form.regaadhar}` +
        "&languagesknown=" +
        `${form.languagesknown}` +
        "&newpassword=" +
        `${form.password}` +
        "&ipaddress=0.0.0.0"
    );
    console.log(data);
    data = data[0];
    if (data.success_status === "1") {
      // localStorage.setItem("UserData", JSON.stringify(data));
      toast.success(data.success_message, {
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
        navigate("/");
      }, 3000);
    } else if (data.success_status === "0") {
      toast.error(data.success_message, {
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
      toast.info(data.success_message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    // console.log(data[0].member_id);
  };
  // https://publisher.faonline.in/FAWebEComm/api/memberregister/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&&membername=Rupesh%20Chandra&nickname=Rupesh%20Kumar&salutation=Mr.&sexcode=1&age=55&desigcode=1&spousename=Archana&children=Viraj&mobileno1=9129916977&mobileno2=9889355229&emailid=fasystems@gmail.com&address=C-1186,%20Indira%20Nagar&city=Lucknow&statecode=1&pincode=226016&countrycode=IND&birthdate=1968-06-04&annidate=1999-12-01&reggstin=09ABCD&regaadhar=1111222233334444&languagesknown=Hindi,English&newpassword=123&ipaddress=0.0.0.0

  const [form, setForm] = useState({
    membername: "",
    nickname: "",
    salutation: "1",
    sexcode: "1",
    age: "",
    desigcode: "",
    spousename: "",
    children: "",
    mobileno1: "",
    mobileno2: "",
    emailid: "",
    address1: "",
    address2: "",
    city: "",
    statecode: "",
    pincode: "",
    countrycode: "IND",
    birthdate: "",
    annidate: "",
    reggstin: "",
    regaadhar: "",
    languagesknown: "",
    password: "",
  });

  function handle(e) {
    const n = { ...form };
    n[e.target.name] = e.target.value;
    setForm(n);
  }

  function handleSelect(selectedOption, object) {
    const n = { ...form };
    n[object.name] = selectedOption.value;
    if (object.name == "salutation") n[object.name] = selectedOption.label;
    setForm(n);
  }

  console.log(form);

  return (
    <div className="">
      <ToastContainer />
      <div className=" bg-gray-100 flex-col md:flex-row shadow-lg flex">
        <div className="px-12 md:py-12 flex justify-center flex-col w-full md:w-[90%]">
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
              name="membername"
              placeholder="Member Name"
              required
              onChange={(e) => handle(e)}
            />
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="nickname"
              placeholder="Nick Name"
              onChange={(e) => handle(e)}
            />
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="emailid"
              placeholder="Email"
              required
              onChange={(e) => handle(e)}
            />

            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="spousename"
                placeholder="Spouse Name"
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="children"
                placeholder="Children"
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="mobileno1"
                placeholder="Mobile No 1"
                required
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="mobileno2"
                placeholder="Mobile 2"
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 rounded-md border"
                type="text"
                name="age"
                placeholder="Age"
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                name="birthdate"
                placeholder="Birth Date"
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="text"
                name="annidate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Anniversary Date"
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="flex gap-4">
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="number"
                name="reggstin"
                placeholder="GST No."
                onChange={(e) => handle(e)}
              />
              <input
                className="px-3 py-1.5 w-1/2 rounded-md border"
                type="number"
                name="regaadhar"
                placeholder="Aadhar No."
                onChange={(e) => handle(e)}
              />
            </div>
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="address1"
              placeholder="Address"
              required
              onChange={(e) => handle(e)}
            />
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="address2"
              placeholder="Address"
              required
              onChange={(e) => handle(e)}
            />
            <div className="flex gap-4">
              <Select
                options={genderList}
                onChange={handleSelect}
                placeholder="Gender"
                defaultValue={{ label: "Male", value: "1" }}
                name="sexcode"
                className="w-1/2"
              />
              <Select
                options={salutationList}
                onChange={handleSelect}
                placeholder="Salutation"
                defaultValue={{ label: "Mr.", value: "1" }}
                name="salutation"
                className="w-1/2"
              />
              <Select
                options={designationList.data}
                onChange={handleSelect}
                placeholder="Designation"
                name="desigcode"
                className="w-1/2"
              />
            </div>
            <div className="flex gap-4 md:flex-row flex-col">
              <Select
                options={cityList.data}
                onChange={handleSelect}
                placeholder="City"
                name="city"
                className="w-full md:w-1/2"
                required
              />
              <Select
                options={stateList.data}
                onChange={handleSelect}
                placeholder="State"
                name="statecode"
                className="w-full md:w-1/2"
                required
              />
              <Select
                options={countryList.data}
                onChange={handleSelect}
                defaultValue={{ label: "IND - India", value: "IND" }}
                placeholder="Country"
                name="countrycode"
                className="w-full md:w-1/2"
                required
              />
              <input
                className="px-3 py-1.5 rounded-md border"
                type="text"
                name="pincode"
                placeholder="Pin Code"
                onChange={(e) => handle(e)}
                required
              />
            </div>
            <input
              className="px-3 py-1.5 rounded-md border"
              type="text"
              name="languagesknown"
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
