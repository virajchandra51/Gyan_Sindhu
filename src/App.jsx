import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryBooks from "./pages/CategoryBooks";
import SellType from "./pages/SellType";
import School from "./pages/School";
import Class from "./pages/Class";
import Login from "./pages/Login";
import ClassSchoolBooks from "./pages/ClassSchoolBooks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorybooks/:gr_name" element={<CategoryBooks />} />
          <Route path="/classschoolbooks" element={<ClassSchoolBooks />} />
          <Route path="/school" element={<School />} />
          <Route path="/class" element={<Class />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:selltype" element={<SellType />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
