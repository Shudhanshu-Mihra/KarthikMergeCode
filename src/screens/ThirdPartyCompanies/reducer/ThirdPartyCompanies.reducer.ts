import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE } from '../type/ThirdPartyCompanies.type';

// Initial state with an empty array for receiptInvoiceData
export const THIRD_PARTY_COMPANY_DATA_INITIAL_STATE: ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE = {
  ThirdPartyCompanyAllData: [{
    id: "",
    name: "",
    logo: "" ,
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
    },
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
    }],
    SelectedThirdPartyCompanyData: {
        
        id: "",
        created: "",
        name: "",
        logo: null,
        date_format: "",
        active: false,
        tpc: false,
        tpc_token: "",
        tpc_wh: "",
        autoscan_email: ""
    
    }
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
      // setSelectedThirdPartyCompanyData: (
      //   state,
      //   action: PayloadAction<ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE['SelectedThirdPartyCompanyData']>
      // ) => {
      //   state.SelectedThirdPartyCompanyData = action.payload;
    // },
    setSelectedThirdPartyCompanyData: (
      state,
      action: PayloadAction<ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE['SelectedThirdPartyCompanyData']>
    ) => {
      const { id } = action.payload;
    
      // Update only the matching item in ThirdPartyCompanyAllData
      state.ThirdPartyCompanyAllData = state.ThirdPartyCompanyAllData.map((item) => {
        if (item.id === id) {
          return {
            ...item, // spread existing data
            ...action.payload, // update with the new selected data
          };
        }
        return item;
      });
    
      // Optionally, you can store the selected data separately
      state.SelectedThirdPartyCompanyData = action.payload;
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
  
  export const { setThirdPartyCompanyData,setSelectedThirdPartyCompanyData} = ThirdPartyCompanySlice.actions;
  
  export const ThirdPartyCompanyDataReducer = ThirdPartyCompanySlice.reducer;