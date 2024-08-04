import { FC, useEffect } from "react";

import { DeleteModalWindow } from 'components/DeleteModalWindow';
// import { MasterModalPayment } from 'components/MasterModalPayment';
import { EmptyData } from 'components/EmptyData';
import { LoaderComponent } from 'components/Loader';
import { useTypesTabState } from './TypesTab.state';
import { TypesTabStyles as Styled } from './TypesTab.style';
import { TypesContent } from './TypesContent/TypesContent';

import { EMPTY_DATA_STRINGS_MASTER as Strings } from "constants/strings";

export const TypesTab: FC = () => {
  const {
    date_format,
    isDeleteModalWindowOpen,
    isDisableButton,
    isLoading,
    isModalWindowOpen,
    modalInputValue,
    onChangePaginationInputValueHandler,
    modalCheckboxDefaultPayment,
    onChangeModalCheckboxDefaultPaymentHandler,
    modalInputPaymentRefName,
    onChangePaymentRefHandler,
    onChangeSearchValueHandler,
    onCreateTypeHandler,
    onEnterCreateTypeClick,
    onDeleteButtonClickHandler,
    onDeleteItemClickHandler,
    onDeleteModalWindowToggle,
    onEditItemClickHandler,
    onGetAllTypesHandler,
    onModalWindowToggle,
    onSaveButtonClickHandler,
    onModalWindowCancelClickButtonHandler,
    searchValue,
    selectedCategory,
    typesList,
    isEdit,
    count,
    onChangeItemsPerPage,
    onChangePaginationInputValue,
    onChangePage,
    onEnterGoToClick,
    onGoToClick,
    onForwardClick,
    onBackwardClick,
    onChangePagesAmount,
    onBlurHandler,
    onFocusSearchHandler,
    currentPage,
    inputPaginationValue,
    itemsPerPage,
    pages,
    debouncedValue,
    isEmptyData,
    isFetchingData,
    isFocus,
    isHeaderPanel,
    isContentLoading,
    searchedItems,
    isSearching,
    active_account,
    userRole,
  } = useTypesTabState();

  useEffect(() => {
    !searchValue &&
      onGetAllTypesHandler({
        take: +itemsPerPage.value,
        skip: currentPage * +itemsPerPage.value,
      });
  }, [searchValue, active_account]);

  useEffect(() => {
    debouncedValue &&
      onGetAllTypesHandler({ search: debouncedValue }, isSearching);
  }, [debouncedValue]);

  useEffect(() => {
    if (!count) return;
    onChangePagesAmount(+itemsPerPage.value, count);
  }, [count, itemsPerPage]);

  return (
    <>
      {/* <MasterModalPayment
        isDisableButton={isDisableButton}
        onCloseModalWindowHandler={onModalWindowCancelClickButtonHandler}
        isModalWindowOpen={isModalWindowOpen}
        headerText={isEdit ? 'Edit Payment Type' : 'Add Payment Type'}
        inputValue={modalInputValue}
        onChangePaginationInputValueHandler={onChangePaginationInputValueHandler}
        modalInputPaymentRefName = {modalInputPaymentRefName}
        onChangePaymentRefHandler={onChangePaymentRefHandler}
        onEnterCreateItemClick={onEnterCreateTypeClick}  
        onSaveButtonCLickHandler={
          isEdit ? onSaveButtonClickHandler : onCreateTypeHandler
        }
        onChangeModalCheckboxDefaultPaymentHandler={onChangeModalCheckboxDefaultPaymentHandler}
        modalCheckboxDefaultPayment={modalCheckboxDefaultPayment}
        isLoading={isLoading}
      /> */}
      <DeleteModalWindow
        onCloseDeleteModalWindowHandler={onDeleteModalWindowToggle}
        onDeleteButtonClickHandler={onDeleteButtonClickHandler}
        isDeleteModalWindowOpen={isDeleteModalWindowOpen}
        deleteItemName={`‘${selectedCategory?.name}’`}
        categoryName="Name"
        isLoading={isLoading}
      />
      {isFetchingData ? (
        <Styled.LoaderWrapper>
          <LoaderComponent theme="preview" />
        </Styled.LoaderWrapper>
      ) : !typesList?.length &&
        !searchValue &&
        !isFetchingData &&
        !isContentLoading &&
        isEmptyData ? (
        <EmptyData
          isUploadFile={false}
          buttonText={Strings.type.buttonText}
          firstSubtitle={Strings.type.firstSubtitle}
          secondSubtitle={Strings.type.secondSubtitle}
          title={Strings.type.title}
          onClick={onModalWindowToggle}
          userRole={userRole}
        />
      ) : !isFetchingData && isHeaderPanel ? (
        <TypesContent
          userRole={userRole}
          searchedItems={searchedItems}
          isContentLoading={isContentLoading}
          isFetchingData={isFetchingData}
          isFocus={isFocus}
          categories={typesList}
          currentPage={currentPage}
          dateFormat={date_format}
          inputPaginationValue={inputPaginationValue}
          onChangePaginationInputValue={onChangePaginationInputValue}
          onAddClickButtonHandler={onModalWindowToggle}
          onBackwardClick={onBackwardClick}
          onChangeItemsPerPage={onChangeItemsPerPage}
          itemsPerPage={itemsPerPage}
          onChangeSearchValueHandler={onChangeSearchValueHandler}
          onDeleteIconClickHandler={onDeleteItemClickHandler}
          onEditIconClickHandler={onEditItemClickHandler}
          onForwardClick={onForwardClick}
          onEnterGoToClick={onEnterGoToClick}
          onGoToClick={onGoToClick}
          pages={pages}
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
