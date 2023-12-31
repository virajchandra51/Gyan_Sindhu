import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../utils/api";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 2, name: "About Us", url: "/about" },
  { id: 4, name: "Contact Us", url: "/contactus" },
];

const Menu = ({ showCatMenu, setShowCatMenu, setGroup }) => {
  const global = useSelector((state) => state.global);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetchData();
  }, [global.branch_id]);

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "itemgrouplist",
      "compid=9&branchid=" +
        `${global.branch_id}` +
        "&groupcode=1&ipaddress=" +
        `${global.ip_address}` +
        "&pageno=1&pagelimit=10"
    );
    setCategoryList(data);
  };
  const handleGroupClick = (id, name) => {
    setShowCatMenu(false);
    setGroup({
      group_code: id,
      group_name: name,
    });
  };

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black ">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative hover:text-[var(--primary-c)] duration-200"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] text-black shadow-lg">
                    {categoryList?.map((category, index) => {
                      return (
                        <Link
                          key={index}
                          to={`/categorybooks/${category.item_gr_name}`}
                          state={{ category: category }}
                        >
                          <li
                            onClick={() =>
                              handleGroupClick(
                                category.item_gr_code,
                                category.item_gr_name
                              )
                            }
                            className="h-12 flex justify-between border-b-[1px] items-center px-3 hover:bg-black/[0.03]"
                          >
                            {category.item_gr_name}
                            <span className="opacity-50 text-sm">
                              {category.item_count}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer hover:text-[var(--primary-c)] duration-200">
                <Link to={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
