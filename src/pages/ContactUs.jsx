import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import Layout from "../Layout";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const purposeList = [
  {
    label: "Product Enquiry",
    value: "0",
  },
  {
    label: "Order Enquiry",
    value: "1",
  },
  {
    label: "Report A Problem",
    value: "2",
  },
  {
    label: "Suggestion",
    value: "3",
  },
  {
    label: "Other",
    value: "4",
  },
];

const ContactUs = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const global = useSelector((state) => state.global);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileno: "",
    schoolname: "",
    purpose: "",
    message: "",
  });
  const [contactText, setContactText] = useState("Send");
  function handle(e) {
    const n = { ...form };
    n[e.target.name] = e.target.value;
    setForm(n);
  }
  function handleSelect(selectedOption, object) {
    const n = { ...form };
    n[object.name] = selectedOption.label;
    setForm(n);
  }
  function isANumber(str) {
    return !/\D/.test(str);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
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
    if (form.mobileno.length !== 10) {
      toast.error("Mobile Number should be 10 characters and digits only!", {
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
    if (!isANumber(form.mobileno)) {
      toast.error("Mobile Number should be 10 characters and digits only!", {
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
    var url =
      "http://secure.onlinesms.in/v7/api/sms_api.php?api_key=03cb220e70982223955eb6ec20da0a59&msg=Dear " +
      `${form.name}` +
      ", %0D%0A%0D%0AThank you for contacting us. %0D%0AWe will get in touch with you soon.%0D%0A%0D%0ASincerely, %0D%0ASkoolio Team. %0D%0A%0D%0Awww.skoolio.co.in %0D%0AGyan Sindhu&senderid=GSINDU&mobnum=" +
      `${form.mobileno}` +
      "&route_id=3&entity_id=1701170435850383099&template_id=1707170453797279089";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
      });
      setContactText("Sent!")
    // if (data.success_status === "1") {
    //   toast.success(data.success_message, {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   var url =
    //     "http://secure.onlinesms.in/v7/api/sms_api.php?api_key=03cb220e70982223955eb6ec20da0a59&msg=Dear " +
    //     `${form.membername}` +
    //     ", %0D%0A%0D%0AThank you for registering with SKOOLIO. %0D%0A%0D%0APlease log in and continue. %0D%0AHappy shopping. %0D%0AHave a nice day! %0D%0A%0D%0ASkoolio Team. %0D%0AVisit www.skoolio.co.in %0D%0AGyan Sindhu&senderid=GSINDU&mobnum=" +
    //     `${form.mobileno1}` +
    //     "&route_id=3&entity_id=1701170435850383099&template_id=1707170447514837772";
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // console.log(response);
    //     });
    //   localStorage.setItem("UserData", JSON.stringify(data));
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 3000);
    // } else if (data.success_status === "0") {
    //   toast.error(data.success_message, {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // } else {
    //   toast.info(data.success_message, {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }
  };
  return (
    <Layout>
      <ToastContainer />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Contact Us
          </div>
          <div className="text-md md:text-xl">
            One Stop Solution for all Kinds of School Books & Supplies
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="flex justify-center items-center mb-24 ">
          <div className="flex w-[45%] justify-center items-center">
            <form
              action=""
              className="flex flex-col w-full p-8 gap-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex flex-col items-start">
                <p>
                  Name <span className="text-red-600">*</span>
                </p>
                <input
                  autoFocus
                  className="px-3 py-1.5 mt-1 rounded-md border w-[100%]"
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p>
                  Email <span className="text-red-600">*</span>
                </p>
                <input
                  className="px-3 py-1.5 mt-1 rounded-md border w-[100%]"
                  type="text"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p>School Name</p>
                <input
                  className="px-3 py-1.5 mt-1 rounded-md border w-[100%]"
                  type="text"
                  name="schoolname"
                  placeholder="School Name"
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p>
                  Mobile No <span className="text-red-600">*</span>
                </p>
                <input
                  className="px-3 py-1.5 mt-1 rounded-md border w-[100%]"
                  type="text"
                  name="mobileno"
                  required
                  placeholder="Mobile No"
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="my-1">
                  Purpose <span className="text-red-600">*</span>
                </p>
                <Select
                  options={purposeList}
                  onChange={handleSelect}
                  placeholder="Purpose"
                  name="purpose"
                  className="w-full"
                  required
                />
              </div>
              <div className="flex flex-col items-start">
                <p>
                  Message <span className="text-red-600">*</span>
                </p>
                <textarea
                  className="px-3 py-1.5 mt-1 rounded-md border w-[100%] h-28 flex items-start"
                  type="text"
                  name="message"
                  required
                  placeholder="Message"
                  onChange={(e) => handle(e)}
                />
              </div>
              <button className="bg-[var(--primary-c)] rounded-full text-white py-2 mt-8 hover:bg-[var(--secondary-c)] duration-300">
                {contactText}
              </button>
            </form>
          </div>
          <div className="w-[55%] flex items-start justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.816533900871!2d82.98427457938783!3d25.310367419980036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e320816f58b37%3A0x5b32cbee9fa630ae!2sGyan%20Sindhu!5e0!3m2!1sen!2sin!4v1702452222971!5m2!1sen!2sin"
              referrerpolicy="no-referrer-when-downgrade"
              className="px-4 w-full h-[620px]"
            ></iframe>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default ContactUs;
