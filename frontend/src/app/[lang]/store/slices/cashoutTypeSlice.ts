"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CashoutTypeSliceStateType {
  allTypeCashoutData: Array<{
    _id: string; 
    name: number; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: CashoutTypeSliceStateType = {
  allTypeCashoutData: [], 
};

export const cashoutTypeSlice = createSlice({
  name: "cashoutTypeData",
  initialState,
  reducers: { 
    setAllCashoutTypeState: (state, action) => {
      state.allTypeCashoutData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllCashoutTypeState, 
} = cashoutTypeSlice.actions;

export const cashoutTypeSliceReducer = cashoutTypeSlice.reducer;