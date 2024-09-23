import { FC, useEffect } from 'react';
import { useState } from 'react';
// import { HeaderPanelMaster } from '../HeaderPanelMaster';
// import { HeaderPanelMaster } from 'components/HeaderPanelMaster';
import { LoaderComponent } from '../Loader';
import { PaginationPanel } from '../PaginationPanel';
import { SettingsItemPageContentStyle as Styled } from './SettingsItemPageContent.style';
import { Table } from './Table';
import { ISettingsItemPageContentProps } from './types/settingsItemPageContent.types';
import { ReUseActionPlaceholder } from 'ReUseComponents/reUseActionPlaceHolder/ReUseActionPlaceHolder';
import { ReUseActionButton } from 'ReUseComponents/reUseActionButton/ReUseActionButton';
import { ReUseSearch } from 'ReUseComponents/reUseSearch/ReUseSearch';
import { AdminListTabel } from 'screens/Settings/UsersList/AdminListTabel';
import { useUserListState } from 'screens/Settings/UsersList/UserList.state';
import { getAllAdminUsers } from 'screens/Settings/settings.api';
import { setStoreAdminUserData } from 'screens/Settings/reducer/settings.reducer';
import { useSelector } from 'react-redux';
import { RootState } from 'services/redux/store';
import { IState } from 'services/redux/reducer';
import { SuccessModalWindow } from 'components/SuccessModalWindow';
export const SettingsItemPageContent: FC<ISettingsItemPageContentProps> = (
  props
) => {
  const {
    currentPage,
    inputPaginationValue,
    searchedCompanies,
    onAddClickButtonHandler,
    onBackwardClick,
    onChangePaginationInputValue,
    onChangeItemsPerPage,
    onChangeSearchValueHandler,
    onDeleteIconClickHandler,
    onEditIconClickHandler,
    onEnterGoToClick,
    onForwardClick,
    onGoToClick,
    onBlurHandler,
    onFocusSearchHandler,
    onChangePage,
    onResendInvitationHandler,
    searchedUsers,
    pages,
    itemsPerPage,
    searchValue,
    isGuard,
    userRole,
    members,
    isMemeberList,
    // isContentLoading,
    isFetchingData,
    companies,
  } = props;
  // const {
  //   dataAdminUsers
  // } = useUserListState();
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    active: boolean;  
  }
  const adminUserData = useSelector((state: IState) => state.settings.adminUserData);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  useEffect(() => {
    // Filter users based on search value
    const filterUsers = () => {
      if (!searchValue) {
        // If no search value, show all users
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
//
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

  const isPaginationPanel = isMemeberList
    ? (searchValue && searchedUsers?.length) ||
      (!searchValue && members?.length)
    : (searchValue && searchedCompanies?.length) ||
      (!searchValue && companies?.length);

  return (
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
          onClick={onAddClickButtonHandler}
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
  );
};