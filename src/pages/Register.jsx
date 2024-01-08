import React, { useState, useEffect } from "react";
import logo from "../assets/logo.webp";
import { fetchDataFromApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgImage.webp";

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
    label: "Third Gender",
    value: "3",
  },
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      "compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&seltype=designation&ipaddress=" +
        `${global.ip_address}`
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
      "compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&seltype=state&ipaddress=" +
        `${global.ip_address}`
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
      "compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&seltype=country&ipaddress=" +
        `${global.ip_address}`
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
      "compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&seltype=city&ipaddress=" +
        `${global.ip_address}`
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

  function isANumber(str) {
    return !/\D/.test(str);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.emailid)) {
      toast.error("Oops... Invalid Email!", {
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
    if (form.password != form.confirm_password) {
      toast.error("Passwords Don't Match!", {
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
    if (form.mobileno1.length !== 10) {
      toast.error("Mobile Number 1 should be 10 characters and digits only!", {
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
    if (!isANumber(form.mobileno1)) {
      toast.error("Mobile Number 1 should be 10 characters and digits only!", {
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
    if (form.mobileno2.length > 0 && mobileno2.length !== 10) {
      toast.error("Mobile Number 2 should be 10 characters and digits only!", {
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
    if (
      form.regaadhar.length > 0 &&
      form.regaadhar.length !== 16 &&
      !isANumber(form.regaadhar)
    ) {
      toast.error("Aadhar Number should be 16 characters and digits only!", {
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
    if (form.reggstin.length > 0 && form.reggstin.length !== 15) {
      toast.error("GSTIN Number should be 15 digits!", {
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
    form.password = URLEncoder.encode(form.password);
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
        "&citycode=" +
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
      localStorage.setItem("UserData", JSON.stringify(data));
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
    salutation: "",
    sexcode: "",
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
        <div className="p-8 flex justify-center flex-col w-full md:w-[90%]">
          <Link
            to={"/"}
            className="w-[30%] max-w-[100px] text-center bg-[var(--primary-c)] rounded-full text-white py-2 hover:bg-[var(--secondary-c)] duration-300"
          >
            Home
          </Link>
          <h2 className="font-bold text-4xl my-4 text-black">Register</h2>
          <p className="text-xl text-black">Welcome to Skoolio!</p>

          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col items-start mt-8">
              <p className="my-1">
                Member Name / Your Name <span className="text-red-600">*</span>
              </p>
              <input
                autoFocus
                className="px-3 py-1.5 rounded-md border w-[100%]"
                type="text"
                name="membername"
                placeholder="Member Name / Your Name"
                required
                onChange={(e) => handle(e)}
                autoCapitalize="sentences"
              />
            </div>
            {/* <div className="flex flex-col items-start">
              <p className="my-1">Nick Name</p>
              <input
                className="px-3 py-1.5 rounded-md border w-[100%]"
                type="text"
                name="nickname"
                placeholder="Nick Name"
                onChange={(e) => handle(e)}
              />
            </div> */}
            <div className="flex flex-col items-start">
              <p className="my-1">
                Email <span className="text-red-600">*</span>
              </p>
              <input
                className="px-3 py-1.5 rounded-md border w-[100%]"
                type="email"
                name="emailid"
                placeholder="Email"
                required
                onChange={(e) => handle(e)}
              />
            </div>
            {/* <div className="flex gap-4">
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Spouse Name</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="spousename"
                  placeholder="Spouse Name"
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Children</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="children"
                  placeholder="Children"
                  onChange={(e) => handle(e)}
                />
              </div>
            </div> */}
            <div className="flex gap-4">
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">
                  Mobile No 1 <span className="text-red-600">*</span>
                </p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="mobileno1"
                  placeholder="Mobile No 1"
                  required
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Mobile No 2</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="mobileno2"
                  placeholder="Mobile No 2"
                  onChange={(e) => handle(e)}
                />
              </div>
            </div>
            {/* <div className="flex gap-4">
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Age</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="age"
                  required
                  placeholder="Age"
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Birth Date</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  min="1997-01-01" max="2100-12-31"
                  // onBlur={(e) => (e.target.type = "text")}
                  name="birthdate"
                  placeholder="Birth Date"
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Anniversary Date</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="annidate"
                  onFocus={(e) => (e.target.type = "date")}
                  min="1997-01-01" max="2100-12-31"
                  // onBlur={(e) => (e.target.type = "text")}
                  placeholder="Anniversary Date"
                  onChange={(e) => handle(e)}
                />
              </div>
            </div> */}
            <div className="flex gap-4">
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">GSTIN No.</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="reggstin"
                  placeholder="GSTIN No."
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Aadhar No.</p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type="text"
                  name="regaadhar"
                  placeholder="Aadhar No."
                  onChange={(e) => handle(e)}
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <p className="my-1">
                Address 1 <span className="text-red-600">*</span>
              </p>
              <input
                className="px-3 py-1.5 rounded-md border w-[100%]"
                type="text"
                name="address1"
                placeholder="Address 1"
                required
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="my-1">Address 2</p>
              <input
                className="px-3 py-1.5 rounded-md border w-[100%]"
                type="text"
                name="address2"
                placeholder="Address 2"
                onChange={(e) => handle(e)}
              />
            </div>
            {/* <div className="flex gap-4">
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Gender</p>
                <Select
                  options={genderList}
                  onChange={handleSelect}
                  placeholder="Gender"
                  defaultValue={{ label: "Male", value: "1" }}
                  name="sexcode"
                  className="w-[100%]"
                />
              </div>
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Salutation</p>
                <Select
                  options={salutationList}
                  onChange={handleSelect}
                  placeholder="Salutation"
                  defaultValue={{ label: "Mr.", value: "Mr." }}
                  name="salutation"
                  className="w-[100%]"
                />
              </div>
              <div className="flex flex-col items-start w-[50%]">
                <p className="my-1">Designation</p>
                <Select
                  options={designationList.data}
                  onChange={handleSelect}
                  required
                  placeholder="Designation"
                  name="desigcode"
                  className="w-[100%]"
                />
              </div>
            </div> */}
            <div className="flex gap-4 md:flex-row flex-col">
              <div className="flex flex-col items-start w-full">
                <p className="my-1">
                  City <span className="text-red-600">*</span>
                </p>
                <Select
                  options={cityList.data}
                  onChange={handleSelect}
                  placeholder="Select City"
                  name="city"
                  className="w-full"
                  required
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="my-1">
                  State <span className="text-red-600">*</span>
                </p>
                <Select
                  options={stateList.data}
                  onChange={handleSelect}
                  placeholder="Select State"
                  name="statecode"
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 md:flex-row flex-col">
              <div className="flex flex-col items-start w-full">
                <p className="my-1">
                  Country <span className="text-red-600">*</span>
                </p>
                <Select
                  options={countryList.data}
                  onChange={handleSelect}
                  defaultValue={{ label: "IND - India", value: "IND" }}
                  placeholder="Country"
                  name="countrycode"
                  className="w-full"
                  required
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="my-1">
                  Pin Code <span className="text-red-600">*</span>
                </p>
                <input
                  className="px-3 py-1.5 rounded-md border w-full"
                  type="text"
                  name="pincode"
                  placeholder="Pin Code"
                  onChange={(e) => handle(e)}
                  required
                />
              </div>
            </div>
            {/* <div className="flex flex-col items-start">
              <p className="my-1">Languages Known</p>
              <input
                className="px-3 py-1.5 rounded-md border w-[100%]"
                type="text"
                name="languagesknown"
                placeholder="Languages Known"
                onChange={(e) => handle(e)}
              />
            </div> */}
            <div className="relative">
              <div className="flex flex-col items-start">
                <p className="my-1">
                  Password <span className="text-red-600">*</span>
                </p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  onChange={(e) => handle(e)}
                />
              </div>
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewbox="0 0 24 24"
                  className="absolute cursor-pointer top-[38px] right-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <path
                    d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                    stroke="#aaa"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#aaa"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewbox="0 0 24 24"
                  className="absolute cursor-pointer top-[38px] right-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <path
                    d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                    stroke="#aaa"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="relative">
              <div className="flex flex-col items-start">
                <p className="my-1">
                  Confirm Password <span className="text-red-600">*</span>
                </p>
                <input
                  className="px-3 py-1.5 rounded-md border w-[100%]"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => handle(e)}
                />
              </div>
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewbox="0 0 24 24"
                  className="absolute cursor-pointer top-[38px] right-2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <path
                    d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                    stroke="#aaa"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#aaa"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewbox="0 0 24 24"
                  className="absolute cursor-pointer top-[38px] right-2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <path
                    d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                    stroke="#aaa"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
            <button className="my-8 bg-[var(--primary-c)] rounded-full text-white py-2 hover:bg-[var(--secondary-c)] duration-300">
              Register
            </button>
          </form>

          <div className="mt-3 text-xs gap-4 flex justify-between items-center text-black">
            <p>Already have an account? </p>
            <Link
              to="/login"
              className="py-2 px-5 bg-white border rounded-full hover:opacity-[0.7] duration-300"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="hidden md:flex relative items-center justify-center bg-gray-800 w-[50%] text-center">
          <img
            src={bgImage}
            className="absolute object-cover top-0 right-0 z-0 h-full opacity-50"
          />
          <div className="text-white px-8 text-2xl font-extrabold z-10">
            One Stop Solution Gyan Sindhu
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
