"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StatusNameSliceStateType {
  allStatusNameData: Array<{
    _id: string; 
    name: number; 
    createdAt: string;
    updatedAt: string; 
  }>
}

const initialState: StatusNameSliceStateType = {
  allStatusNameData: [], 
};

export const statusNameSlice = createSlice({
  name: "statusNameData",
  initialState,
  reducers: { 
    setAllStatusNameState: (state, action) => {
      state.allStatusNameData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllStatusNameState, 
} = statusNameSlice.actions;

export const statusNameSliceReducer = statusNameSlice.reducer;