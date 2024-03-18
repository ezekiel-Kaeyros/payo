"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DecaissementState {
    summaryDisplay: boolean; 
    initiatorState: string; 
    date: string;
    office: string; 
    decaissementType: string; 
    beneficiary: string; 
    amount: number; 
    payementMode: string; 
    invoiceNumber: string; 
    cashoutNote: string; 
    department: string; 
    adminValidator: string; 
    financialValidator: string; 
    validator: string;
    amountInWords?: string; 
    allCahsoutInfoData?: any
}

const initialState: DecaissementState = {
    summaryDisplay: false, 
    initiatorState: "", 
    date: new Date().toISOString().split('T')[0], 
    office: "", 
    decaissementType: "",
    beneficiary: "",
    amount: 0,
    payementMode: "", 
    invoiceNumber: "", 
    cashoutNote: "", 
    department: "", 
    adminValidator: "", 
    financialValidator: "", 
    validator: "", 
    amountInWords: "", 
    allCahsoutInfoData: "",
};

export const decaissementSlice = createSlice({
  name: "cashout",
  initialState,
  reducers: {
    setAllCashoutFormInfo: (state, action: PayloadAction<any>) => {
      state.allCahsoutInfoData = action.payload;
    }, 
    clearAllCashoutFormInfo: (state) => {
      state.allCahsoutInfoData = "";
    }, 
    setSummaryDisplay: (state, action: PayloadAction<boolean>) => {
      state.summaryDisplay = action.payload;
    }, 
    setInitiatorState: (state, action: PayloadAction<string>) => {
      state.initiatorState = action.payload;
    }, 
    setDateState: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    }, 
    setOfficeState: (state, action: PayloadAction<string>) => {
      state.office = action.payload;
    }, 
    setDecaissementTypeState: (state, action: PayloadAction<string>) => {
      state.decaissementType = action.payload;
    }, 
    setAmountState: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    }, 
    setBeneficiaryState: (state, action: PayloadAction<string>) => {
      state.beneficiary = action.payload;
    }, 
    setPaymentModeState: (state, action: PayloadAction<string>) => {
      state.payementMode = action.payload;
    }, 
    setInvoiceNumberState: (state, action: PayloadAction<string>) => {
      state.invoiceNumber = action.payload;
    }, 
    setCashoutNoteState: (state, action: PayloadAction<string>) => {
      state.cashoutNote = action.payload;
    }, 
    setDepartementState: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
    }, 
    setAdminValidatorState: (state, action: PayloadAction<any>) => {
      state.adminValidator = action.payload;
    }, 
    setFinancialValidatorState: (state, action: PayloadAction<string>) => {
      state.financialValidator = action.payload;
    }, 
    setValidatorState: (state, action: PayloadAction<any>) => {
      state.validator = action.payload;
    }, 
    setAmountInWord: (state, action: PayloadAction<string>) => {
      state.amountInWords = action.payload;
    }, 
  },
});

// Action creators are generated for each case reducer function
export const { 
  setAllCashoutFormInfo, 
  clearAllCashoutFormInfo, 
  setSummaryDisplay, setInitiatorState,
  setDateState,
  setOfficeState,
  setAmountState,
  setPaymentModeState,
  setInvoiceNumberState,
  setCashoutNoteState, 
  setDepartementState, 
  setBeneficiaryState, 
  setDecaissementTypeState, 
  setAdminValidatorState,
  setFinancialValidatorState,
  setValidatorState, setAmountInWord, } = decaissementSlice.actions;

export const decaissementReducer = decaissementSlice.reducer;