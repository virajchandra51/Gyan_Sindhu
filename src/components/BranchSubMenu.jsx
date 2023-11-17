import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBranch } from "../store/globalSlice";
import { fetchDataFromApi } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
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
      "/api/branchlist/?apikey=FaPubWebsitegVDIo5uyTK&orgid=4&compid=0&branchid=0&ipaddress=0.0.0.0"
    );
    setBranchList(data);
    dispatch(
      updateBranch({
        branch_id: data[0].branch_id,
        branch_name: data[0].branch_description,
      })
    );
  };
  const handleBranchClick = (id, name) => {
    setShowBranchMenu(false);
    dispatch(updateBranch({ branch_id: id, branch_name: name }));
    toast.success("Branch updated successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      {showBranchMenu && (
        <ul className="bg-white absolute top-12 right-0 min-w-[270px] px-1 py-1 text-black shadow-lg">
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
                className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md"
                onClick={() =>
                  handleBranchClick(branch.branch_id, branch.branch_description)
                }
              >
                {branch.branch_description}
              </li>
            );
          })}
        </ul>
      )}
      <ToastContainer />
    </>
  );
};

export default BranchSubMenu;
