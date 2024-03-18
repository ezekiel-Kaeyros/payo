"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DepartementSliceStateType {
  allDepartementData: Array<{
    _id: string; 
    name: number; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: DepartementSliceStateType = {
  allDepartementData: [], 
};

export const departementSlice = createSlice({
  name: "departementData",
  initialState,
  reducers: { 
    setAllDepartementState: (state, action) => {
      state.allDepartementData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllDepartementState, 
} = departementSlice.actions;

export const departementSliceReducer = departementSlice.reducer;