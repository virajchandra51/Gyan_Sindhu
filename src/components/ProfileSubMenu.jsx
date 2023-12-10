import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSubMenu = ({ showProfileMenu, setShowProfileMenu }) => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("UserData") === null) {
      var data = {
        member_id: "-1",
        person_name: "",
        salutation: "",
      };
      setUserData(data);
    } else {
      setUserData(JSON.parse(localStorage.getItem("UserData")));
    }
  }, []);
  function handleClick() {
    if (userData.member_id == "-1") {
      navigate("/login");
    } else {
      localStorage.removeItem("UserData");
      navigate("/");
      navigate(0);
    }
  }
  return (
    <>
      {showProfileMenu && (
        <div className="bg-white absolute top-12 right-0 min-w-[280px] px-4 py-4 text-black shadow-lg flex flex-col justify-center items-center">
          {userData.member_id == "-1" ? (
            <h2>You are not logged in!</h2>
          ) : (
            <h2>
              Welcome, {userData.salutation} {userData.member_name}
            </h2>
          )}
          <div
            onClick={handleClick}
            className="mt-4 bg-[var(--primary-c)] text-white w-[80%] h-[44px] rounded-full cursor-pointer hover:bg-[var(--secondary-c)] flex justify-center items-center"
          >
            {userData.member_id == "-1" ? "Sign In" : "Sign Out"}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSubMenu;
