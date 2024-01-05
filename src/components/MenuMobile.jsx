import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../utils/api";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact Us", url: "/contactus" },
];

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setGroup,
  setMobileMenu,
}) => {
  const global = useSelector((state) => state.global);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetchData();
  }, [global.branch_id]);

  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "itemgrouplist",
      "compid=" +
        `${global.company_id}` +
        "&branchid=" +
        `${global.branch_id}` +
        "&groupcode=1&ipaddress=" +
        `${global.ip_address}` +
        "&pageno=1&pagelimit=10"
    );
    setCategoryList(data);
  };
  const handleGroupClick = (id, name) => {
    setShowCatMenu(false);
    setMobileMenu(false);
    setGroup({
      group_code: id,
      group_name: name,
    });
  };

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[90px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>
                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
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
                            className="py-4 px-8 border-t flex justify-between"
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
              <li className="py-4 px-5 border-b">
                <Link to={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
