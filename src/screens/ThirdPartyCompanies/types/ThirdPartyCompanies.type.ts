export interface ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE {
  ThirdPartyCompanyAllData: IThirdPartyCompanyAllData[];
}

export interface IThirdPartyCompanyAllData {
  id: string;
  name: string;
  logo: string;
  date_format: string;
  active: boolean;
  tpc: boolean;
  tpc_token: string;
  tpc_wh: string;
  autoscan_email: string;
  currency: {
    id: string;
    value: string;
    country: string;
    description: string;
    symbol: string;
  };
  members: string[];
  receipts: string[];
  suppliersAccounts: string[];
  customeraccount: string[];
  categories: string[];
  payment_types: string[];
  sales: string[];
  expense: string[];
  customerNEWaccount: string[];
  suppliersAccAccounts: string[];
}

export interface IGetThirdPartyDataParams{
  take?: number ;
  skip?: number;
  search?: string;
  active_account?: string;
}