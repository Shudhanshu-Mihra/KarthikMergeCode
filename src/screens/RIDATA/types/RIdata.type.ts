// Interface representing the initial state for the receipt invoice data
export interface IRIDATA_INITIAL_STATE {
    receiptInvoiceData: IReceiptInvoiceData[];  // Array of receipt invoice data
    selectedReceipt: IReceiptInvoiceData | null ;
    selectedReceiptIndex: number | null;
    selectedReceiptType: string ;
    selectedReceiptPhoto: string[];
    selectedReceiptDetails: ISelectedReceiptDetails;
}
  
// Interface representing the structure of each receipt invoice data item
export interface IReceiptInvoiceData {

    id: string;
    custom_id: string;
    description: string | null;
    status: string;
    photos: string;
    created: string;
    updated: string;
    active_status: boolean;
    approved_status: boolean;
    payment_status: boolean;
    publish_status: boolean;
    vat_code: string;
    net: string;
    tax: string;
    total: string;
    type_date: string | null ;
    // type_date: string | null;
    type_user: string | null;
    type: string;
    type_currency: string;
    is_flagged: boolean;
}
  
// Interface representing a selectable item (e.g., for dropdowns or lists)
export interface ISelectItem {
    id: string;
    created: string;
    name: string;
}
  
// Interface representing the initial state of the inbox
export interface IINBOX_INITIAL_STATE {
    count: number | null;
    totalCount: number | null;
    receipts: IReceipt[];
    selectedReciept: IReceipt | null;
    selectedRecieptIndex: number | null;
    isFetchingData: boolean;
    isAllChecked: boolean;
    isCompanyChanged: boolean;
}
  
// Interface representing the parameters for fetching receipt invoices
export interface IGetReceiptsInvoiceParams {
    status?: string;
    take?: number;
    skip?: number;
    search?:string
}
// export interface IImageKey {
//     key: string | undefined;
// }
export interface IImageView {
    keys: string[];
};
export interface IFlagPayload {
  entity: string;
  id: string;
   }
// Interface representing the structure of a POST email request
export interface IPostEmail {
    active_account: string;
    message?: string;
    receipts: string[];
    to: string;
    subject: string;
}
  
// Interface representing the state used in the Inbox component
export interface IuseInboxState {
    receiptInvoiceData: IReceiptInvoiceData[]; // Array of receipt invoice data
    isFetchingReceipts: boolean;
    statusValue: {
      value: string;
      label: string;
    };
    dateFilterValue: {
      value: string;
      label: string;
    };
    isContentLoading: boolean;
    searchValue: string;
    dateValue: Date | null;
    dateRangeValue: Date[] | null;
    formattedDate: string;
    isInputDate: boolean;
    showActions: boolean;
    checkedIds: string[];
    isLoading: boolean;
    csvData: string;
    receiptsToSend: string[];
    excelUrl: string;
}

export interface ISelectedReceiptDetails {
    id: string;
    created: string;
    status: string;
    custom_id: string;
    receipt_date: string | null;
    due_date: string | null;
    vendor: string;
    supplier: string | null;
    vat_code: string;
    net: number;
    tax: number;
    total: number;
    description: string | null;
    tableData: TableData;
    publish_status: boolean;
    active_status: boolean;
    approved_status: boolean;
    payment_status: boolean;
    photos: string[];
    currency: Currency;
    supplier_account: string | null;
    category: string | null;
    payment_type: string | null;
    company: Company;
  }

interface Currency {
    id: string;
    value: string;
    country: string;
    description: string;
    symbol: string;
  }
  
  interface Company {
    id: string;
    created: string;
    name: string;
    logo: string | null;
    date_format: string;
    active: boolean;
    tpc: boolean;
    tpc_token: string;
    tpc_wh: string;
    autoscan_email: string;
  }
  
  interface TableData {
    rows: string[][];
    headers: string[];
  }
  