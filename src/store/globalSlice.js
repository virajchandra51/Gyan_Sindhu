import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        branch_id: -1,
        branch_name: "",
    },
    reducers: {
        updateBranch: (state, action) => {
            state.branch_id = action.payload.branch_id;
            state.branch_name = action.payload.branch_name;
        },
    },
});
export const { updateBranch } = globalSlice.actions;

export default globalSlice.reducer;