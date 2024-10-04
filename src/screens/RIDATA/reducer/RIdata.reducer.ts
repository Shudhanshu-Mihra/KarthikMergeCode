import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRIDATA_INITIAL_STATE } from '../types/RIdata.type';

// Initial state with an empty array for receiptInvoiceData
export const RIDATA_INITIAL_STATE: IRIDATA_INITIAL_STATE = {
  receiptInvoiceData: [
    {
      id: "",
      custom_id: "",
      description: null,
      status: "",
      photos: "",
      created: "",
      updated: "",
      active_status: true,
      approved_status: true,
      payment_status: true,
      publish_status: true,
      vat_code: "",
      net: "",
      tax: "",
      total: "",
      type_date: null,
      type_user: null,
      type: "",
      type_currency: '',
      is_flagged:false
    },
  ],
  selectedReceipt: null,
  selectedReceiptIndex:null,
  selectedReceiptType:"",
  selectedReceiptPhoto:[],
  selectedReceiptDetails: 
    {
    id: "004470c2-6779-4fa2-9bc4-d18483c4151c",
    created: "2024-09-24T04:48:45.472Z",
    status: "processing",
    custom_id: "RC002178",
    receipt_date: null,
    due_date: null,
    vendor: "P&H Plumbing",
    supplier: null,
    vat_code: "0",
    net: 7000,
    tax: 0,
    total: 7000,
    description: null,
    tableData: {
        rows: [
            [
                "Sample service\nSample plumbing service",
                "1",
                "70,00",
                "70,00",
                "Sample service 1 70,00 70,00\nSample plumbing service"
            ]
        ],
        headers: [
            "ITEM",
            "QUANTITY",
            "UNIT_PRICE",
            "PRICE",
            "EXPENSE_ROW"
        ]
    },
    publish_status: false,
    active_status: false,
    approved_status: false,
    payment_status: true,
    photos: [
        "development/capium/receipts/Screenshot 3_20240924044801.png"
    ],
    currency: {
        id: "4b33317a-3bac-4335-8998-b6a7356383f7",
        value: "GBP",
        country: "United Kingdom",
        description: "pound",
        symbol: "£"
    },
    supplier_account: null,
    category: null,
    payment_type: null,
    company: {
        id: "80864c90-ee64-4bc3-9f27-971606a05c8d",
        created: "2024-09-03T07:28:11.989Z",
        name: "Capium",
        logo: null,
        date_format: "",
        active: true,
        tpc: true,
        tpc_token: "5p7r5rwxbr-qokkr1r0xk-e2xssmq0ug",
        tpc_wh: "https://abc.com/webhooks/xyz",
        autoscan_email: "capiumreceipt@receipthub.com"
    }
  },

};

const initialState = RIDATA_INITIAL_STATE;

export const RIdataSlice = createSlice({
    name: 'RIdataSlice',
    initialState,
    reducers: {
      setreceiptInvoiceData: (
        state: IRIDATA_INITIAL_STATE,
        action: PayloadAction<IRIDATA_INITIAL_STATE['receiptInvoiceData']>
      ) => {
        state.receiptInvoiceData = action.payload;
      },
      selectReceipt: (
        state: IRIDATA_INITIAL_STATE,
        action: PayloadAction<number>
      ) => {
        state.selectedReceiptIndex = action.payload;
        state.selectedReceipt = state.receiptInvoiceData.find((item, index) => index === action.payload) || null
      },
      selectRecieptType: (
        state: IRIDATA_INITIAL_STATE,
        action: PayloadAction<string>
      ) => {
        if (state.selectedReceipt) {
          // Update the type of the selected receipt
          state.selectedReceipt.type = action.payload;
          state.selectedReceiptType = action.payload;
        }
      },
      selectRecieptPhoto: (
        state: IRIDATA_INITIAL_STATE,
        action: PayloadAction<string[]>
      ) => {
        if (state.selectedReceipt) {
          
          state.selectedReceiptPhoto = action.payload;
        }
      },
      setSelectedReceiptSubDetails: (
        state: IRIDATA_INITIAL_STATE,
        action: PayloadAction<IRIDATA_INITIAL_STATE['selectedReceiptDetails']>
      ) => {
        if (state.selectedReceipt) {
          
          state.selectedReceiptDetails = action.payload;
        }
      },
    },
  });
  
  export const { setreceiptInvoiceData ,selectReceipt ,selectRecieptType ,selectRecieptPhoto ,setSelectedReceiptSubDetails} = RIdataSlice.actions;
  
  export const RIdataReducer = RIdataSlice.reducer;