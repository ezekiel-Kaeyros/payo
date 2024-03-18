"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DecaissementStateType {
  firstName: string; 
  lastName: string;
  email: string; 
  current_role: string; 
  current_role_id: string; 
  department: string; 
  department_id: string; 
  amount: number; 
  active: boolean; 
  adminValidator: string; 
  financialValidator: string; 
  validator: string; 
  loggedInUser?: {
    _id: string,
    role: [
        {
            user: [],
            _id: string,
            role_amount_id: [
                {
                    _id: string,
                    amount: 0,
                    createdAt: string,
                    updatedAt: string,
                }
            ],
            name: string,
            active: true,
            createdAt: string,
            updatedAt: string,
            level: number,
            status_name_id: [
                {
                    _id: string,
                    name: string,
                    active: boolean,
                    createdAt: string,
                    updatedAt: string,
                },
            ]
        }
    ],
    department_id: [
        {
            _id: string,
            office_id: Array<"">,
            user: [],
            name: string,
            active: boolean,
            createdAt: string,
            updatedAt: string,
        }
    ],
    email: string,
    first_name: string,
    last_name: string,
    active: true,
    createdAt: string,
    updatedAt: string,
  }
}

const initialState: DecaissementStateType = {
  firstName: "", 
  lastName: "", 
  email: "", 
  current_role: "",
  current_role_id: "",
  department: "",
  department_id: "", 
  adminValidator: "", 
  financialValidator: "", 
  validator: "", 
  active: true, 
  amount: 0,
  // loggedInUser: {

  // }, 
};

export const userInfoSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setFirstNameDisplay: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    }, 
    setLastNameState: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    }, 
    setEmailState: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }, 
    setCurrentRoleState: (state, action: PayloadAction<string>) => {
      state.current_role = action.payload;
    }, 
    setCurrentRoleIDState: (state, action: PayloadAction<string>) => {
      state.current_role_id = action.payload;
    }, 
    setDepartementState: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
    }, 
    setDepartementIDState: (state, action: PayloadAction<string>) => {
      state.department_id = action.payload;
    }, 
    setAmountState: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    }, 
    setStatusState: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    }, 
    // setBeneficiaryState: (state, action: PayloadAction<string>) => {
    //   state.beneficiary = action.payload;
    // }, 
    // setPaymentModeState: (state, action: PayloadAction<string>) => {
    //   state.payementMode = action.payload;
    // }, 
    // setInvoiceNumberState: (state, action: PayloadAction<string>) => {
    //   state.invoiceNumber = action.payload;
    // }, 
    // setCashoutNoteState: (state, action: PayloadAction<string>) => {
    //   state.cashoutNote = action.payload;
    // }, 
    setAdminValidatorState: (state, action: PayloadAction<string>) => {
      state.adminValidator = action.payload;
    }, 
    setFinancialValidatorState: (state, action: PayloadAction<string>) => {
      state.financialValidator = action.payload;
    }, 
    setValidatorState: (state, action: PayloadAction<string>) => {
      state.validator = action.payload;
    }, 
    setLoggedInUser: (state, action: PayloadAction<any>) => {
      state.loggedInUser = action.payload;
    }, 
  },
});

// Action creators are generated for each case reducer function
export const { setFirstNameDisplay, 
  setLastNameState, 
  setEmailState, 
  setCurrentRoleState, 
  setCurrentRoleIDState, 
  setDepartementState, 
  setDepartementIDState, 
  setAmountState, 
  setStatusState, 
  setAdminValidatorState, 
  setFinancialValidatorState, 
  setValidatorState, 
  setLoggedInUser, 
} = userInfoSlice.actions;

export const userInfoSliceReducer = userInfoSlice.reducer;