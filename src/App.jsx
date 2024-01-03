import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryBooks from "./pages/CategoryBooks";
import SellType from "./pages/SellType";
import School from "./pages/School";
import Class from "./pages/Class";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ClassSchoolBooks from "./pages/ClassSchoolBooks";
import Failed from "./pages/Failed";
import Success from "./pages/Success";
import Register from "./pages/Register";
import Publisher from "./pages/Publisher";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Item from "./pages/Item";
import Result from "./pages/Result";
import ReturnPolicy from "./pages/ReturnPolicy";
import { useEffect } from "react";
import {
  updateIPAddress,
  updateBranch,
  updateCompany,
} from "./store/globalSlice";
import { useDispatch } from "react-redux";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import { fetchDataFromApi } from "./utils/api";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const options = {
      method: "GET",
    };
    const data = await fetch("https://api.ipify.org?format=json", options);
    const res = await data.json();
    console.log(res);
    dispatch(
      updateIPAddress({
        ip_address: data.ip,
      })
    );
    const data2 = await fetchDataFromApi(
      "branchlist",
      "compid=0&branchid=0&ipaddress=" + `${res.ip}`
    );
    console.log(data2);
    dispatch(
      updateBranch({
        branch_id: data2[0].branch_id,
        branch_name: data2[0].branch_description,
      })
    );
    dispatch(
      updateCompany({
        company_id: data2[0].company_id,
        company_name: data2[0].company_name,
      })
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorybooks/:gr_name" element={<CategoryBooks />} />
          <Route path="/classschoolbooks" element={<ClassSchoolBooks />} />
          <Route path="/school" element={<School />} />
          <Route path="/publisher" element={<Publisher />} />
          <Route path="/class" element={<Class />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/item" element={<Item />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/returnpolicy" element={<ReturnPolicy />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/result" element={<Result />} />
          <Route path="/:selltype" element={<SellType />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
