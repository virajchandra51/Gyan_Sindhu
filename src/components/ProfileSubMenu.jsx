import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const data = [{ id: 1, name: "My Profile", url: "/profile" }];

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
        <div className="bg-white absolute top-11 right-0  text-black shadow-lg flex flex-col justify-center items-start">
          {userData.member_id == "-1" ? (
            <h2 className="my-4 px-3">You are not logged in!</h2>
          ) : (
            <h2 className="my-4 px-3">
              Welcome, {userData.salutation} {userData.member_name}
            </h2>
          )}
          <ul className="bg-white min-w-[270px] text-black">
            {userData.member_id == "-1" ? (
              <Link
                to={"/register"}
                className="h-12 flex justify-between border-y-[1px] items-center px-3 hover:bg-black/[0.03]"
              >
                Register Now
              </Link>
            ) : (
              data.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={item.url}
                    state={{ member_id: userData.member_id }}
                  >
                    <li className="h-12 flex justify-between border-y-[1px] items-center px-3 hover:bg-black/[0.03]">
                      {item.name}
                    </li>
                  </Link>
                );
              })
            )}
          </ul>
          <div
            onClick={handleClick}
            className="my-4 mx-auto bg-[var(--primary-c)] text-white w-[80%] h-[44px] rounded-full cursor-pointer hover:bg-[var(--secondary-c)] flex justify-center items-center"
          >
            {userData.member_id == "-1" ? "Sign In" : "Sign Out"}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSubMenu;
