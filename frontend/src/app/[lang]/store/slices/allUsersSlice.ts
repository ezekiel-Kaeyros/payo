"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AllUserSliceStateType {
  allUserData: Array<{
    _id: string;
    firstName?: string; 
    lastName?: string; 
    departments?: string | Array<[]>; 
    roles?: string | Array<[]>; 
    email: string; 
    password: string; 
    active: boolean; 
    createdAt?: string; 
    updatedAt?: string; 
  }>
}

const initialState: AllUserSliceStateType = {
  allUserData: [], 
  // firstName: "", 
  // lastName: "", 
  // departments: "", 
  // roles: [] || "", 
  // email: "", 
  // password: "", 
  // active: false, 
  // createdAt: new Date().toISOString().split('T')[0], 
  // updatedAt: new Date().toISOString().split('T')[0], 
};

export const allUsersSlice = createSlice({
  name: "allUsersData",
  initialState,
  reducers: {
    setAllUsersDisplay: (state, action) => {
      state.allUserData.push(action.payload)
    }, 
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllUsersDisplay,  
} = allUsersSlice.actions;

export const allUsersReducer = allUsersSlice.reducer;