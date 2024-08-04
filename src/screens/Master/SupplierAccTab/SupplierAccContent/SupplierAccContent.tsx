import { FC } from "react";

import { HeaderPanelMaster } from "components/HeaderPanelMaster";
import { LoaderComponent } from "components/Loader";
import { PaginationPanel } from "components/PaginationPanel";
import { TableSupplierAccount } from '../../../../components/Table/TableSupplierAccount';

import { ITabContentProps } from "../../types/master.types";
import { SupplierAccContentStyles as Styled } from "./SupplierAccContent.style";

export const SupplierAccContent: FC<ITabContentProps> = (props) => {
  const {
    categories,
    dateFormat,
    onAddClickButtonHandler,
    onChangeSearchValueHandler,
    onDeleteIconClickHandler,
    onEditIconClickHandler,
    searchValue,
    tabName,
    onBlurHandler,
    onFocusSearchHandler,
    currentPage,
    inputPaginationValue,
    paginationCustomStyle,
    onBackwardClick,
    onChangePaginationInputValue,
    onChangeItemsPerPage,
    onForwardClick,
    onEnterGoToClick,
    onGoToClick,
    pages,
    itemsPerPage,
    onChangePage,
    isContentLoading,
    isFetchingData,
    isFocus,
    searchedItems,
    userRole,
  } = props;

  return (
    <Styled.ContentWrapper>
      <HeaderPanelMaster
        isGuard
        onChangeSearchValueHandler={onChangeSearchValueHandler}
        searchValue={searchValue}
        onAddClickButtonHandler={onAddClickButtonHandler}
        onBlurHandler={onBlurHandler}
        onFocusSearchHandler={onFocusSearchHandler}
        buttonText="Add Supplier Account"
        userRole={userRole}
      />
      {isContentLoading ? (
        <Styled.LoaderWrapper>
          <LoaderComponent theme="preview" />
        </Styled.LoaderWrapper>
      ) : !isFetchingData && !isContentLoading ? (
        <Styled.TableWrapper>
          <TableSupplierAccount
            userRole={userRole}
            tabName={tabName}
            searchValue={searchValue}
            searchedItems={searchedItems}
            categories={categories}
            dateFormat={dateFormat}
            onDeleteIconClickHandler={onDeleteIconClickHandler}
            onEditIconClickHandler={onEditIconClickHandler}
            isContentLoading={isContentLoading}
            isFetchingData={isFetchingData}
            isFocus={isFocus}
          />
          {(searchValue && searchedItems?.length) ||
          (!searchValue && categories.length) ? (
            <PaginationPanel
						pages={pages}
						currentPage={currentPage}
						onChangeItemsPerPage={onChangeItemsPerPage}
						onChangePaginationInputValue={onChangePaginationInputValue}
						inputPaginationValue={inputPaginationValue}
						itemsPerPage={itemsPerPage}
						onChangePage={onChangePage}
						onEnterGoToClick={onEnterGoToClick}
						onGoToClick={onGoToClick}
						onForwardClick={onForwardClick}
						onBackwardClick={onBackwardClick}
						paginationCustomStyle={paginationCustomStyle}
					/>
          ) : null}
        </Styled.TableWrapper>
      ) : null}
    </Styled.ContentWrapper>
  );
};
