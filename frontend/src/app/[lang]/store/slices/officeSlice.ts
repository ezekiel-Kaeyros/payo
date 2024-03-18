"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OfficeSliceStateType {
  officeData: Array<{
    _id: string; 
    name: number; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: OfficeSliceStateType = {
  officeData: [], 
};

export const officeSlice = createSlice({
  name: "officeData",
  initialState,
  reducers: { 
    setAllOfficesState: (state, action) => {
      state.officeData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllOfficesState, 
} = officeSlice.actions;

export const officeSliceReducer = officeSlice.reducer;