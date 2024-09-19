import { useState } from 'react';
import { useFormik } from 'formik';
import { ActionMeta, SingleValue} from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'hooks/useDebounce';
import { useToggle } from 'hooks/useToggle';
import { usePagination } from 'hooks/usePagination';

import { myAccountValidationScheme } from 'services/validation';
import { IState } from 'services/redux/reducer';
import {
  getFirstLetterUppercase,
  getSelectedUser,
  getUserRole,
} from 'services/utils';

import {
  // formikInitialValues,
  // getInputFields,
  USERS_LIST_INITIAL_STATE,
  userPermissionInitialState,
} from './userList.constants';
import { IuseUserListState, Idata} from './types/userList.types';
import {
  createCompanyMember,
  deleteCompanyMember,
  // deleteAdminUser,
  // getCompanyMembers,
  getAllAdminUsers,
  getManyCompanies,
  resendInvitation,
  createAdminUsers,
  deleteAdminUser,
  updateCompanyMember,
  createAdminUser,
} from '../settings.api';
import {setStoreAdminUserData } from '../reducer/settings.reducer';
import { updateUserAccount } from '../../SignUp/reducer/signup.reducer';

import { USER_ROLES } from 'constants/strings';
import { dropdownIndicatorCSS } from 'react-select/dist/declarations/src/components/indicators';

export const useUserListState = () => {
  const dispatch = useDispatch();
  const {
    user: {
      user: {active, role},
      // adminUserData:{selectedId},
    },
    settings: {
      companies,
      companyMembers: { count, members },
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
  const [dataAdminUsers, setDataAdminUsers] = useState<Idata[]>([]);    
  const [permissionState, setPermission] = useState(userPermissionInitialState);
  const [isPAllChecked, setPAllChecked] = useToggle();

  const onChangeRoleValueHandler = (
    newValue: IOption,
    actionMeta: ActionMeta<IOption> | unknown
  ) => onChangeStateFieldHandler('role', newValue);

  interface IADMIN_USERS {
    fullName:string;
    email:string;
    password:string;
    role:string;
  }
  const ADMIN_USERS_initialState ={
    fullName:'',
    name:'',
    email:'',
    password:'',
    role:'',
  };
  interface Ipayload {
    name: string;
    email:string;
    password:string;
    role:string;
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
  const onChangeStateFieldHandlerAdmin = (
    optionName: keyof typeof ADMIN_USERS_initialState,
    value: string
  ) => {
    setState((prevState) => ({
      ...prevState,
      [optionName]: value,
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

  const onGetAllCompanyMembersHandler = async (params?: ISearchParams) => {
    try {
      const response = await getAllAdminUsers(); 
      const usersData = response.data;
      console.log('Admin Users Response:', response.data); 
      dispatch(setStoreAdminUserData(response.data));
      // setDataAdminUsers(usersData);
      // console.log(selectedId);
      // console.log('Fetched Admin Users3:',dataAdminUsers);

      // const { data } = await getAllAdminUsers({
      //   ...params,
      //   // active_account: active_account || '',
      // });
      // state.isSearching
      //   ? onChangeStateFieldHandler('searchedUsers', data.data)
      //   : dispatch(setMembers({ count: data.count, members: data.data }));
      // setState((prevState) => ({
      //   ...prevState,
      //   isSearching: false,
      //   isFetchingData: false,
      //   isContentLoading: false,
      // }));
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

  const onChangeItemsPerPage = async (newValue: SingleValue<IOption>) => {
    // setItemsPerPage(newValue as IOption);
    onChangeStateFieldHandler('isContentLoading', true);
    onChangeStateFieldHandler('searchValue', '');

    await onGetAllCompanyMembersHandler({
      take: Number(newValue?.value),
    });

    onChangeStateFieldHandler('isContentLoading', false);
    setCurrentPage(0);
    // if (!count) return;
    // onChangePagesAmount(Number(newValue?.value), count);
  };

  const onChangePage = async ({ selected }: {selected: number}) => {
    onChangePageHandler(selected);
    onChangeStateFieldHandler('isContentLoading', true);
    state.searchValue && onChangeStateFieldHandler('searchValue', '');

    await onGetAllCompanyMembersHandler({
      take: +itemsPerPage.value,
      skip: selected * +itemsPerPage.value,
    });
    onChangeStateFieldHandler('isContentLoading', false);
  };

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
    onDeleteItem,
    itemsPerPage,
    currentPage,
    pages,
    inputPaginationValue,
   
  } = usePagination({ onChangePage });

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
    const selectedUser = getSelectedUser(members, itemId);
    const email =
      selectedUser?.memberInvite && !selectedUser?.memberInvite?.isCompanyInvite
        ? selectedUser?.memberInvite?.email
        : selectedUser?.user?.email;

    // formik.setValues({
    //   email: email || '',
    //   fullName: selectedUser?.name || '',
      
    // });
    setIsEdit(true);
    setState((prevState) => ({
      ...prevState,
      role: {
        label: getFirstLetterUppercase(selectedUser?.role || ''),
        value: selectedUser?.role || '',
      },
      prevRole: {
        label: getFirstLetterUppercase(selectedUser?.role || ''),
        value: selectedUser?.role || '',
      },
      prevName: selectedUser?.name || '',
      prevEmail:
        selectedUser?.user?.email || selectedUser?.memberInvite?.email || '',
      selectedItemId: itemId,
      selectedUserName: selectedUser?.name || '',
      isInvitation:
        selectedUser?.memberInvite &&
        !selectedUser?.memberInvite?.isCompanyInvite
          ? true
          : false,
    }));
    onModalWindowToggle();
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
      await onGetAllCompanyMembersHandler({ skip, take: +itemsPerPage.value });
      onDeleteItem(count, isLastElementOnPage);
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
              password: values.password
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
      // await onGetAllCompanyMembersHandler({
      //   take: +itemsPerPage.value,
      // });
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
      setIsResendSuccessPopup();
    } catch (error) {
      console.log(error);
    }
  };

  const onFocusSearchHandler = () => onChangeStateFieldHandler('isFocus', true);
  const onBlurHandler = () => onChangeStateFieldHandler('isFocus', false);

  // const modalFields = getInputFields({
  //   options: [USER_ROLES, formattedCompanies],
  //   state: { role: state.role, companies: state.companies },
  //   funcArray: [onChangeRoleValueHandler, onChangeCompanyValueHandler],
  // });

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
        const adminInviteFormArr = [
          {
            type: 'input',
            label: 'Full Name',
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
            value: state.role,
            options: USER_ROLES,
            isDisabled: false,
            onChangeSelect: onChangeRoleValueHandler,
          },
        ];
  return {
    ...state,
    active,
    // userRole,
    isEdit,
    currentPage,
    pages,
    inputPaginationValue,
    itemsPerPage,
    count,
    // modalFields,
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
  };
};
