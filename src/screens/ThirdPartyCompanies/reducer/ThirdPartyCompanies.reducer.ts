import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE } from '../types/ThirdPartyCompanies.type';

// Initial state with an empty array for receiptInvoiceData
export const THIRD_PARTY_COMPANY_DATA_INITIAL_STATE: ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE = {
  ThirdPartyCompanyAllData: [{
    id: "",
    name: "",
    logo: "",
    date_format: "",
    active: true,
    tpc: true,
    tpc_token: "",
    tpc_wh: "",
    autoscan_email: "",
    currency: {
      id: "",
      value: "",
      country: "",
      description: "",
      symbol: ""
    }, // <-- Missing comma was here
    members: [],
    receipts: [],
    suppliersAccounts: [],
    customeraccount: [],
    categories: [],
    payment_types: [],
    sales: [],
    expense: [],
    customerNEWaccount: [],
    suppliersAccAccounts: []
  }]
};

const initialState = THIRD_PARTY_COMPANY_DATA_INITIAL_STATE;

export const ThirdPartyCompanySlice = createSlice({
  name: 'ThirdPartyCompanyDataSlice',
  initialState,
  reducers: {
    setThirdPartyCompanyData: (
      state,
      action: PayloadAction<ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE['ThirdPartyCompanyAllData']>
    ) => {
      state.ThirdPartyCompanyAllData = action.payload;
    },
      selectReceipt: (
        // state: IRIDATA_INITIAL_STATE,
        // action: PayloadAction<number>
      ) => {
        // state.selectedReceiptIndex = action.payload;
        // state.selectedReceipt = state.receiptInvoiceData.find((item, index) => index === action.payload) || null
      },
      selectRecieptType: (
        // state: IRIDATA_INITIAL_STATE,
        // action: PayloadAction<string>
      ) => {
        // if (state.selectedReceipt) {
        //   Update the type of the selected receipt
        //   state.selectedReceipt.type = action.payload;
        //   state.selectedReceiptType = action.payload;
        // }
      },
      selectRecieptPhoto: (
        // state: IRIDATA_INITIAL_STATE,
        // action: PayloadAction<string[]>
      ) => {
        // if (state.selectedReceipt) {
          
        //   state.selectedReceiptPhoto = action.payload;
        // }
      },
    },
  });
  
  export const { setThirdPartyCompanyData} = ThirdPartyCompanySlice.actions;
  
  export const ThirdPartyCompanyDataReducer = ThirdPartyCompanySlice.reducer;