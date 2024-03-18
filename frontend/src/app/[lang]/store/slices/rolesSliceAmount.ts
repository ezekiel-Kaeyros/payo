"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoleAmountStateType {
  _id: string; 
  amount: number; 
  createdAt: string;
  updatedAt: string; 
  allRoleAmountData: Array<{
    _id: string; 
    amount: number; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: RoleAmountStateType = {
  _id: "", 
  amount: 0,
  createdAt: "", 
  updatedAt: "", 
  allRoleAmountData: [], 
};

export const roleAmountSlice = createSlice({
  name: "roleAmountData",
  initialState,
  reducers: {
    setIDDisplay: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    }, 
    setAmountState: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    }, 
    setCreatedAtState: (state, action: PayloadAction<string>) => {
      state.createdAt = action.payload;
    }, 
    setUpdatedAtState: (state, action: PayloadAction<string>) => {
      state.updatedAt = action.payload;
    }, 
    setAllRoleAmountState: (state, action) => {
      // console.log(action)
      state.allRoleAmountData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setIDDisplay, 
  setAmountState, 
  setCreatedAtState, 
  setUpdatedAtState, 
  setAllRoleAmountState, 
} = roleAmountSlice.actions;

export const roleAmountSliceReducer = roleAmountSlice.reducer;