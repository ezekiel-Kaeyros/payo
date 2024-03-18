"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoleStateType {
  allRoleData: Array<{
    _id: string; 
    name: string; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: RoleStateType = {
  allRoleData: [], 
};

export const roleSlice = createSlice({
  name: "roleData",
  initialState,
  reducers: {
    setAllRoleState: (state, action) => {
      state.allRoleData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllRoleState, 
} = roleSlice.actions;

export const roleSliceReducer = roleSlice.reducer;