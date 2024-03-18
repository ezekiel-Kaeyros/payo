"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SideBarToggleStateType {
  toggleSideBar: boolean
}

const initialState: SideBarToggleStateType = {
  toggleSideBar: false, 
};

export const toggleSideBarSlice = createSlice({
  name: "toggleSideBarData",
  initialState,
  reducers: {
    setSideBarState: (state, action) => {
        // console.log(action.payload, "=-=-=-=-=-=-=-=")
        state.toggleSideBar = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setSideBarState, 
} = toggleSideBarSlice.actions;

export const toggleSideBarSliceReducer = toggleSideBarSlice.reducer;