"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BeneficiarySliceStateType {
  allBeneficiariesData: Array<{
    _id: string; 
    name: number; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: BeneficiarySliceStateType = {
  allBeneficiariesData: [], 
};

export const beneficiariesSlice = createSlice({
  name: "beneficiariesData",
  initialState,
  reducers: { 
    setAllBeneficiariesState: (state, action) => {
      state.allBeneficiariesData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllBeneficiariesState, 
} = beneficiariesSlice.actions;

export const beneficiariesSliceReducer = beneficiariesSlice.reducer;