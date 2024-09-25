import { FC, useEffect, useState } from 'react';
import { styled } from 'styles/theme';
import { TableButton } from 'components/TableButton/TableButton';
import { Icon } from 'components/Icons/Icons';
import { useUserListState } from './UserList.state';
import { id } from 'date-fns/locale';
import { deleteAdminUser } from '../settings.api';
import { DeleteModalWindow } from 'components/DeleteModalWindow';
import { ModalBox } from './ModalBox';
import { text } from 'stream/consumers';
import { getAllAdminUsers } from '../settings.api';
import { SuccessPopup } from 'components/SuccessPopup';
import { IS_ACTIVE } from 'constants/strings';
import { ActionMeta } from 'react-select';
import { EDIT_USER_INITIAL_STATE, USERS_LIST_INITIAL_STATE } from './userList.constants';
import { IAdminUserEdit } from './types/userList.types';
import { setStoreAdminUserData } from '../reducer/settings.reducer';
import { useDispatch } from 'react-redux';
const TABLE_COLUMN_NAMES = [
  { id: 'id', name: 'ID' },
  { id: 'name', name: 'Name' },
  { id: 'email', name: 'Email' },
  { id: 'role', name: 'Role' },
  { id: 'active', name: 'Active Status' },
  { id: 'actions', name: 'Actions' }
];
const Styled = {
  Container: styled.div`
    width: 100%;
    
  `,
  Head: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 1fr;
    border-top: solid 1px ${({ theme }) => theme.colors.borderWhite};
    border-bottom: solid 1px ${({ theme }) => theme.colors.lightBlack};
    height: 50px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  `,
  Row: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 1fr;
    padding: 10px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
  `,
  Text: styled.div<{ alignRight?: boolean }>`
    color: ${({ theme }) => theme.colors.lightBlack};
    font-size: ${({ theme }) => theme.size.default};
    text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  EmptyContentWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.lightBlack};
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
  `,
  ActionWrapper: styled.div`
    display: flex;
  `,
  ActionButton: styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
};
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

export const AdminListTabel: FC<UsersTableProps> = ({ users, requestSort, sortField, sortOrder }) => {

  const {
    onEditIconClickHandler,
    onClickDeleteUserButton,
    formik,
    adminInviteFormArr,
    // editModalFields,
    // newmodalFields,
    modalFieldsNew,
    onEnterInsertUser,
    onDeleteModalWindowToggle,
    isDeleteModalWindowOpen,
    selectedUserName,
    isPAllChecked,
    permissionState,
    setPAllChecked,
    PermissionsForAPIHandler,
    onFormSubmitHandlerEdit,
    onFormSubmitHandler,
    onModalWindowCancelClickButtonHandler,
    onGetAllCompanyMembersHandler
  } = useUserListState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);  
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserEdit, setSelectedUserEdit] = useState<string>('');
  const [userNameAdmin, setUserNameAdmin] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteClick = (user: string, userName: string) => {
    setSelectedUser(user); 
    setUserNameAdmin(' '+userName);
    console.log("userName: ", userName);
    setIsDeleteModalOpen(true);
    onGetAllCompanyMembersHandler();
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
    setSelectedUser(null); 
  };
  //new
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const handleConfirmDelete = async () => {
    if (selectedUser) {
      setIsLoading(true);
      await deleteAdminUser(selectedUser);  
      setIsLoading(false);  
      handleCloseDeleteModal();
      setIsSuccessPopupOpen(true);
    }
  };
  const initialState = EDIT_USER_INITIAL_STATE;
   type SingleValue<Option> = Option | null;
  const [state, setState] = useState<IAdminUserEdit>(initialState);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);  
  const [aminName, setAminName] = useState('');
  const [AdminEmail, setAdminEmail] = useState('');
  const [AminActive, setAminActive] = useState<boolean>(false);
  // Type for select fields
  // interface ISelectField {
  //   type: 'select';
  //   label: string;
  //   name: string;
  //   value: string | boolean;
  //   isDisabled: boolean;
  //   options: IOption[];
  //   onChangeSelect: (newValue: IOption, actionMeta: unknown) => void;
  // }
  
  // Union type that includes both input and select field types
  // type ImodalFieldsAdmin = IInputField;
  // type ImodalFieldsAdmin = IModalField[]
  // const modalFieldsEdit:ImodalFieldsAdmin = [
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
  };

  useEffect(() => {
    if (isEdit && selectedUserEdit) {
      formik.setValues({
        fullName:'',
        name: aminName,
        email: AdminEmail,
        active: AminActive,
        password:'',
        role:''
      });
    }
  }, [aminName, AdminEmail, AminActive, isEdit, selectedUserEdit]);
  return (
    <>
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
            {/* <Styled.ActionButton onClick={() => onEditIconClickHandler(user.id)}>
                <Icon type="edit" />
              </Styled.ActionButton> */}
              <Styled.ActionButton onClick={() => handleEditClick(user.id, user.name, user.email, user.active)}>
                <Icon type="edit" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleDeleteClick(user.id, user.name)}>
                <Icon type="remove" />
              </Styled.ActionButton>
            </Styled.ActionWrapper>
             
          </Styled.Row>
        ))
      ) : (
        <Styled.EmptyContentWrapper>No users found</Styled.EmptyContentWrapper>
      )}
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
        positionTop="0"
        isShowPopup={isSuccessPopupOpen}
        closePopupFc={()=> setIsSuccessPopupOpen(false)}
        titleText="User was successfully deleted"
      />)}
      {isModalOpen && (
        //edit user
        <ModalBox
          modalFields={adminInviteFormArr.slice(4, 7)}
          text="Name"
          isLoading={false}
          isDisableButton={false}
          onCloseModalWindowHandler={handleCloseModal}
          // onSaveButtonCLickHandler={formik.handleSubmit}
          onSaveButtonCLickHandler={async () => {
            await onFormSubmitHandlerEdit(selectedUserEdit, formik.values);
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
