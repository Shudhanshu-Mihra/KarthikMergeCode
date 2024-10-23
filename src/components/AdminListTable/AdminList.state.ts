import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useUserListState } from 'screens/Settings/UsersList/UserList.state';
import { deleteAdminUser } from 'screens/Settings/settings.api';
import { ROUTES } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import { EDIT_USER_INITIAL_STATE, USERS_LIST_INITIAL_STATE } from 'screens/Settings/UsersList/userList.constants';
import { ActionMeta } from 'react-select';
import { IAdminUserEdit, } from 'screens/Settings/UsersList/types/userList.types';
import { USER_ROLES } from 'constants/strings';
type SingleValue<Option> = Option | null;
export const useAdminListTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [reAssignData, setReAssignData] = useState('');
  const [reAssignUserName, setreAssignUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserEdit, setSelectedUserEdit] = useState<string>('');
  const [userNameAdmin, setUserNameAdmin] = useState<string | undefined>('');
  const [userFilterOptions, setUserFilterOptions] = useState<IOption[]>([]);
  const [isReassignModalOpen, setisReassignModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aminName, setAminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [aminActive, setAminActive] = useState<boolean>(false);
  
  const initialState = EDIT_USER_INITIAL_STATE;
  const [state, setState] = useState<IAdminUserEdit>(initialState);
  const {
    formik,
    onGetAllCompanyMembersHandler,
    onFormSubmitHandlerEdit,
    onEnterInsertUser,
    onModalWindowCancelClickButtonHandler,
    selectedUserName,
    isPAllChecked,
    permissionState,
    setPAllChecked,
    PermissionsForAPIHandler,
    countUsers,
    onEditIconClickHandler,
    onClickDeleteUserButton,
    onDeleteModalWindowToggle,
    isDeleteModalWindowOpen,
    isModalWindowOpen,
    adminInviteFormArr
  } = useUserListState();

  const {  adminUserData }=useUserListState();
  const allUserSelect : IOption[]= [{ value: 'all', label: `All` }];
const handleReassignClick = (id: string, name: string) => {
  setReAssignData(id);
  setreAssignUserName(name);
  setisReassignModalOpen(true);
  const options: IOption[] = [
    { value: 'all', label: `All` },
    ...adminUserData
      .filter(user => user.id !== id) 
      .map(user => ({
        value: user.id,
        label: user.name,
      })),
  ];
  setUserFilterOptions(options);
  
};

// const handleUserSelection = (selectedOption: IOption) => {
//   // if (selectedOption.value === 'all') {
//   //   // Select all users except the current one
//   //   const allSelectedUsers = adminUserData.filter(user => user.id !== reAssignData);
    
//   //   // Do something with all selected users (e.g., reassign)
//   //   console.log('Reassigning to all users:', allSelectedUsers);
    
//   //   // Example: Call your reassign function here with all users
//   //   reassignToUsers(allSelectedUsers);
//   // } 
//   // else {
//   //   // Handle the specific user selection case
//   //   console.log('Reassigning to user ID:', selectedOption.value);
    
//   //   // Example: Call your reassign function with a specific user
//   //   reassignToUser(selectedOption.value);
//   // }
// };

// Example function to reassign to all users
const reassignToUsers = (users: typeof adminUserData) => {
  // Your logic to handle reassigning tasks to all users
  console.log('Reassigning to:', users.map(user => user.name));
};

// Example function to reassign to a specific user
const reassignToUser = (userId: string) => {
  // Your logic to handle reassigning tasks to a specific user
  console.log('Reassigning to user with ID:', userId);
};


  const handleDeleteClick = (user: string, userName: string) => {
    setSelectedUser(user);
    setUserNameAdmin(' ' + userName);
    setIsDeleteModalOpen(true);
    // onGetAllCompanyMembersHandler({ take: countUsers });
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
    setSelectedUser(null); 
  };
  const handleConfirmDelete = async () => {
    if (selectedUser) {
      setIsLoading(true);
      const response = await deleteAdminUser(selectedUser);
      onGetAllCompanyMembersHandler({ take: countUsers });
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      if (response.data.success) {
        setIsSuccessPopupOpen(true);
        setIsDeleteUser(true);
      } else {
        setIsSuccessPopupOpen(true);
        setIsDeleteUser(false);
      }
    }
  };
  useEffect(() => {
    if (isEdit && selectedUserEdit) {
      formik.setValues({
        fullName: '',
        name: aminName,
        email: adminEmail,
        active: aminActive,
        password: '',
        role: ''
      });
    }
  }, [aminName, adminEmail, aminActive, isEdit, selectedUserEdit]);

  const handleEditClick = (user: string, name: string, email:string, active:boolean) => {
    setSelectedUserEdit(user);  
    setIsEdit(true);  
    setIsModalOpen(true); 
    setAminName(name);
    setAdminEmail(email);
    setAminActive(active);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);  
    setSelectedUser(null); 
    setIsEdit(false);  
    setisReassignModalOpen(false);
  };
  const onChangeStateFieldHandler = (
    optionName: keyof typeof USERS_LIST_INITIAL_STATE,
    value: string | boolean | number | SingleValue<IOption> | IEditAdminUser[]
  ) => {
    setState((prevState) => ({
      ...prevState,
      [optionName]: value,
    }));
  };
  const onChangeRoleValueHandler = (
    newValue: IOption,
    actionMeta: ActionMeta<IOption> | unknown
  ) => onChangeStateFieldHandler('role', newValue);

  // const handleSelectOption = (selectedOptionValue: { label: string, value: string }[]) => {
  //   console.log("selectedOptionValue :", selectedOptionValue);
  //   if(selectedOptionValue[0].value === 'all' ){
  //       setCheckAll(true);
  //       onCheckedAllItemsHandler();
        
  //   }else{
  //     console.log("selectedOptionValue ELSE :", selectedOptionValue);
  //   }

  // };
  // interface State {
  //   selectedUsers: IOption[];
  //   // selectedData: string[];
  // }
  // const [checkAll, setCheckAll] = useState(false);
  // const [states, setStates] = useState<State>({
  //   selectedUsers: [],
  // });
  // const onCheckedAllItemsHandler = useCallback(() => {
  //   setStates((prevState) => ({
  //     ...prevState,
  //     selectedData: !checkAll ? userFilterOptions?.map((option) => option.id) : [],
  //     selectedUsers: !checkAll ? userFilterOptions : [], 
  //   }));
  //   setCheckAll((prev) => !prev); 
    
  // }, [checkAll, userFilterOptions]);
  // console.log("selectedUser: ",selectedUser)

  return {
    handleReassignClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleEditClick,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    isDeleteUser,
    isLoading,
    selectedUserName,
    isModalOpen,
    handleCloseModal,
    formik,
    onFormSubmitHandlerEdit,
    onEnterInsertUser,
    onModalWindowCancelClickButtonHandler,
    isEdit,
    permissionState,
    setPAllChecked,
    PermissionsForAPIHandler,
    onGetAllCompanyMembersHandler,
    isPAllChecked,
    countUsers,
    onEditIconClickHandler,
    onClickDeleteUserButton,
    onDeleteModalWindowToggle,
    isDeleteModalWindowOpen,
    isModalWindowOpen,
    handleCloseDeleteModal,
    adminInviteFormArr,
    reAssignData,
    reAssignUserName,
    userNameAdmin,
    selectedUserEdit,
    selectedUser,
    initialState,
    onChangeStateFieldHandler,
    onChangeRoleValueHandler,
    isReassignModalOpen,
    userFilterOptions,
    // handleUserSelection,
    allUserSelect,
    // handleSelectOption
  };
};
