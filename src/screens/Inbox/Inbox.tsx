import { FC, memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// import { EmptyData } from 'components/EmptyData';
import { LoaderComponent } from 'components/Loader';

import { InboxStyles as Styled } from './Inbox.style';
import { useInboxState } from './Inbox.state';
import { InboxContent } from './InboxContent';
import { ActionMenuContent } from './ActionMenuContent';

import { EMPTY_DATA_STRINGS as Strings } from 'constants/strings';

export const Inbox: FC = memo(() => {
  const {
    primaryAction,
    userRole,
    onSelectFilesHandler,
    onFetchReceiptsHandler,
    onChangeStatusValueHandler,
    onChangeDateFilterValueHandler,
    onChangeSearchValueHandler,
    onChangeDate,
    isDatePickerOpen,
    dateValue,
    searchValue,
    statusValue,
    dateFilterValue,
    formattedDate,
    isInputDate,
    setIsDatePickerOpen,
    isEmailModalWindowOpen,
    onEmailClick,
    formik,
    onChangeItemsPerPage,
    onChangePaginationInputValue,
    onEnterGoToClick,
    onGoToClick,
    onForwardClick,
    onBackwardClick,
    onActionsClick,
    onActionsClose,
    onChangePage,
    onCheckedItemHandler,
    onCheckedAllItemsHandler,
    onClickDownloadCSVButtonHandler,
    // onCheckedPaidHandler,
    // onCheckedApproveHandler,
    // onCheckedPublishMockFuncHandler,
    // receiptsPerPage,
    itemsPerPage,
    inputPaginationValue,
    currentPage,
    pages,
    checkedIds,
    showActions,
    isAllChecked,
    csvLink,
    csvData,
    company,
    excelRef,
    excelUrl,
    isActionMenuButtonDisabled,
    isLoading,
    isContentLoading,
    debouncedValue,
    isFetchingReceipts,
    location,
    datePickerRef,
    active_account,
    isSentSuccessPopup,
    setIsSentSuccessPopup,
    onCloseEmailModalHandler,
    onClickOutsideDatePickerHandler,
    onChangePagesAmount,
    onDownloadExcelFileHandler,
    onDeleteReceiptHandler,
    onMarkAsHandler,
    // sortField,
    // sortOrder,
    // sortedReceipts,
    fetchParams,
    totalCount,
    isCompanyChanged,
    // requestSort,
    setCurrentPage,
    count,
    paginationCustomStyle,
    // InBoxActionList,
  } = useInboxState();

  useEffect(() => {
    onFetchReceiptsHandler({
      ...fetchParams,
      skip: 0,
    });
    if (debouncedValue || isCompanyChanged) {
      setCurrentPage(0);
    }
  }, [debouncedValue, active_account]);

  useEffect(() => {
    if (count) {
      onChangePagesAmount(Number(itemsPerPage.value), count);
    }
  }, [itemsPerPage, count, active_account]);

  const isEmptyScreen = !isFetchingReceipts && !totalCount;

  return (
    <>
      <ActionMenuContent
        isSentSuccessPopup={isSentSuccessPopup}
        closeSuccesPopupHandler={setIsSentSuccessPopup}
        csvLink={csvLink}
        csvData={csvData}
        excelRef={excelRef}
        excelUrl={excelUrl}
        onCloseModalWindowHandler={onCloseEmailModalHandler}
        isModalWindowOpen={isEmailModalWindowOpen}
        onFormHandleSubmit={formik.handleSubmit}
        formikProps={formik.getFieldProps}
        formikMeta={formik.getFieldMeta}
        isValid={formik.isValid && formik.dirty}
        isLoading={isLoading}
        checkedIds={checkedIds}
      />
      {/* {location.pathname !== '/purchase-invoices' ? (
        <Outlet />
      ) : isFetchingReceipts ? (
        <Styled.LoaderWrapper>
          <LoaderComponent theme="preview" />
        </Styled.LoaderWrapper>
      ) : totalCount ? (
        <>
          {!isFetchingReceipts ? (
            <InboxContent
              InBoxActionList={InBoxActionList}
              isActionMenuButtonDisabled={isActionMenuButtonDisabled}
              userRole={userRole}
              primaryAction={primaryAction}
              datePickerRef={datePickerRef}
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
              statusValue={statusValue}
              dateFilterValue={dateFilterValue}
              onSelectFilesHandler={onSelectFilesHandler}
              onChangeStatusValueHandler={onChangeStatusValueHandler}
              onChangeDateFilterValueHandler={onChangeDateFilterValueHandler}
              onChangeSearchValueHandler={onChangeSearchValueHandler}
              searchValue={searchValue}
              onChangeDate={onChangeDate}
              onClickOutsideDatePickerHandler={onClickOutsideDatePickerHandler}
              isDatePickerOpen={isDatePickerOpen}
              dateValue={dateValue}
              setIsDatePickerOpen={setIsDatePickerOpen}
              formattedDate={formattedDate}
              isInputDate={isInputDate}
              showActions={showActions}
              onActionsClick={onActionsClick}
              onActionsClose={onActionsClose}
              onClickDownloadCSVButtonHandler={onClickDownloadCSVButtonHandler}
              onEmailClick={onEmailClick}
              isDownloadButtonDisabled={isActionMenuButtonDisabled}
              onDownloadExcelFileHandler={onDownloadExcelFileHandler}
              onDeleteItemHandler={onDeleteReceiptHandler}
              onMarkAsHandler={onMarkAsHandler}
              isContentLoading={isContentLoading}
              onCheckedItemHandler={onCheckedItemHandler}
              onCheckedAllItemsHandler={onCheckedAllItemsHandler}
              onCheckedPaidHandler={onCheckedPaidHandler}
              onCheckedApproveHandler={onCheckedApproveHandler}
              onCheckedPublishMockFuncHandler={onCheckedPublishMockFuncHandler}
              receiptList={sortedReceipts}
              requestSort={requestSort}
              isAllChecked={isAllChecked}
              dateFormat={company.date_format}
              isFetchingReceipts={isFetchingReceipts}
              sortField={sortField}
              sortOrder={sortOrder}
              paginationCustomStyle={paginationCustomStyle}
            />
          ) : null}
        </>
      ) : isEmptyScreen ? (
        <EmptyData
          isUploadFile={true}
          buttonText={Strings.buttonText}
          firstSubtitle={Strings.firstSubtitle}
          secondSubtitle={Strings.secondSubtitle}
          title={Strings.title}
          isRoundedButton
          onAddReceiptHandler={onSelectFilesHandler}
          emptyFrom="purchase"
        />
      ) : null} */}
    </>
  );
});
