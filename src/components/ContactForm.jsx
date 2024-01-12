import React, { useState } from "react";
import Select from "react-select";

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

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileno: "",
    schoolname: "",
    purpose: "",
    message: "",
  });
  const [contactText, setContactText] = useState("Send");
  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
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
    var emailData = {
      service_id: "SkoolioSMTPserver",
      template_id: "ContactUsMail",
      user_id: "2luFHblbDCponNdj8",
      template_params: {
        member_name: form.name,
        email_id: form.email,
        mobile_no: form.mobileno,
        school: form.schoolname,
        purpose: form.purpose,
        message: form.message,
      },
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    }).then((response) => {
      console.log(response);
    });
    setContactText("Sent!");
    toast.success("Thankyou for your contacting us! We'll respond soon.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
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
  );
};

export default ContactForm;
