"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RefreshSliceStateType {
  refresh: boolean; 
  showRejectionNote: boolean; 
  changePDFDesignStyle: boolean; 
}

const initialState: RefreshSliceStateType = {
    refresh: false, 
    showRejectionNote: false, 
    changePDFDesignStyle: false, 
};

export const refreshToggleSlice = createSlice({
  name: "refreshToggleData",
  initialState,
  reducers: {
    toggleRefresh: (state, action: PayloadAction<boolean>) => {
        state.refresh = action.payload;
    }, 
    toggleShowRejectionNote: (state, action: PayloadAction<boolean>) => {
      state.showRejectionNote = action.payload;
    }, 
    togglePDFDesignStyle: (state, action: PayloadAction<boolean>) => {
      state.changePDFDesignStyle = action.payload;
    }, 
  }, 
});

// Action creators are generated for each case reducer function
export const { 
    toggleRefresh, 
    toggleShowRejectionNote, 
    togglePDFDesignStyle, 
} = refreshToggleSlice.actions;

export const refreshToggleSliceReducer = refreshToggleSlice.reducer;