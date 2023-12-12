import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({});
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

  return (
    <Layout>
      <div className="min-h-[650px] flex items-center">
        <Wrapper>
          <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
            {userData.member_id === "-1" ? (
              <div className="text-2xl font-bold text-center">
                Oops... Login to see your profile!
              </div>
            ) : (
              <></>
            )}
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default Profile;
