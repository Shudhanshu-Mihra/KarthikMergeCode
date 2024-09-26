import { FC, useEffect, useState } from "react";
import { PaginationPanel } from "components/PaginationPanel";
import { SettingsItemPageContent } from "components/SettingsItemPageContent";
import { LoaderComponent } from "components/Loader";
import { SuccessPopup } from "components/SuccessPopup";
import { UserListStyles as Styled } from "./UserList.styles";
import { useUserListState } from "./UserList.state";
import { ModalBox } from "./ModalBox";
import { AdminListTabel } from "./AdminListTabel";
import { ReUseSearch } from 'ReUseComponents/reUseSearch/ReUseSearch';
import { ReUseActionPlaceholder } from 'ReUseComponents/reUseActionPlaceHolder/ReUseActionPlaceHolder';
import { ReUseActionButton } from 'ReUseComponents/reUseActionButton/ReUseActionButton';
import { SuccessModalWindow } from "components/SuccessModalWindow";
import { IState } from 'services/redux/reducer';
import { useSelector } from 'react-redux';
import { ISettingsItemPageContentPropsUsers } from "./types/userList.types";
export const UsersList: FC = () => {
  const {
    isLoading,
    adminInviteFormArr,
    isModalWindowOpen,
    searchValue,
    formik,
    onDeleteModalWindowToggle,
    isDeleteModalWindowOpen,
    onDeleteIconClickHandler,
    onEditIconClickHandler,
    onChangeSearchValueHandler,
    onEnterInsertUser,
    onChangePaginationInputValue,
    onForwardClick,
    onBackwardClick,
    onEnterGoToClick,
    onChangeItemsPerPage,
    onGoToClick,
    // userRole,
    onClickDeleteUserButton,
    selectedUserName,
    itemsPerPage,
    inputPaginationValue,
    pages,
    currentPage,
    members,
    isEdit,
    debouncedValue,
    isContentLoading,
    isFocus,
    searchedUsers,
    // modalFields,
    count,
    isFetchingData,
    isDisableButton,
    isInvitation,
    isSentSuccessPopup,
    isResentSuccessPopup,
    active,
    setIsSentSuccessPopup,
    setIsResendSuccessPopup,
    onChangePage,
    onChangePagesAmount,
    onModalWindowCancelClickButtonHandler,
    onModalWindowToggleHandler,
    onFocusSearchHandler,
    onBlurHandler,
    onGetAllCompanyMembersHandler,
    onResendInvitationHandler,
    isPAllChecked,
    permissionState,
    setPermission,
    setPAllChecked,
    onFormSubmitHandler,
    PermissionsForAPIHandler,
    role,
    // companies,
    // searchedCompanies,
    // isMemeberList
    // onAddClickButtonHandler,
  } = useUserListState();

  useEffect(() => {
    onGetAllCompanyMembersHandler();
  }, []);

  useEffect(() => {
    debouncedValue &&
      onGetAllCompanyMembersHandler({
        search: debouncedValue,
      });
  }, [debouncedValue, active]);

  useEffect(() => {
    if (!count) return;
    onChangePagesAmount(Number(itemsPerPage.value), count);
  }, [count, itemsPerPage, active]);
  const [createSuccessUser, setCreateSuccessUser] = useState<boolean>(false);
  const adminUserData = useSelector((state: IState) => state.settings.adminUserData);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  useEffect(() => {
    // Filter users based on search value
    const filterUsers = () => {
      if (!searchValue) {
        setFilteredUsers(Object.values(adminUserData));
      } else {
        const filtered = Object.values(adminUserData).filter((user: any) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    };

    filterUsers();
  }, [searchValue, adminUserData]);

  const requestSort = (columnId: string) => {
    let newSortOrder = 'asc';
    if (sortField === columnId && sortOrder === 'asc') {
      newSortOrder = 'desc';
    }
    setSortField(columnId);
    setSortOrder(newSortOrder);

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[columnId] < b[columnId]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[columnId] > b[columnId]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sortedUsers);
  };

  // const isPaginationPanel = adminUserData
  //   ?(searchValue && adminUserData?.length) ||
  //     (!searchValue && members?.length)
  //   : (searchValue && searchedCompanies?.length) ||
  //     (!searchValue && companies?.length);


  const isPaginationPanel = adminUserData?.length;

  return (
    //create user
    <Styled.Section>
      <ModalBox
        modalFields={adminInviteFormArr.slice(0, 4)}
        text="Name"
        isLoading={isLoading}
        isDisableButton={isDisableButton}
        // isDisableButton={false}
        onCloseModalWindowHandler={onModalWindowCancelClickButtonHandler}
        onSaveButtonCLickHandler={async () => {
          await onFormSubmitHandler(formik.values);
          onModalWindowCancelClickButtonHandler(); 
          setCreateSuccessUser(true);
        }}
        onEnterCreateItemClick={onEnterInsertUser}
        isModalWindowOpen={isModalWindowOpen}
        headerText={isEdit ? "Edit User" : "Insert User"}
        formikMeta={formik.getFieldMeta}
        formikProps={formik.getFieldProps}
        onCloseDeleteModalWindowHandler={onDeleteModalWindowToggle}
        onDeleteButtonClickHandler={onClickDeleteUserButton}
        isDeleteModalWindowOpen={isDeleteModalWindowOpen}
        deleteItemName={`‘${selectedUserName}’`}
        isEdit={isEdit}
        isInvitation={isInvitation}
        isUserList
        categoryName="user"
        isPAllChecked={isPAllChecked}
        permissionState = {permissionState}
        // setPermission={setPermission}
        setPAllChecked={setPAllChecked}
        PermissionsForAPIHandler={PermissionsForAPIHandler}
        role={role?.value || null}
        // formik={{
        //   ...formik,
        //   handleSubmit: () => onFormSubmitHandler(formik.values), 
        // }}
      />
      <SuccessPopup
        positionTop="0"
        isShowPopup={createSuccessUser}
        closePopupFc={() => {setCreateSuccessUser(false)}}
        titleText="User created successfully"
      />
      {isFetchingData ?  (
        <Styled.LoaderWrapper>
          <LoaderComponent theme="preview" />
        </Styled.LoaderWrapper>
      ) : (
        // <SettingsItemPageContent
        //   modalFields ={adminInviteFormArr}
        //   onResendInvitationHandler={onResendInvitationHandler}
        //   isFetchingData={isFetchingData}
        //   isContentLoading={isContentLoading}
        //   isFocus={isFocus}
        //   searchedUsers={searchedUsers}
        //   onFocusSearchHandler={onFocusSearchHandler}
        //   onBlurHandler={onBlurHandler}
        //   members={members}
        //   isMemeberList
        //   // userRole={userRole}
        //   onDeleteIconClickHandler={onDeleteIconClickHandler}
        //   onEditIconClickHandler={onEditIconClickHandler}
        //   pages={pages}
        //   currentPage={currentPage}
        //   onChangePaginationInputValue={onChangePaginationInputValue}
        //   onForwardClick={onForwardClick}
        //   onBackwardClick={onBackwardClick}
        //   onEnterGoToClick={onEnterGoToClick}
        //   onChangeItemsPerPage={onChangeItemsPerPage}
        //   itemsPerPage={itemsPerPage}
        //   inputPaginationValue={inputPaginationValue}
        //   onGoToClick={onGoToClick}
        //   onChangeSearchValueHandler={onChangeSearchValueHandler}
        //   searchValue={searchValue}
        //   onAddClickButtonHandler={onModalWindowToggleHandler}
        //   onChangePage={onChangePage}
        //   isGuard
        // />
        <Styled.ContentWrapper>
        <ReUseActionPlaceholder>
          <ReUseSearch
            searchValue={searchValue}
            onChangeSearchValueHandler={onChangeSearchValueHandler}
            onBlurHandler={onBlurHandler}
            onFocusSearchHandler={onFocusSearchHandler}
          />
          <ReUseActionButton
            displayText="Create User"
            buttonType="actionButton"
            widthType="primary"
            themedButton="primary"
            onClick={onModalWindowToggleHandler}
            displayIconType="addPlus"
            margin="0 0 0 auto"
          />
        </ReUseActionPlaceholder>
  
        {isFetchingData ? (
          <Styled.LoaderWrapper>
            <LoaderComponent theme="preview" />
          </Styled.LoaderWrapper>
        ) : (
          <div>
            <AdminListTabel
              users={filteredUsers}
              requestSort={requestSort}
              sortField={sortField}
              sortOrder={sortOrder}
            />
            {isPaginationPanel ? (
              <Styled.paginationPosition>
                <PaginationPanel
                  pages={pages}
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  onChangePaginationInputValue={onChangePaginationInputValue}
                  onForwardClick={onForwardClick}
                  onBackwardClick={onBackwardClick}
                  onEnterGoToClick={onEnterGoToClick}
                  onChangeItemsPerPage={onChangeItemsPerPage}
                  itemsPerPage={itemsPerPage}
                  inputPaginationValue={inputPaginationValue}
                  onGoToClick={onGoToClick}
                />
              </Styled.paginationPosition>
             ) : null} 
          </div>
        )}
      </Styled.ContentWrapper>
      )}
    </Styled.Section>
  );
};
