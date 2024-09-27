export interface IuseUserListState {
  searchValue: string;
  isLoading: boolean;
  isContentLoading: boolean;
  isSearching: boolean;
  selectedItemId: string;
  isFocus: boolean;
  searchedUsers: IMember[];
  role: IOption | null;
  prevRole: IOption | null;
  companies: IOption[];
  isFetchingData: boolean;
  selectedUserName: string;
  prevName: string;
  prevEmail: string;
  isInvitation: boolean;
  givePermissionsForAPI: any[];
  prevActive: boolean | any;
  active: boolean
}
export interface IAdminUserEdit {
  name: string;
  email: string;
  active:boolean | null;
}
export interface IgetInputFieldsProps {
  options: IOption[][];
  funcArray: ((newValue: IOption, actionMeta: unknown) => void)[];
  state: {
    companies: IOption[];
    role: IOption | null;
  };
}
export interface IgetEditInputFieldsProps {
  options: IOption[][];
  state: {
    name: string;
    email: string;
    role: IOption | null;
  };
}
export interface Idata{
  id: string,
  name:string,
  email:string,
  role: string,
  active: boolean
}

export interface ISettingsItemPageContentPropsUsers
  extends TableSettingsProps,
  IPaginationPanelProps {
  modalFields:any[];
  companies?: ICompanySettings[];
  searchedCompanies?: ICompanySettings[];
  // members?: IMember[];
  // isFocus?: boolean;
  // searchedUsers?: IMember[];
  isMemeberList?: boolean;
  // isContentLoading: boolean;
  // onBlurHandler?: () => void;
  // isGuard: boolean;
  // onChangeSearchValueHandler: (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => void;
  // searchValue: string;
  // onAddClickButtonHandler: () => void;
  // onFocusSearchHandler?: () => void;
  // onResendInvitationHandler?: (token: string) => void;
  // isFetchingData: boolean;
}
