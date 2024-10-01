import { useState } from 'react';
import { useFormik } from 'formik';
import { ActionMeta, SingleValue} from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'hooks/useDebounce';
import { useToggle } from 'hooks/useToggle';
import { usePagination } from 'hooks/usePagination';
import { SuccessModalWindow } from 'components/SuccessModalWindow';
import { myAccountValidationScheme } from 'services/validation';
import { IState } from 'services/redux/reducer';
import {
  getFirstLetterUppercase,
getSelectedAdminUser,
  getSelectedUser,
  getUserRole,
} from 'services/utils';
import { setMembers } from '../reducer/settings.reducer';
import {
  getInputFields,
  USERS_LIST_INITIAL_STATE,
  userPermissionInitialState,
  getEditInputFields,
} from './userList.constants';
import { IuseUserListState, Idata} from './types/userList.types';
import {
  createCompanyMember,
  deleteCompanyMember,
  getAllAdminUsers,
  getManyCompanies,
  resendInvitation,
  createAdminUsers,
  deleteAdminUser,
  updateCompanyMember,
  createAdminUser,
  updateAdminUsers,
} from '../settings.api';
import {setStoreAdminUserData } from '../reducer/settings.reducer';
import { updateUserAccount } from '../../SignUp/reducer/signup.reducer';

import { USER_ROLES, IS_ACTIVE, EDIT_USERS} from 'constants/strings';
import { dropdownIndicatorCSS } from 'react-select/dist/declarations/src/components/indicators';
import { is } from 'date-fns/locale';
import { stat } from 'fs';
import { bool, boolean } from 'yup';
// import { isDisabled } from '@testing-library/user-event/dist/types/utils';
// import { isDisabled } from '@testing-library/user-event/dist/types/utils';

export const useUserListState = () => {
  const dispatch = useDispatch();
  const {
    user: {
      user: {active, role},
    },
    settings: {
      companies,
      companyMembers: { count, members },
      adminUserData
    },
  } = useSelector((state: IState) => state);

  // const userRole = getUserRole(accounts || [], active_account || '');
  const initialState = USERS_LIST_INITIAL_STATE;

  const [state, setState] = useState<IuseUserListState>(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalWindowOpen, onModalWindowToggle] = useToggle();
  const [isDeleteModalWindowOpen, onDeleteModalWindowToggle] = useToggle();
  const [isSentSuccessPopup, setIsSentSuccessPopup] = useToggle();
  const [isResentSuccessPopup, setIsResendSuccessPopup] = useToggle();
  // const [isResentSuccessPopup, setIsResendSuccessPopup] = useState(false);
  const [dataAdminUsers, setDataAdminUsers] = useState<Idata[]>([]);    
  const [permissionState, setPermission] = useState(userPermissionInitialState);
  const [isPAllChecked, setPAllChecked] = useToggle();
  console.log("isModalWindowOpen: ",isModalWindowOpen);
  const onChangeRoleValueHandler = (
    newValue: IOption,
    actionMeta: ActionMeta<IOption> | unknown
  ) => onChangeStateFieldHandler('role', newValue);

  const onChangeActiveValueHandler = (
    newValue: IoptionActive,
    actionMeta: ActionMeta<IoptionActive> | unknown
  ) => {
    console.log("newValue:",newValue.value)
    onChangeStateFieldHandlerval('active', newValue.value); 
  };
 
  const ADMIN_USERS_initialState ={
    fullName:'',
    name:'',
    email:'',
    password:'',
    role:'',
    active:false,
  };
  interface Ipayload {
    name: string;
    email:string;
    password:string;
    role:string;
    active:boolean;
  }
    const formik = useFormik({
      initialValues: ADMIN_USERS_initialState,
      onSubmit: (values) =>
        isEdit ? onEditUserHandler(values) : onInviteUserToCompanyHandler(values),
      validationSchema: myAccountValidationScheme,
      validateOnBlur: true,
    });

  // const formattedCompanies = companies?.companies?.map((item) => ({
  //   value: item.id,
  //   label: item.name,
  // }));


  // const onChangePermissionHanler = (id) => {
  //   setPermissions((prevPermissions) =>
  //     prevPermissions.map((permission) =>
  //       permission.p_id === id
  //         ? { ...permission, isChecked: !permission.isChecked }
  //         : permission
  //     )
  //   );
  // };
// permission start here 
const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
// permission end here 
  const onModalWindowCancelClickButtonHandler = () => {
    onModalWindowToggle();
    isEdit && setIsEdit(false);
    onChangeStateFieldHandler('role', { value: '', label: '' });
    onChangeStateFieldHandler('companies', null);
    onChangeStateFieldHandler('isInvitation', false);
    formik.resetForm();
  };

  const onModalWindowToggleHandler = () => {
    // onGetCompaniesHandler();
    onModalWindowToggle();
  };
  const onChangeStateFieldHandler = (
    optionName: keyof typeof initialState,
    value: string | boolean | number | SingleValue<IOption> | IMember[]
  ) => {
    setState((prevState) => ({
      ...prevState,
      [optionName]: value,
    }));
  };
  // const onChangeStateFieldHandlerval = (
  //   optionName: keyof typeof initialState,
  //   value: string | boolean | number | SingleValue<IOption> | IMember[]
  // ) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     [optionName]: value, 
  //   }));
  // };
  const onChangeStateFieldHandlerval = (
    optionName: keyof typeof initialState,
    value: string | boolean | number | SingleValue<IOption> | IMember[]
  ) => {
    const updatedValue = 
      typeof value === 'object' && value !== null && 'value' in value 
      ? (value as IOption).value 
      : value;
  
    setState((prevState) => ({
      ...prevState,
      [optionName]: updatedValue, 
    }));
  };
  const PermissionsForAPIHandler = (selectedPermission: any[]) => {
    onChangeStateFieldHandler('givePermissionsForAPI', selectedPermission);
  }
  const onChangeCompanyValueHandler = (
    newValue: IOption,
    actionMeta: ActionMeta<IOption> | unknown
  ) => onChangeStateFieldHandler('companies', newValue);

  const onGetCompaniesHandler = async () => {
    try {
      const { data: companiesData } = await getManyCompanies({});
      // dispatch(
      //   setCompanies({
      //     companies: companiesData.data,
      //     count: companiesData.count,
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
  };
const [countState, setNewCount] = useState<number>(0);

  // const onGetAllCompanyMembersHandler = async (params?: ISearchParams) => {
  //   try {
  //     const response = await getAllAdminUsers(); 
  //     dispatch(setStoreAdminUserData(response.data));
  //     setNewCount(response.data.length);
  //   } catch (error) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       isSearching: false,
  //       searchedUsers: [],
  //       isFetchingData: false,
  //       isContentLoading: false,
  //     }));
  //     console.log(error);
  //   }
  // };
  const onGetAllCompanyMembersHandler = async (params?: { queryString: string }) => {
    try {
      const response = await getAllAdminUsers(params?.queryString); 
      dispatch(setStoreAdminUserData(response.data));
      setNewCount(response.data.length);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isSearching: false,
        searchedUsers: [],
        isFetchingData: false,
        isContentLoading: false,
      }));
      console.log(error);
    }
  };
  // const onChangeItemsPerPage =async  (newItemsPerPage) => {
  //   setCurrentPage(1);
  //   setItemsPerPage(newItemsPerPage as IOption);
  //   onChangePagesAmount(Number(newItemsPerPage?.value), countState);
  //   // await onGetAllCompanyMembersHandler({
  //   //   // take: +newItemsPerPage,
  //   //   take: Number(newItemsPerPage?.value),               
  //   // });
  //   await onGetAllCompanyMembersHandler();
  // };
  const onChangeItemsPerPage = async (newItemsPerPage: IOption) => {
    const take = Number(newItemsPerPage?.value); 
    const skip = 0; 
  
    const queryString = `take=${take}&skip=${skip}`; 
  
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // reset to first page
    onChangePagesAmount(Number(newItemsPerPage?.value), countState);
    await onGetAllCompanyMembersHandler({ queryString });
  };
  // const onChangePage = async ({ selected }: {selected: number}) => {
  //   onChangePageHandler(selected);
  //   // onChangeStateFieldHandler('isContentLoading', true);
  //   // state.searchValue && onChangeStateFieldHandler('searchValue', '');
  //   const startIndex = selected * +itemsPerPage.value;
  //   const endIndex = startIndex + +itemsPerPage.value;
  //   await onGetAllCompanyMembersHandler();
  //   onChangeStateFieldHandler('isContentLoading', false);
  // };
  
  const onChangePage = async ({ selected }: { selected: number }) => {
    const take = +itemsPerPage.value; 
    const skip = selected * take; 
    const queryString = `take=${take}&skip=${skip}`; 
    await onGetAllCompanyMembersHandler({ queryString });
    onChangeStateFieldHandler('isContentLoading', false);
  };
  
  const {
    onBackwardClick,
    onForwardClick,
    onGoToClick,
    onEnterGoToClick,
    onChangePaginationInputValue,
    onChangePagesAmount,
    onChangePageHandler,
    setItemsPerPage,
    setCurrentPage,  
    itemsPerPage, 
    currentPage,
    pages,
    inputPaginationValue,
  } = usePagination({
    onChangePage,
  });
  const debouncedValue = useDebounce(state.searchValue, 250);
  const onEnterInsertUser = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    formik.handleSubmit();
  };
  const onChangeSearchValueHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prevState) => ({
      ...prevState,
      searchValue: event.target.value,
      isContentLoading: true,
      isSearching: true,
    }));
  };
  const onDeleteIconClickHandler = async (itemId: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        selectedItemId: itemId,
        selectedUserName: selectedUser?.name || '',
      }));
      const selectedUser = getSelectedUser(members, itemId);
      onDeleteModalWindowToggle();
    } catch (error) {
      console.log(error);
    }
  };

  const onEditIconClickHandler = (itemId: string) => {
    onModalWindowToggle();

    const selectedUser = getSelectedAdminUser(adminUserData, itemId);
    const email = selectedUser?.email || '';
    setIsEdit(true);
    setState((prevState) => ({
      ...prevState,
    
      prevName: selectedUser?.name || '',
      prevEmail: selectedUser?.email || '',
      prevActive: selectedUser?.active,
      selectedItemId: itemId,
      // selectedUserName: selectedUser?.name || '',
    }));
    // onModalWindowToggle();
    // console.log(state?.prevName);
    // console.log(state?.prevEmail);
    // console.log(state?.prevActive);
    // console.log(state?.selectedItemId);
  };
  const onClickDeleteUserButton = async () => {
    try {
      const isLastElementOnPage = members.length === 1;
      count === 1 && onChangeStateFieldHandler('isFetchingData', true);
      onChangeStateFieldHandler('isLoading', true);
      const skip =
        currentPage === 0
          ? 0
          : isLastElementOnPage && count !== 1
          ? (currentPage - 1) * +itemsPerPage.value
          : currentPage * +itemsPerPage.value;

      // await deleteCompanyMember(
      //   state.selectedItemId || '',
      //   active_account || ''
      // );
      // await onGetAllCompanyMembersHandler({ skip, take: +itemsPerPage.value });
      // onDeleteItem(count, isLastElementOnPage);
      onChangeStateFieldHandler('isLoading', false);
      onChangeStateFieldHandler('isFetchingData', false);
      onDeleteModalWindowToggle();
    } catch (error) {
      onChangeStateFieldHandler('isLoading', false);
      onChangeStateFieldHandler('isContentLoading', false);
      onChangeStateFieldHandler('isFetchingData', false);
      onDeleteModalWindowToggle();
      console.log(error);
    }
  };

  const onEditUserHandler = async (values: typeof ADMIN_USERS_initialState) => {
    try {
      onChangeStateFieldHandler('isLoading', true);
      const payload =
        {
              // role: values.role || '',
              name: values.fullName,
              email: values.email,
              // password: values.password,
              active: values.active
              // isInviteCompanyMember: state.isInvitation,
            };
            console.log("payload",payload);
      // const { data: updatedAcc } = await updateCompanyMember(
      //   { ...payload, active_account: active_account || '' },
      //   state.selectedItemId
      // );
      // if (!state.isInvitation && active_account === state.selectedItemId) {
      //   dispatch(updateUserAccount(updatedAcc));
      // }
      // const { data } = await getCompanyMembers({
      //   active_account: active_account || '',
      //   take: +itemsPerPage.value,
      //   skip: currentPage * +itemsPerPage.value,
      // });

      // dispatch(setMembers({ count: data.count, members: data.data }));
      // onChangeStateFieldHandler('isLoading', false);
      // state.isInvitation && onChangeStateFieldHandler('isInvitation', false);
      // setIsEdit(false);
      // formik.resetForm();
      // onModalWindowToggle();
    } catch (error) {
      onChangeStateFieldHandler('isLoading', false);
      onChangeStateFieldHandler('isInvitation', false);
      setIsEdit(false);
      formik.resetForm();
      onModalWindowToggle();
      console.log(error);
    }
  };
  const [aminName, setAminName] = useState('test');
  const [AdminEmail, setAdminEmail] = useState('test@gmail.com');
  const modalFieldsNew = [
    {
      type: 'input',
      label: 'Full Name',
      name: 'name',
      isDisabled: false,
      value:aminName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAminName(e.target.value),
    },
    {
      type: 'input',
      label: 'Email',
      name: 'email',
      // value: state.prevName,
      value: AdminEmail,
      // options: USER_ROLES,
      isDisabled: false,
      // onChangeSelect: onChangeRoleValueHandler,
       onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAdminEmail(e.target.value),
    },
    {
      type: 'select',
      name: 'select',
      label: 'Active',
      value: state.role,
      options: IS_ACTIVE,
      isDisabled: false,
      onChangeSelect: onChangeRoleValueHandler,
    },
  ];
  const onInviteUserToCompanyHandler = async (
    values: typeof ADMIN_USERS_initialState
  ) => {
    try {
      onChangeStateFieldHandler('isLoading', true);
      const payload = {
        email: values.email || '',
        password: values.password || '',
        name: values.fullName || '',
        // name: values.name || '',
        role:state.role?.value || '',
        // companiesIds: state.companies?.map((item) => item.value) || [],
        // thisUserPermissions: state.givePermissionsForAPI,
        // email: "Test",
        // password:"test",
        // name: "test",
        // // name: values.name || '',
        // // role: state.role?.value || '',
        // role:"test",
      };
      console.log("payload----",payload);
      await createAdminUsers(payload);
      onChangePageHandler(0);
      setIsResendSuccessPopup();
      await onGetAllCompanyMembersHandler();
      onModalWindowToggle();
      onChangeStateFieldHandler('isLoading', false);
      onChangeStateFieldHandler('role', { value: '', label: '' });
      onChangeStateFieldHandler('companies', null);
      setIsSentSuccessPopup();
      formik.resetForm();
    } catch (error) {
      onModalWindowToggle();
      formik.resetForm();
      onChangeStateFieldHandler('role', { value: '', label: '' });
      onChangeStateFieldHandler('companies', null);
      onChangeStateFieldHandler('isLoading', false);
      console.log(error);
    }
  };

  const onFormSubmitHandler = async (values:Ipayload) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        role: state.role?.value,
        password: values.password,
      };
      await createAdminUser(payload);
      onGetAllCompanyMembersHandler();
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  };

  const onFormSubmitHandlerEdit = async (id: string, values:Ipayload) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        active: state.active,
        
      };
      await updateAdminUsers(payload, id);
      onGetAllCompanyMembersHandler();
      console.log("Editing admin users",payload)
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  };

  const onResendInvitationHandler = async (inviteId: string) => {
    try {
      await resendInvitation(inviteId);
      // const { data } = await getCompanyMembers({
      //   active_account: active_account || '',
      // });
      // dispatch(setMembers({ count: data.count, members: data.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const onFocusSearchHandler = () => onChangeStateFieldHandler('isFocus', true);
  const onBlurHandler = () => onChangeStateFieldHandler('isFocus', false);
  const formattedCompanies = companies?.companies?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
//   const modalFields = getInputFields({
//     options: [USER_ROLES],
//     state: { role: state.role, companies: state.companies },
//     funcArray: [onChangeRoleValueHandler, onChangeCompanyValueHandler],
//   });
// //new
//   const newmodalFields = getEditInputFields({
//     options: [USER_ROLES],
//     state: { role: state.role, email:state.prevEmail, name: state.prevName },
//   });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => void
  formik.handleChange(event);

  // const createAdminUsers = useFormik({
  //   initialValues: adminState,
  //   validateOnBlur: true,
  //   onSubmit: (values) => {
  //     console.log('Collected Data:', values);
  //     // Call the handler passed as a prop with the form values
  //     // onSaveNewPasswordHandler(values);
  //     onInviteUserToCompanyHandler(values);
  //   },
  // });
  // const getDefaultRole = (userRole: string) => {
  //   if (role === 'admin') {
  //     return { value: 'support-admin', label: 'Support Admin' };
  //   }
  //   if (role === 'superadmin') {
  //     return { value: 'admin', label: 'Admin' };
  //   } 
  // };

  
  const isDisableButton =
    isEdit && !state.isInvitation
      ? state.prevRole?.value === state.role?.value
      : isEdit && state.isInvitation
      ? !formik.isValid ||
        (state.prevEmail === formik.values.email &&
          state.prevName === formik.values.fullName &&
          state.prevRole?.value === state.role?.value)
      : state.role?.value === 'admin'
      ? !formik.isValid || !formik.dirty || !state.role?.value
      : !formik.isValid ||
        !formik.dirty ||
        !state.role?.value ||
          !state.companies?.length;
  
        const adminInviteFormArr  = [
          {
            type: 'input',
            label: 'Name',
            name: 'name',
          },
          {
            type: 'input',
            label: 'Email',
            name: 'email',
          },
          {
            type: 'input',
            label: 'Password',
            name: 'password',
          },
          {
            type: 'select',
            label: 'Role',
            name: 'role',
            options: USER_ROLES,
            isDisabled: false,
            onChangeSelect: onChangeRoleValueHandler,
          },
          {
            type: 'input',
            label: 'Name',
            name: 'name',
          },
          {
            type: 'input',
            label: 'Email',
            name: 'email',
          },
          {
            type: 'select',
            label: 'Active',
            name: 'active',
            isDisabled:false,
            options: IS_ACTIVE,
            onChangeSelect: onChangeActiveValueHandler,
          },
        ];

        
  return {
    ...state,
    active,
    // editModalFields,
    // userRole,
    isEdit,
    currentPage,
    pages,
    inputPaginationValue,
    itemsPerPage,
    // count,
    formik,
    adminInviteFormArr,
    members,
    debouncedValue,
    isModalWindowOpen,
    isDeleteModalWindowOpen,
    isDisableButton,
    onResendInvitationHandler,
    onChangePage,
    onEditUserHandler,
    onChangePagesAmount,
    onModalWindowCancelClickButtonHandler,
    onModalWindowToggleHandler,
    onBlurHandler,
    onFocusSearchHandler,
    onClickDeleteUserButton,
    onInviteUserToCompanyHandler,
    onGetAllCompanyMembersHandler,
    onEditIconClickHandler,
    onDeleteIconClickHandler,
    onModalWindowToggle,
    onDeleteModalWindowToggle,
    onChangeSearchValueHandler,
    onEnterInsertUser,
    onChangePaginationInputValue,
    onForwardClick,
    onBackwardClick,
    onEnterGoToClick,
    onChangeItemsPerPage,
    onGoToClick,
    onGetCompaniesHandler,
    isSentSuccessPopup,
    setIsSentSuccessPopup,
    isResentSuccessPopup,
    setIsResendSuccessPopup,
    isPAllChecked,
    permissionState,
    setPermission,
    setPAllChecked,
    setIsSecondModalOpen,
    isSecondModalOpen,
    onFormSubmitHandler,
    PermissionsForAPIHandler,
    createAdminUsers,
    dataAdminUsers,
    setCurrentPage,
    // newmodalFields,
     modalFieldsNew,
    // searchedCompanies,
    // isMemeberList,
    onFormSubmitHandlerEdit,
    adminUserData,
    countState,
    onChangePageHandler,
    // countState
  };
};
