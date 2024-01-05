import React from "react";
import Wrapper from "../components/Wrapper";
import Layout from "../Layout";
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLayoutEffect } from "react";

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

const Profile = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [disabledForm, setDisabledForm] = useState(true);

  const [userData, setUserData] = useState({
    data: [],
    loading: true,
  });

  const [profileData, setProfileData] = useState({
    data: [],
    loading: true,
  });

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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("UserData") === null) {
      var data = {
        member_id: "-1",
        person_name: "",
        salutation: "",
      };
      setUserData({ data: data, loading: false });
    } else {
      setUserData({
        data: JSON.parse(localStorage.getItem("UserData")),
        loading: false,
      });
      fetchData();
    }
  }, []);

  const global = useSelector((state) => state.global);

  const fetchData = async () => {
    var data = await fetchDataFromApi(
      "memberprofile",
      "memberid=" +
        `${location.state.member_id}` +
        "&ipaddress=" +
        `${global.ip_address}`
    );
    setProfileData({ data: data[0], loading: false });
    data = await fetchDataFromApi(
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

  function handle(e) {
    const n = profileData.data;
    n[e.target.name] = e.target.value;
    setProfileData({ data: n, loading: false });
  }

  function isANumber(str) {
    return !/\D/.test(str);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      profileData.data.reg_aadhar != null &&
      profileData.data.reg_aadhar.length > 0 &&
      profileData.data.reg_aadhar.length !== 16 &&
      !isANumber(profileData.data.reg_aadhar)
    ) {
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
    if (
      profileData.data.reg_gstin != null &&
      profileData.data.reg_gstin.length > 0 &&
      profileData.data.reg_gstin.length !== 15
    ) {
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
    var data = await fetchDataFromApi(
      "memberprofile",
      "memberid=" +
        `${location.state.member_id}` +
        "&membername=" +
        `${profileData.data.member_name}` +
        "&nickname=" +
        `${profileData.data.nick_name}` +
        "&salutation=" +
        `${profileData.data.salutation}` +
        "&sexcode=" +
        `${profileData.data.sex_code}` +
        "&age=" +
        `${profileData.data.age}` +
        "&desigcode=" +
        `${profileData.data.desig_code}` +
        "&spousename=" +
        `${profileData.data.spouse_name}` +
        "&children=" +
        `${profileData.data.children}` +
        "&mobileno1=" +
        `${profileData.data.mobile_no1}` +
        "&mobileno2=" +
        `${profileData.data.mobile_no2}` +
        "&emailid=" +
        `${profileData.data.email_id}` +
        "&address1=" +
        `${profileData.data.address1}` +
        "&address2=" +
        `${profileData.data.address2}` +
        "&city=" +
        `${profileData.data.city_code}` +
        "&statecode=" +
        `${profileData.data.ctry_state_code}` +
        "&pincode=" +
        `${profileData.data.pin_code}` +
        "&countrycode=" +
        `${profileData.data.country_code}` +
        "&birthdate=" +
        `${profileData.data.birth_date}` +
        "&annidate=" +
        `${profileData.data.anni_date}` +
        "&reggstin=" +
        `${profileData.data.reg_gstin}` +
        "&regaadhar=" +
        `${profileData.data.reg_aadhar}` +
        "&languagesknown=" +
        `${profileData.data.languages_known}` +
        "&newpassword=" +
        `${profileData.data.mem_password}` +
        "&ipaddress=0.0.0.0"
    );
    console.log(data);
    data = data[0];
    if (data.success_status === "1") {
      const res = {
        activity_status: userData.data.activity_status,
        member_id: userData.data.member_id,
        member_name: profileData.data.member_name,
        nick_name: profileData.data.nick_name,
        rate_index: userData.data.rate_index,
        salutation: profileData.data.salutation,
        star_rating: userData.data.star_rating,
        email_id: profileData.data.email_id,
        mobile_no1: profileData.data.mobile_no1,
      };
      setDisabledForm((prev) => !prev);

      localStorage.setItem("UserData", JSON.stringify(res));

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
  };

  function handleSelect(selectedOption, object) {
    const n = profileData.data;
    n[object.name] = selectedOption.value;
    if (object.name == "salutation") n[object.name] = selectedOption.label;
    setProfileData({ data: n, loading: false });
  }

  function handleDisabledForm(e) {
    e.preventDefault();
    setDisabledForm((prev) => !prev);
  }

  return (
    <Layout>
      <div className="min-h-[650px] flex items-center">
        <Wrapper>
          {location.state.member_id === "-1" ? (
            <div className="text-2xl font-bold text-center">
              Oops... Login to see your profile!
            </div>
          ) : (
            <div>
              <div className="text-3xl font-bold text-left my-8">
                User Profile Details
              </div>
              <div className="rounded-lg p-5 mb-24 border border-black mx-auto flex flex-col">
                <form
                  action=""
                  className="flex flex-col gap-4"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="flex flex-col items-start mt-8">
                    <p>Member Name / Your Name</p>
                    <input
                      className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                      type="text"
                      name="member_name"
                      placeholder="Member Name / Your Name"
                      required
                      value={profileData.data?.member_name}
                      onChange={(e) => handle(e)}
                      disabled={disabledForm}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p>Nick Name</p>
                    <input
                      className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                      type="text"
                      name="nick_name"
                      placeholder="Nick Name"
                      value={profileData.data?.nick_name}
                      onChange={(e) => handle(e)}
                      disabled={disabledForm}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p>Email</p>
                    <input
                      className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                      type="email"
                      name="email_id"
                      placeholder="Email"
                      required
                      value={profileData.data?.email_id}
                      onChange={(e) => handle(e)}
                      disabled={disabledForm}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Spouse Name</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="spouse_name"
                        placeholder="Spouse Name"
                        value={profileData.data?.spouse_name}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Children</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="children"
                        placeholder="Children"
                        value={profileData.data?.children}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Mobile No 1</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="mobile_no1"
                        placeholder="Mobile No 1"
                        value={profileData.data?.mobile_no1}
                        required
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Mobile No 2</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="mobile_no2"
                        placeholder="Mobile No 2"
                        value={profileData.data?.mobile_no2}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Age</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="age"
                        placeholder="Age"
                        value={profileData.data?.age}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Birth Date</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        min="1997-01-01"
                        max="2100-12-31"
                        // onBlur={(e) => (e.target.type = "text")}
                        name="birth_date"
                        placeholder="Birth Date"
                        value={profileData.data?.birth_date}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Anniversary Date</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="anni_date"
                        onFocus={(e) => (e.target.type = "date")}
                        min="1997-01-01"
                        max="2100-12-31"
                        // onBlur={(e) => (e.target.type = "text")}
                        placeholder="Anniversary Date"
                        value={profileData.data?.anni_date}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-start w-[50%]">
                      <p>GSTIN No.</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="reg_gstin"
                        placeholder="GSTIN No."
                        value={profileData.data?.reg_gstin}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Aadhar No.</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type="text"
                        name="reg_aadhar"
                        placeholder="Aadhar No."
                        value={profileData.data?.reg_aadhar}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <p>Address 1</p>
                    <input
                      className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                      type="text"
                      name="address1"
                      placeholder="Address 1"
                      value={profileData.data?.address1}
                      required
                      onChange={(e) => handle(e)}
                      disabled={disabledForm}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p>Address 2</p>
                    <input
                      className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                      type="text"
                      name="address2"
                      placeholder="Address 2"
                      value={profileData.data?.address2}
                      onChange={(e) => handle(e)}
                      disabled={disabledForm}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Gender</p>
                      <Select
                        options={genderList}
                        onChange={handleSelect}
                        value={{
                          value: profileData.data?.sex_code,
                          label: genderList.filter((item) => {
                            return item.value === profileData.data?.sex_code;
                          })[0]?.label,
                        }}
                        placeholder="Gender"
                        defaultValue={{ label: "Male", value: "1" }}
                        name="sex_code"
                        className="w-full"
                        isDisabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Salutation</p>
                      <Select
                        options={salutationList}
                        onChange={handleSelect}
                        placeholder="Salutation"
                        defaultValue={{ label: "Mr.", value: "1" }}
                        name="salutation"
                        className="w-full"
                        value={{
                          value: salutationList.filter((item) => {
                            return item.label === profileData.data?.salutation;
                          })[0]?.value,
                          label: profileData.data?.salutation,
                        }}
                        isDisabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Designation</p>
                      <Select
                        options={designationList.data}
                        onChange={handleSelect}
                        placeholder="Designation"
                        name="desig_code"
                        className="w-full"
                        value={{
                          value: profileData.data?.desig_code,
                          label: designationList.data.filter((item) => {
                            return item.value === profileData.data?.desig_code;
                          })[0]?.label,
                        }}
                        isDisabled={disabledForm}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 md:flex-row flex-col">
                    <div className="flex flex-col items-start w-[50%]">
                      <p>City</p>
                      <Select
                        options={cityList.data}
                        onChange={handleSelect}
                        placeholder="City"
                        name="city_code"
                        className="w-full"
                        required
                        value={{
                          value: profileData.data?.city_code,
                          label: cityList.data.filter((item) => {
                            return item.value === profileData.data?.city_code;
                          })[0]?.label,
                        }}
                        isDisabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>State</p>
                      <Select
                        options={stateList.data}
                        onChange={handleSelect}
                        placeholder="State"
                        name="ctry_state_code"
                        className="w-full"
                        required
                        value={{
                          value: profileData.data?.ctry_state_code,
                          label: stateList.data.filter((item) => {
                            return (
                              item.value === profileData.data?.ctry_state_code
                            );
                          })[0]?.label,
                        }}
                        isDisabled={disabledForm}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 md:flex-row flex-col">
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Country</p>
                      <Select
                        options={countryList.data}
                        onChange={handleSelect}
                        value={{
                          value: profileData.data?.country_code,
                          label: countryList.data.filter((item) => {
                            return (
                              item.value === profileData.data?.country_code
                            );
                          })[0]?.label,
                        }}
                        placeholder="Country"
                        name="country_code"
                        className="w-full"
                        required
                        isDisabled={disabledForm}
                      />
                    </div>
                    <div className="flex flex-col items-start w-[50%]">
                      <p>Pin Code</p>
                      <input
                        className="px-3 py-1.5 rounded-md border w-full"
                        type="text"
                        name="pin_code"
                        placeholder="Pin Code"
                        value={profileData.data?.pin_code}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <p>Languages Known</p>
                    <input
                      className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                      type="text"
                      name="languages_known"
                      placeholder="Languages Known"
                      value={profileData.data?.languages_known}
                      onChange={(e) => handle(e)}
                      disabled={disabledForm}
                    />
                  </div>

                  <div className="relative">
                    <div className="flex flex-col items-start">
                      <p>Password</p>
                      <input
                        className="px-3 py-1.5 mt-2 rounded-md border w-[100%]"
                        type={showPassword ? "text" : "password"}
                        name="mem_password"
                        placeholder="Password"
                        value={profileData.data?.mem_password}
                        onChange={(e) => handle(e)}
                        disabled={disabledForm}
                      />
                    </div>
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="absolute cursor-pointer top-[38px] right-2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <path
                          d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                          stroke="#aaa"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="#aaa"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="absolute cursor-pointer top-[38px] right-2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <path
                          d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                          stroke="#aaa"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-row justify-center gap-4">
                    <button
                      onClick={(e) => handleDisabledForm(e)}
                      name="notaction"
                      className="flex justify-center items-center w-[50%] my-8 bg-white border-[1px] rounded-full text-black py-2 hover:bg-gray-300 hover:text-white duration-300"
                    >
                      Edit Profile
                      <FaPencilAlt className="ml-2" />
                    </button>
                    <button
                      disabled={disabledForm}
                      name="action"
                      className="w-[50%] my-8 bg-[var(--primary-c)] rounded-full text-white py-2 hover:bg-[var(--secondary-c)] duration-300"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <ToastContainer />
        </Wrapper>
      </div>
    </Layout>
  );
};

export default Profile;
