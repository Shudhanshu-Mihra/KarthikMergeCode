import { FC, useEffect, useState } from 'react';
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
    handleReassignClick
  } = useAdminListTable();
  const navigate = useNavigate(); 
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
                <Icon type="Reassign" />
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
    </>
  );
};
