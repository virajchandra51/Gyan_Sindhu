import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    branch_id: -1,
    branch_name: "",
    company_id: -1,
    company_name: "",
    ip_address: "",
  },
  reducers: {
    updateBranch: (state, action) => {
      state.branch_id = action.payload.branch_id;
      state.branch_name = action.payload.branch_name;
      console.log(state.branch_id)
    },
    updateCompany: (state, action) => {
      state.company_id = action.payload.company_id;
      state.company_name = action.payload.company_name;
      console.log(state.company_id)
    },
    updateIPAddress: (state, action) => {
      state.ip_address = action.payload.ip_address;
    },
  },
});

export const { updateBranch, updateIPAddress, updateCompany } = globalSlice.actions;

export default globalSlice.reducer;
