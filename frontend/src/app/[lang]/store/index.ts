import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "./customStorage";
import { decaissementReducer } from "./slices/decaissementSlice";
import { userInfoSliceReducer } from "./slices/userDataSlice";
import { roleAmountSliceReducer } from "./slices/rolesSliceAmount";
import { roleSliceReducer } from "./slices/rolesSlice";
import { cashoutTypeSliceReducer } from "./slices/cashoutTypeSlice";
import { officeSliceReducer } from "./slices/officeSlice";
import { departementSliceReducer } from "./slices/departementSlice";
import { beneficiariesSliceReducer } from "./slices/beneficiarySlice";
import { allUsersReducer } from "./slices/allUsersSlice";
import { payementMethodSliceReducer } from "./slices/paymentModeSlice";
import { statusNameSliceReducer } from "./slices/statusNameSlice";
import { refreshToggleSliceReducer } from "./slices/refreshSlice";
import { allCashoutSliceReducer } from "./slices/allCashoutsSlice";
import { toggleSideBarSliceReducer } from "./slices/sideBarToggleSlice";
// import { allCashoutSliceReducer } from "./slices/allCashoutsSlice";

const cashoutPersistConfig = {
  key: "cashout",
  storage: storage,
  whitelist: ["summaryDisplay", "setAllCashoutFormInfo", "clearAllCashoutFormInfo", "setAmountInWord", "setInitiatorState", "setDateState", "setOfficeState", "setAmountState", "setPaymentModeState", "setInvoiceNumberState", "setCashoutNoteState", "setDepartementState", 
    "setDecaissementTypeState", "setAdminValidatorState", "setFinancialValidatorState", "setValidatorState"
  ],
};

const userDataPersistConfig = {
  key: "userData",
  storage: storage,
  whitelist: ["setFirstNameDisplay", "setLastNameState", "setEmailState", "setCurrentRoleState", "setCurrentRoleIDState", "setDepartementState", "setDepartementIDState", "setAmountState", "setStatusState",],
};

const roleAmountDataPersistConfig = {
  key: "roleAmountData",
  storage: storage,
  whitelist: ["setFirstNameDisplay", "setAllRoleAmountState", "setLastNameState", "setEmailState", "setCurrentRoleState", "setCurrentRoleIDState", "setDepartementState", "setDepartementIDState", "setAmountState", "setStatusState",],
};

const roleDataPersistConfig = {
  key: "roleAmountData",
  storage: storage,
  whitelist: ["setAllRoleState"],
};

const cashoutTypeDataPersistConfig = {
  key: "cashoutTypeData",
  storage: storage,
  whitelist: ["setAllCashoutTypeState"],
};

const officeDataPersistConfig = {
  key: "officeData",
  storage: storage,
  whitelist: ["setAllOfficesState"],
};

const departementDataPersistConfig = {
  key: "departementData",
  storage: storage,
  whitelist: ["setAllDepartementState"],
};

const beneficiariesDataPersistConfig = {
  key: "beneficiariesData",
  storage: storage,
  whitelist: ["setAllBeneficiariesState"],
};

const allUsersDataPersistConfig = {
  key: "allUsersData",
  storage: storage,
  whitelist: ["setAllUsersDisplay"],
};

const paymentModeDataPersistConfig = {
  key: "paymentModeData",
  storage: storage,
  whitelist: ["setAllPaymentModesState"],
};

const statusNameDataPersistConfig = {
  key: "statusNameData",
  storage: storage,
  whitelist: ["setAllStatusNameState"],
};

const refreshToggleDataPersistConfig = {
  key: "refreshToggleData",
  storage: storage,
  whitelist: ["toggleRefresh", "toggleShowRejectionNote", "togglePDFDesignStyle"],
};

const allCashoutDataPersistConfig = {
  key: "allCashoutData",
  storage: storage,
  whitelist: ["setAllCashoutsState"],
};

const toggleSideBarDataPersistConfig = {
  key: "toggleSideBarData",
  storage: storage,
  whitelist: ["setSideBarState"],
};


const rootReducer = combineReducers({
  cashout: persistReducer(cashoutPersistConfig, decaissementReducer), 
  userData: persistReducer(userDataPersistConfig, userInfoSliceReducer), 
  roleAmountData: persistReducer(roleAmountDataPersistConfig, roleAmountSliceReducer), 
  roleData: persistReducer(roleDataPersistConfig, roleSliceReducer), 
  cashoutTypeData: persistReducer(cashoutTypeDataPersistConfig, cashoutTypeSliceReducer), 
  officeData: persistReducer(officeDataPersistConfig, officeSliceReducer), 
  departementData: persistReducer(departementDataPersistConfig, departementSliceReducer), 
  beneficiariesData: persistReducer(beneficiariesDataPersistConfig, beneficiariesSliceReducer), 
  allUsersData: persistReducer(allUsersDataPersistConfig, allUsersReducer), 
  paymentModeData: persistReducer(paymentModeDataPersistConfig, payementMethodSliceReducer), 
  statusNameData: persistReducer(statusNameDataPersistConfig, statusNameSliceReducer), 
  refreshToggleData: persistReducer(refreshToggleDataPersistConfig, refreshToggleSliceReducer), 
  allCashoutData: persistReducer(allCashoutDataPersistConfig, allCashoutSliceReducer), 
  toggleSideBarData: persistReducer(toggleSideBarDataPersistConfig, toggleSideBarSliceReducer), 
});

export const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }), 
  // .concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;






// import storage from "redux-persist/lib/storage";
// import { authReducer } from "./slices/authSlice";
// import logger from "redux-logger";
// import { PersistPartial } from "redux-persist/es/persistReducer";