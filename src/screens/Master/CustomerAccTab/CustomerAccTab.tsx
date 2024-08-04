import { FC, useEffect } from "react";

import { EmptyData } from "components/EmptyData";
import { LoaderComponent } from "components/Loader";

import { useCustomerAccTabState } from "./CustomerAccTab.state";
import { CustomerAccTabStyles as Styled } from "./CustomerAccTab.style";

import { EMPTY_DATA_STRINGS_MASTER as Strings } from "constants/strings";
import { CustomerAccContent } from "./CustomerAccContent/CustomerAccContent";
import { MasterModalBoxCustomerAcc } from "components/MasterModalWindowsBox/MasterModalBoxCustomerAcc";
// import { MasterModalWindowsBoxAcc } from 'components/MasterModalWindowsBox/MasterModalWindowsBoxAcc';

export const CustomerAccTab: FC = () => {
  const {
    date_format,
    isLoading,
    isModalWindowOpen,
    modalInputValue,
    modalInputCodeValue,
    onChangeCustomerNameValueHandler,
    onChangeCustomerCodeValueHandler,
    onChangeSearchValueHandler,
    onCreateCustomerAccHandler,
    onEnterCreateCustomerAccClick,
    onGetCustomerAccHandler,
    onModalWindowToggle,
    onModalWindowCancelClickButtonHandler,
    searchValue,
    selectedCategory,
    customersAccList,
    isEdit,
    count,
    isDeleteModalWindowOpen,
    onDeleteModalWindowToggle,
    onDeleteItemClickHandler,
    onDeleteButtonClickHandler,
    onEditItemClickHandler,
    isDisableButton,
    onSaveButtonClickHandler,
    onChangeItemsPerPage,
    onChangePaginationInputValue,
    onChangePage,
    onEnterGoToClick,
    onGoToClick,
    onForwardClick,
    onBackwardClick,
    onChangePagesAmount,
    currentPage,
    inputPaginationValue,
    itemsPerPage,
    pages,
    onBlurHandler,
    onFocusSearchHandler,
    debouncedValue,
    isContentLoading,
    isFocus,
    isFetchingData,
    isEmptyData,
    isHeaderPanel,
    isSearching,
    searchedItems,
    active_account,
    userRole,
  } = useCustomerAccTabState();

  useEffect(() => {
    !searchValue &&
      onGetCustomerAccHandler({
        take: +itemsPerPage.value,
        skip: currentPage * +itemsPerPage.value,
      });
  }, [searchValue, active_account]);

  useEffect(() => {
    debouncedValue &&
      onGetCustomerAccHandler({ search: debouncedValue }, isSearching);
  }, [debouncedValue]);

  useEffect(() => {
    if (!count) return;
    onChangePagesAmount(Number(itemsPerPage.value), count);
  }, [count, itemsPerPage]);

  return (
    <>
      <MasterModalBoxCustomerAcc
        isLoading={isLoading}
        onCloseModalWindowHandler={onModalWindowCancelClickButtonHandler}
        onChangeInputValueHandler={onChangeCustomerNameValueHandler}
        onChangeInputCodeValueHandler={onChangeCustomerCodeValueHandler}
        onSaveButtonCLickHandler={
          isEdit ? onSaveButtonClickHandler : onCreateCustomerAccHandler
        }
        isModalWindowOpen={isModalWindowOpen}
        onEnterCreateItemClick={onEnterCreateCustomerAccClick}
        headerText={isEdit ? "Edit Customer Account" : "Add Customer Account"}
        text="Customer Account Name"
        textCode="Code"
        inputValue={modalInputValue}
        inputCodeValue={modalInputCodeValue}
        onCloseDeleteModalWindowHandler={onDeleteModalWindowToggle}
        onDeleteButtonClickHandler={onDeleteButtonClickHandler}
        isDeleteModalWindowOpen={isDeleteModalWindowOpen}
        deleteItemName={`‘${selectedCategory?.name}’`}
        isDisableButton={isDisableButton}
        categoryName="customer account"
      />
      {isFetchingData ? (
        <Styled.LoaderWrapper>
          <LoaderComponent theme="preview" />
        </Styled.LoaderWrapper>
      ) : !customersAccList?.length &&
        !searchValue &&
        !isFetchingData &&
        !isContentLoading &&
        isEmptyData ? (
        <EmptyData
          isUploadFile={false}
          buttonText={Strings.customers.buttonText}
          firstSubtitle={Strings.customers.firstSubtitle}
          secondSubtitle={Strings.customers.secondSubtitle}
          title={Strings.customers.title}
          onClick={onModalWindowToggle}
          userRole={userRole}
        />
      ) : !isFetchingData && isHeaderPanel ? (
        <CustomerAccContent
          userRole={userRole}
          searchedItems={searchedItems}
          isContentLoading={isContentLoading}
          isFetchingData={isFetchingData}
          isFocus={isFocus}
          categories={customersAccList}
          currentPage={currentPage}
          dateFormat={date_format}
          inputPaginationValue={inputPaginationValue}
          onAddClickButtonHandler={onModalWindowToggle}
          onBackwardClick={onBackwardClick}
          onChangePaginationInputValue={onChangePaginationInputValue}
          onChangeItemsPerPage={onChangeItemsPerPage}
          onChangeSearchValueHandler={onChangeSearchValueHandler}
          onDeleteIconClickHandler={onDeleteItemClickHandler}
          onEditIconClickHandler={onEditItemClickHandler}
          onForwardClick={onForwardClick}
          onEnterGoToClick={onEnterGoToClick}
          onGoToClick={onGoToClick}
          pages={pages}
          itemsPerPage={itemsPerPage}
          searchValue={searchValue}
          tabName="Name"
          onBlurHandler={onBlurHandler}
          onFocusSearchHandler={onFocusSearchHandler}
          onChangePage={onChangePage}
        />
      ) : null}
    </>
  );
};
