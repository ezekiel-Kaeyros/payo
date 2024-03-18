"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AllCashoutsSliceStateType {
    allCashoutsData: Array<{
        _id: string,
        disbursement_status_id: any,
        payment_method_id: Array<
            {
                _id: string,
                name: string,
                active: boolean,
                createdAt: string,
                updatedAt: string,
            }
        >,
        beneficiary_id: [
            {
                _id: string,
                disbursement_type_id: Array<string>,
                name: string,
                active: boolean,
                createdAt: string,
                updatedAt: string,
            }
        ],
        initiator: [
            {
                _id: string,
                role: Array<string>,
                department_id: Array<string>,
                email: string,
                first_name: string,
                last_name: string,
                password: string,
                active: boolean,
                createdAt: string,
                updatedAt: string,
            }
        ],
        disbursement_current_status: any,
        amount: number,
        active: boolean,
        invoice_number: string,
        createdAt: string,
        updatedAt: string,
    }>
}

const initialState: AllCashoutsSliceStateType = {
  allCashoutsData: [], 
};

export const allCashoutSlice = createSlice({
  name: "allCashoutsData",
  initialState,
  reducers: { 
    setAllCashoutsState: (state, action) => {
      state.allCashoutsData.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllCashoutsState, 
} = allCashoutSlice.actions; 

export const allCashoutSliceReducer = allCashoutSlice.reducer;