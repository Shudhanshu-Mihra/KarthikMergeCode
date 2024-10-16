export interface ISETTINGS_INITIAL_STATE {
  companyMembers: { members: IMember[]; count: number | null };
  companies: { companies: ICompanySettings[]; count: number };
  companySwitcher: ICompaniesSwitcher[];
  isFetchingData: boolean;
  isSwitchCompany: boolean;
  isLinkedSocAcc: boolean;
  adminUserData : IADMIN_USER[];
}
export interface IADMIN_USER{
  id: string,
  name:string,
  email:string,
  role: string,
  active: boolean
}
