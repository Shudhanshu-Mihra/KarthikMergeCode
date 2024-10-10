import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISIGN_UP_SUPPORT_USER_INITIAL_STATE } from 'screens/SignUp/types/signup.types';
import { IADMIN_USER, ISETTINGS_INITIAL_STATE } from '../types/settings.types';
import { bool, boolean } from 'yup';
import { stat } from 'fs';

export const SETTINGS_INITIAL_STATE: ISETTINGS_INITIAL_STATE = {
  companyMembers: { members: [], count: null },
  companies: { companies: [], count: 0 },
  companySwitcher: [],
  isFetchingData: false,
  isSwitchCompany: false,
  isLinkedSocAcc: false,
  // adminUserData :[],
  adminUserData : [ {id:'1',
    name:'test name',
    email:'test@gmail.com',
    role: 'test',
    active: false}],
};
const initialState = SETTINGS_INITIAL_STATE;
export const SettingsSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setMembers: (
      state: ISETTINGS_INITIAL_STATE,
      action: PayloadAction<{ members: IMember[]; count: number }>
    ) => {
      state.companyMembers.members = action.payload.members;
      state.companyMembers.count = action.payload.count;
    },
    setCompanies: (
      state: ISETTINGS_INITIAL_STATE,
      action: PayloadAction<{ companies: ICompanySettings[]; count: number }>
    ) => {
      state.companies = action.payload;
      state.isFetchingData = true;
    },
    setCompanySwitcher: (
      state: ISETTINGS_INITIAL_STATE,
      action: PayloadAction<ICompaniesSwitcher[]>
    ) => {
      state.companySwitcher = action.payload;
      state.isFetchingData = false;
    },
    setIsSwitchCompany: (
      state: ISETTINGS_INITIAL_STATE,
      action: PayloadAction<boolean>
    ) => {
      state.isSwitchCompany = action.payload;
    },
    setIsLinkedSocAcc: (
      state: ISETTINGS_INITIAL_STATE,
      action: PayloadAction<boolean>
    ) => {
      state.isLinkedSocAcc = action.payload;
    },
    setStoreAdminUserData:(
      state: ISETTINGS_INITIAL_STATE,
      action: PayloadAction<IADMIN_USER[]>
    ) =>{
      state.adminUserData = action.payload;
    },
  },
});

export const {
  setMembers,
  setCompanies,
  setCompanySwitcher,
  setIsSwitchCompany,
  setIsLinkedSocAcc,
  setStoreAdminUserData,
} = SettingsSlice.actions;

export const SettingsReducer = SettingsSlice.reducer;
