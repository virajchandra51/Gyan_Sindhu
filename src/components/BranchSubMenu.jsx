import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBranch } from "../store/globalSlice";
import { fetchDataFromApi } from "../utils/api";
import "react-toastify/dist/ReactToastify.css";

const BranchSubMenu = ({ showBranchMenu, setShowBranchMenu }) => {
  const global = useSelector((state) => state.global);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const dispatch = useDispatch();
  const fetchData = async () => {
    const data = await fetchDataFromApi(
      "branchlist",
      "compid=0&branchid=0&ipaddress=" + `${global.ip_address}`
    );
    setBranchList(data);
  };
  const handleBranchClick = (id, name) => {
    setShowBranchMenu(false);
    dispatch(updateBranch({ branch_id: id, branch_name: name }));
  };

  return (
    <>
      {showBranchMenu && (
        <ul className="bg-white absolute top-11 right-0 min-w-[500px] text-black shadow-lg">
          <li
            className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md"
            onClick={() =>
              handleBranchClick(branch.branch_id, branch.branch_description)
            }
          >
            Current Branch :
            {global.branch_id === -1 ? " None" : ` ${global.branch_name}`}
          </li>
          {branchList?.map((branch, index) => {
            return (
              <li
                key={index}
                className="h-12 flex justify-between border-b-[1px] items-center px-3 hover:bg-black/[0.03]"
                onClick={() =>
                  handleBranchClick(branch.branch_id, branch.branch_description)
                }
                on
              >
                {branch.branch_description}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default BranchSubMenu;
