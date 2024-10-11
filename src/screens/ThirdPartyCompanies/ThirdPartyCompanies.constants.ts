interface IcreateCompany{
  name: string;
  status:boolean;
  token:string;
  webHook:string;
  }
export const THIRD_PARTY_COMPANIES_INITIAL_STATE: IcreateCompany = {
  name: '',
  status: false,
  token: '',
  webHook: '',
};