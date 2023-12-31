import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    branch_id: -1,
    branch_name: "",
    ip_address: "",
  },
  reducers: {
    updateBranch: (state, action) => {
      state.branch_id = action.payload.branch_id;
      state.branch_name = action.payload.branch_name;
    },
    updateIPAddress: (state, action) => {
      state.ip_address = action.payload.ip_address;
    },
  },
});

export const { updateBranch, updateIPAddress } = globalSlice.actions;

export default globalSlice.reducer;
