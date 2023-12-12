import React from "react";
import Wrapper from "../components/Wrapper";
import Layout from "../Layout";
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import { useLocation } from "react-router-dom";
import Select from "react-select";

const Profile = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    data: [],
    loading: true,
  });

  const [profileData, setProfileData] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
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

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "memberprofile",
      "memberid=" + `${location.state.member_id}` + "&ipaddress=0.0.0.0"
    );
    console.log(data);
    setProfileData({ data: data, loading: false });
  };

  return (
    <Layout>
      <div className="min-h-[650px] flex items-center">
        <Wrapper>
          <div className="rounded-lg p-5 my-24 border border-black mx-auto flex flex-col">
            {location.state.member_id === "-1" ? (
              <div className="text-2xl font-bold text-center">
                Oops... Login to see your profile!
              </div>
            ) : (
              <form
                action=""
                className="flex flex-col gap-4"
                // onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  className="px-3 py-1.5 mt-8 rounded-md border"
                  type="text"
                  name="membername"
                  placeholder="Member Name"
                  required
                  value={profileData.data[0]?.member_name}
                  // onChange={(e) => handle(e)}
                />
                <input
                  className="px-3 py-1.5 rounded-md border"
                  type="text"
                  name="nickname"
                  placeholder="Nick Name"
                  value={profileData.data[0]?.nick_name}
                  // onChange={(e) => handle(e)}
                />
                <input
                  className="px-3 py-1.5 rounded-md border"
                  type="text"
                  name="emailid"
                  placeholder="Email"
                  required
                  value={profileData.data[0]?.email_id}
                  // onChange={(e) => handle(e)}
                />

                <div className="flex gap-4">
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    name="spousename"
                    placeholder="Spouse Name"
                    value={profileData.data[0]?.spouse_name}
                    // onChange={(e) => handle(e)}
                  />
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    name="children"
                    placeholder="Children"
                    value={profileData.data[0]?.children}
                    // onChange={(e) => handle(e)}
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    name="mobileno1"
                    placeholder="Mobile No 1"
                    value={profileData.data[0]?.mobile_no1}
                    required
                    // onChange={(e) => handle(e)}
                  />
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    name="mobileno2"
                    placeholder="Mobile No 2"
                    value={profileData.data[0]?.mobile_no2}
                    // onChange={(e) => handle(e)}
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    className="px-3 py-1.5 rounded-md border"
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={profileData.data[0]?.age}
                    // onChange={(e) => handle(e)}
                  />
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name="birthdate"
                    placeholder="Birth Date"
                    value={profileData.data[0]?.birth_date}
                    // onChange={(e) => handle(e)}
                  />
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    name="annidate"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder="Anniversary Date"
                    value={profileData.data[0]?.anni_date}
                    // onChange={(e) => handle(e)}
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    name="reggstin"
                    placeholder="GST No."
                    value={profileData.data[0]?.reg_gstin}
                    // onChange={(e) => handle(e)}
                  />
                  <input
                    className="px-3 py-1.5 w-1/2 rounded-md border"
                    type="text"
                    name="regaadhar"
                    placeholder="Aadhar No."
                    value={profileData.data[0]?.reg_aadhar}
                    // onChange={(e) => handle(e)}
                  />
                </div>
                <input
                  className="px-3 py-1.5 rounded-md border"
                  type="text"
                  name="address1"
                  placeholder="Address 1"
                  value={profileData.data[0]?.address1}
                  required
                  // onChange={(e) => handle(e)}
                />
                <input
                  className="px-3 py-1.5 rounded-md border"
                  type="text"
                  name="address2"
                  placeholder="Address 2"
                  value={profileData.data[0]?.address2}
                  required
                  // onChange={(e) => handle(e)}
                />
                <div className="flex gap-4">
                  <Select
                    // options={genderList}
                    // onChange={handleSelect}
                    value={{value: 'one', label: 'One'}}
                    placeholder="Gender"
                    defaultValue={{ label: "Male", value: "1" }}
                    name="sexcode"
                    className="w-1/2"
                  />
                  <Select
                    // options={salutationList}
                    // onChange={handleSelect}
                    placeholder="Salutation"
                    defaultValue={{ label: "Mr.", value: "1" }}
                    name="salutation"
                    className="w-1/2"
                  />
                  <Select
                    // options={designationList.data}
                    // onChange={handleSelect}
                    placeholder="Designation"
                    name="desigcode"
                    className="w-1/2"
                  />
                </div>
                <div className="flex gap-4 md:flex-row flex-col">
                  <Select
                    // options={cityList.data}
                    // onChange={handleSelect}
                    placeholder="City"
                    name="city"
                    className="w-full md:w-1/2"
                    required
                  />
                  <Select
                    // options={stateList.data}
                    // onChange={handleSelect}
                    placeholder="State"
                    name="statecode"
                    className="w-full md:w-1/2"
                    required
                  />
                  <Select
                    // options={countryList.data}
                    // onChange={handleSelect}
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
                    value={profileData.data[0]?.pin_code}
                    // onChange={(e) => handle(e)}
                    required
                  />
                </div>
                <input
                  className="px-3 py-1.5 rounded-md border"
                  type="text"
                  name="languagesknown"
                  placeholder="Languages Known"
                  value={profileData.data[0]?.languages_known}
                  // onChange={(e) => handle(e)}
                />
                <div className="relative">
                  <input
                    className="px-3 py-1.5 rounded-md border w-full"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={profileData.data[0]?.mem_password}
                    // onChange={(e) => handle(e)}
                  />
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="24"
                      height="24"
                      viewbox="0 0 24 24"
                      className="absolute cursor-pointer top-2 right-2"
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
                      className="absolute cursor-pointer top-2 right-2"
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
                <button className="my-8 bg-[var(--primary-c)] rounded-full text-white py-2 hover:bg-[var(--secondary-c)] duration-300">
                  Register
                </button>
              </form>
            )}
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default Profile;
