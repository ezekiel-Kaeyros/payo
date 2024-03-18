"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaymentModeSliceStateType {
  allPayementModeData: Array<{
    _id: string; 
    name: number; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: PaymentModeSliceStateType = {
  allPayementModeData: [], 
};

export const payementMethodSlice = createSlice({
  name: "paymentModeData",
  initialState,
  reducers: { 
    setAllPaymentModesState: (state, action) => {
      state.allPayementModeData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllPaymentModesState, 
} = payementMethodSlice.actions;

export const payementMethodSliceReducer = payementMethodSlice.reducer;