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

function App() {
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
          <Route path="/failed" element={<Failed />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/:selltype" element={<SellType />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
