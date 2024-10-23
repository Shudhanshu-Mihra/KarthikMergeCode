import { FC, useCallback, useEffect, useState } from 'react';
import { TableButton } from 'components/TableButton/TableButton';
import { Icon } from 'components/Icons/Icons';
import { Navigate, useNavigate } from 'react-router-dom'; 
import { id } from 'date-fns/locale';
import { DeleteModalWindow } from 'components/DeleteModalWindow';
import { text } from 'stream/consumers';
import {TableStyles as Styled} from './AdminList.style';
import { SuccessPopup } from 'components/SuccessPopup';
import { ActionMeta } from 'react-select';
import { EDIT_USER_INITIAL_STATE, USERS_LIST_INITIAL_STATE } from 'screens/Settings/UsersList/userList.constants';
import { useDispatch } from 'react-redux';
import { useUserListState } from 'screens/Settings/UsersList/UserList.state';
import { deleteAdminUser } from 'screens/Settings/settings.api';
import { ModalBox } from 'screens/Settings/UsersList/ModalBox';
import { IAdminUserEdit } from 'screens/Settings/UsersList/types/userList.types';
import { ROUTES } from 'constants/routes';
import { useAdminListTable } from './AdminList.state';
import { ReassignModalWindow } from 'components/ReassignModalWindow';
import { useToggle } from 'hooks/useToggle';
const TABLE_COLUMN_NAMES = [
  { id: 'id', name: 'ID' },
  { id: 'name', name: 'Name' },
  { id: 'email', name: 'Email' },
  { id: 'role', name: 'Role' },
  { id: 'active', name: 'Active Status' },
  { id: 'actions', name: 'Actions' }
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

interface UsersTableProps {
  users: User[];
  requestSort: (columnId: string) => void;
  sortField: string;
  sortOrder: string;
}

export const AdminListTabel: FC<UsersTableProps> = ({
  users,
  requestSort,
  sortField,
  sortOrder
}) => {

  const {
    onEditIconClickHandler,
    onClickDeleteUserButton,
    formik,
    adminInviteFormArr,
    onEnterInsertUser,
    onDeleteModalWindowToggle,
    isDeleteModalWindowOpen,
    selectedUserName,
    isPAllChecked,
    permissionState,
    setPAllChecked,
    PermissionsForAPIHandler,
    onFormSubmitHandlerEdit,
    isModalWindowOpen,
    onModalWindowCancelClickButtonHandler,
    onGetAllCompanyMembersHandler,
    countUsers,
    handleDeleteClick,
    handleCloseDeleteModal,
    handleConfirmDelete,
    userNameAdmin,
    isDeleteModalOpen,
    selectedUser,
    handleEditClick,
    handleCloseModal,
    isLoading,
    selectedUserEdit,
    isSuccessPopupOpen,
    isDeleteUser,
    initialState,
    setIsSuccessPopupOpen,
    onChangeStateFieldHandler,
    isModalOpen,
    isEdit,
    handleReassignClick,
    isReassignModalOpen,
    // ReassignArr,
    reAssignUserName,
    userFilterOptions,
    
  } = useAdminListTable();
  const navigate = useNavigate(); 

  // const [checkAll, setCheckAll] = useState(false);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  // const [state, setState] = useState({
  //   selectedUsers:[], selectedData:[]
  // });
  // console.log("userFilterOptions :", userFilterOptions);

  // const onCheckedAllItemsHandler = useCallback(() => {
  //   // setSelectedUsers((prevState) => ({
  //   setState((prevState) => ({
  //     ...prevState,
  //     selectedData : !checkAll ? userFilterOptions?.map((option) => option.id) : [],
  //   }));
  // }, [checkAll, selectedUsers]);
  
  interface State {
    selectedUsers: string[] | [] | any;
    // selectedData: string[];
  }
  const [checkAll, setCheckAll] = useState(false);
  const [state, setState] = useState<State>({
    selectedUsers: [],
  });
  const onCheckedAllItemsHandler = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedUsers: !checkAll ? userFilterOptions?.map((option) => option.value) : [],
      // selectedUsers: !checkAll ? userFilterOptions : [], 
    }));
    setCheckAll((prev) => !prev); 
    
  }, [checkAll, userFilterOptions]);

  const [ismultiLocal, setIsmultiLocal] = useState(true);

  // const handleSelectOption = (selectedOptionValue: { label: string, value: string }[]) => {
  //   console.log("selectedOptionValue :", selectedOptionValue);

  //   // Check if the array is not empty before accessing its first element
  //   if (selectedOptionValue.length > 0) {
  //       if (selectedOptionValue[0].value === 'all' || selectedOptionValue[0].label === 'All') {
  //           setCheckAll(true);
  //           setIsmultiLocal(false);
  //           onCheckedAllItemsHandler();
  //       } else {
  //           console.log("selectedOptionValue ELSE :", selectedOptionValue);
  //           setIsmultiLocal(true);
  //       }
  //   } else {
  //       console.log("No options selected");
  //       // Handle the case where no options are selected
  //       setCheckAll(false);
  //   }
  // }
//#####################################################################
  const handleSelectOption = (selectedOptionValue: { label: string, value: string }[]) => {
    console.log("selectedOptionValue :", selectedOptionValue);

    // Check if "All" is selected, and handle the checkAll state accordingly
    if (selectedOptionValue.length > 0) {
        const isAllSelected = selectedOptionValue.some(
            (option) => option.value === 'all' || option.label === 'All'
        );
        if (isAllSelected) {
            setCheckAll(true);
            setIsmultiLocal(false);
            onCheckedAllItemsHandler(); 
        } else {
            setCheckAll(false); 
            setIsmultiLocal(true);
        }
    } else {
        console.log("No options selected");
        setCheckAll(false); 
        setIsmultiLocal(true);
    }
}; 
console.log("user options: ", userFilterOptions);
  // console.log("selectedData:", selectedData);
  console.log("selectedUser: ",state?.selectedUsers);

  return (
    <>
    <Styled.Container>
      <Styled.Head>
        {TABLE_COLUMN_NAMES.map((item) => {
          const isSorted = sortField === item.id && sortOrder !== '';
          return (
            <Styled.Text key={item.id}>
              <TableButton isSorted={isSorted} onClick={() => requestSort(item.id)}>
                {item.name}
              </TableButton>
            </Styled.Text>
          );
        })}
      </Styled.Head>
      {users.length  ? (
        users.map((user, index) => (
          <Styled.Row key={user.id}>
            <Styled.Text>{index + 1}</Styled.Text>
            <Styled.Text>{user.name}</Styled.Text>
            <Styled.Text>{user.email}</Styled.Text>
            <Styled.Text>{user.role}</Styled.Text>
            <Styled.Text>{user.active ? 'Active' : 'Inactive'}</Styled.Text>
            <Styled.ActionWrapper>
              <Styled.ActionButton onClick={() => handleEditClick(user.id, user.name, user.email, user.active)}>
                <Icon type="edit" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleDeleteClick(user.id, user.name)}>
                <Icon type="remove" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleReassignClick(user.id, user.name)}>
                <Icon type="ActiveUser" />
              </Styled.ActionButton>
            </Styled.ActionWrapper>
             
          </Styled.Row>
        ))
      ) : (
        <Styled.EmptyContentWrapper>No users found</Styled.EmptyContentWrapper>
      )}</Styled.Container>
      {isDeleteModalOpen && selectedUser && (
        <DeleteModalWindow
          onCloseDeleteModalWindowHandler={handleCloseDeleteModal}
          onDeleteButtonClickHandler={handleConfirmDelete}
          isDeleteModalWindowOpen={isDeleteModalOpen}
          deleteItemName={userNameAdmin}  
          isLoading={isLoading}  
          categoryName="user"  
        />
      )}
      {isSuccessPopupOpen && (
        <SuccessPopup
        positionTop="-20"
        isShowPopup={isSuccessPopupOpen}
        closePopupFc={()=> setIsSuccessPopupOpen(false)}
        titleText={!isDeleteUser ? "User deletion failed":"User was successfully deleted"}
        alertColor={!isDeleteUser ? "red" :undefined}
      />)}
      {isModalOpen && (
        //edit user
        <ModalBox
          modalFields={adminInviteFormArr.slice(4, 7)}
          text="Name"
          isLoading={false}
          isDisableButton={false}
          onCloseModalWindowHandler={handleCloseModal}
          onSaveButtonCLickHandler={async () => {
            await onFormSubmitHandlerEdit(selectedUserEdit, formik.values);
            console.log("formik.values:", formik.values);
            handleCloseModal();
            onModalWindowCancelClickButtonHandler(); }}
          onEnterCreateItemClick={onEnterInsertUser}
          isModalWindowOpen={isModalOpen}
          headerText={isEdit ? 'Edit User' : 'Insert User'}
          formikMeta={formik.getFieldMeta}  
          formikProps={formik.getFieldProps}  
          onCloseDeleteModalWindowHandler={onDeleteModalWindowToggle}
          onDeleteButtonClickHandler={onClickDeleteUserButton}
          isDeleteModalWindowOpen={isDeleteModalWindowOpen}
          deleteItemName={`‘${selectedUserName}’`}
          isEdit={isEdit}
          isInvitation={false}
          isUserList
          categoryName="user"
          isPAllChecked={isPAllChecked}
          permissionState={permissionState}
          setPAllChecked={setPAllChecked}
          PermissionsForAPIHandler={PermissionsForAPIHandler}
          role={selectedUser|| null}
        />
      )}
      {isReassignModalOpen && (
        <ReassignModalWindow
        isOpen={isReassignModalOpen} 
        inactiveUser={reAssignUserName} 
        modalTitle="Reassign Task"
        modalDescription="Please reassign the task to another user."
        confirmText="Save"
        cancelText="Cancel"
        isLoading={false}  
        onConfirmClick={() => {}}
        onSaveClick = {()=>{}}
        onCancelClick={handleCloseModal}
        showInput={false}  
        options = {userFilterOptions}
        isMulti={ismultiLocal}
        onChangeSelectHandler={handleSelectOption}
        // isDisabled={isDisabled}
        isClearable={true}
        // selectValue 
        // CustomSelectLabel
        
      />
      )}
    </>
  );
};
