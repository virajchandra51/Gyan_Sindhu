import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";

import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import BranchSubMenu from "./BranchSubMenu";
import ProfileSubMenu from "./ProfileSubMenu";
import MenuMobile from "./MenuMobile";

import { BsCart, BsSearch, BsPerson, BsHouse } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import logo from "../assets/logo.webp";

const SellTypeData = [
  { id: 1, name: "School", url: "/school", icon: "✍🏼" },
  { id: 2, name: "Publication", url: "/publisher", icon: "✍🏼" },
  { id: 3, name: "Subject", url: "/subject", icon: "📘" },
  { id: 4, name: "Author", url: "/writer", icon: "✍🏼" },
];

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[150px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  const cart = useSelector((state) => state.cart);
  // console.log(cart);

  const [userData, setUserData] = useState({
    data: [],
    loading: true,
  });

  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate("/result", { state: { search: search, pageno: 1 } });
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

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
    }
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const [group, setGroup] = useState({
    group_code: -1,
    group_name: "",
  });
  // console.log(group);
  // console.log(showBranchMenu);

  return (
    <header
      className={`w-full bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 flex-col ${show}`}
    >
      <Wrapper className="h-[100px] flex justify-between items-center">
        <Link to="/">
          <img src={logo} className="w-[180px] md:w-[220px]" />
        </Link>
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          group={group}
          setGroup={setGroup}
        />
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            group={group}
            setGroup={setGroup}
            setMobileMenu={setMobileMenu}
          />
        )}
        <div className="bg-gray-200 w-[300px] rounded py-2 justify-start items-center hidden lg:flex">
          <input
            className="text-sm mx-3 text-black w-full bg-transparent outline-none"
            placeholder="Search our store here.."
            type="text"
            name="search"
            onKeyDown={handleSearch}
            value={search}
            onChange={handleSearchChange}
          />
          <BsSearch className="mx-3 fill-black cursor-pointer" />
        </div>
        <div className="flex items-center text-black">
          {/* Icon start */}
          <div
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] duration-200 cursor-pointer relative"
          >
            <ProfileSubMenu
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={setShowProfileMenu}
            />
            <BsPerson className="text-[19px] md:text-[24px]" />
            {userData.data.member_id !== "-1" && (
              <MdVerified className="absolute text-[12px] md:text-[16px] fill-[var(--secondary-c)] right-0 md:right-1 bottom-1 md:bottom-2" />
            )}
          </div>
          {/* Icon end */}

          {/* Icon start */}
          <Link to="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cart.cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cart.cartItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}

          {/* Icon start */}
          <div
            onMouseEnter={() => setShowBranchMenu(true)}
            onMouseLeave={() => setShowBranchMenu(false)}
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] duration-200 cursor-pointer relative"
          >
            <BranchSubMenu
              showBranchMenu={showBranchMenu}
              setShowBranchMenu={setShowBranchMenu}
            />
            <BsHouse className="text-[15px] md:text-[20px]" />
          </div>
          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] duration-200 cursor-pointer relative ">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
      <div className="bg-[var(--primary-c)] h-[50px] w-full flex">
        <ul className="flex items-center justify-center text-white px-0 md:px-4">
          {SellTypeData?.map((item, index) => {
            return (
              <li
                className="h-full flex items-center px-4 hover:bg-[var(--secondary-c)] hover:text-white duration-200 font-semibold"
                key={index}
              >
                <Link
                  state={{
                    sellType: item.url.toLowerCase().substring(1),
                    sellTypeTitle: item.name,
                    sellTypeIcon: item.icon,
                  }}
                  to={`${item.url}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
