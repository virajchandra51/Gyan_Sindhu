import React, { useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgImage.webp";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const navigate = useNavigate();
  const global = useSelector((state) => state.global);

  const [form, setForm] = useState({
    userid: "",
  });

  function handle(e) {
    const n = { ...form };
    n[e.target.name] = e.target.value;
    setForm(n);
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (form.userid) {
      const data = await fetchDataFromApi(
        "memberlogin",
        "userid=" +
          `${form.userid}` +
          "&password=ForgotMyPassword" +
          "&ipaddress=" +
          `${global.ip_address}`
      );
      console.log(data);
      if (data[0]?.success_status == "0") {
        toast.error(data[0]?.success_message, {
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
        var url =
          "https://www.kit19.com/ComposeSMS.aspx?username=olclko637189&password=olclko&sender=FASOFT&to=" +
          `${data[0].mobile_no1}` +
          "&message=Dear "+`${data[0].member_name}`+",%0D%0AYour Password is: " +
          `${data[0].mem_password}` +
          "%0D%0AC/o FA Software Team.%0D%0ABy FA Software.&priority=1&dnd=1&unicode=0&dlttemplateid=1007162322505627553";
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(response);
          });
        var emailData = {
          service_id: "GmailSMTPService",
          template_id: "ForgotPasswordMail",
          user_id: "2luFHblbDCponNdj8",
          template_params: {
            member_name: data[0].member_name,
            email_id: data[0].email_id,
            mobile_no1: data[0].mobile_no1,
            mem_password: data[0].mem_password,
          },
        };
        fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }).then((response) => console.log(response));
        toast.success("Password Sent Via Email and SMS Successfully!", {
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
    }
  };

  return (
    <div className="h-screen w-screen">
      <ToastContainer />
      <div className="h-screen w-full bg-gray-100 flex-col md:flex-row shadow-lg flex">
        <div className="p-8 flex justify-center flex-col w-full md:w-[50%]">
          <Link
            to={"/"}
            className="w-[30%] max-w-[100px] text-center bg-[var(--primary-c)] rounded-full text-white py-2 hover:bg-[var(--secondary-c)] duration-300"
          >
            Home
          </Link>
          <h2 className="font-bold text-4xl mt-8 text-black">
            Forgot Password
          </h2>
          <p className="text-xl mt-4 text-black">
            Recover your password through Email & SMS!
          </p>

          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => handleForgotPassword(e)}
          >
            <div className="flex flex-col items-start mt-8">
              <p>Email or Mobile No.</p>
              <input
                className="px-3 py-1.5 mt-1 rounded-md border w-[100%]"
                type="text"
                name="userid"
                required
                placeholder="Email or Mobile No."
                onChange={(e) => handle(e)}
              />
            </div>
            <button className="bg-[var(--primary-c)] rounded-full text-white py-2 mt-8 hover:bg-[var(--secondary-c)] duration-300">
              Recover
            </button>
          </form>

          <div className="mt-5 text-xs gap-4 flex justify-end items-center text-black">
              <Link to="/login">
                <div className="py-2 px-5 bg-white border rounded-full hover:opacity-[0.7] duration-300">
                  Login
                </div>
              </Link>
          </div>

        </div>

        <div className="hidden md:flex items-center relative justify-center bg-gray-800 w-[70%] text-center">
          <img
            src={bgImage}
            className="absolute object-cover top-0 right-0 z-0 h-full opacity-50"
          />
          <div className="text-white px-8 text-3xl font-extrabold z-10">
            One Stop Solution
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
