import { FC } from "react";
import { ROUTES } from "constants/routes";

// import { HeaderPanel } from "components/HeaderPanel";
import { LoaderComponent } from "components/Loader";
// import { PaginationPanel } from "components/PaginationPanel";
// import { TableInboxAdmin } from "components/Table/TableInboxAdmin";

import { ReUseSearch } from "ReUseComponents/reUseSearch/ReUseSearch";
import { ReUseDatePicker } from "ReUseComponents/reUseDatePicker/ReuseDatePicker";
import { ReUseStatusFilter } from "ReUseComponents/reUseStatusFilter/ReUseStatusFilter";
import { ReUseActionMenu } from "ReUseComponents/reUseActionMenu/ReUseActionMenu";
import { ReUseActionButton } from "ReUseComponents/reUseActionButton/ReUseActionButton";

import { InboxContentStyles as Styled } from "./InboxContent.style";

export const InboxContent: FC<IInboxContent> = (props) => {
	const {
		primaryAction,
		userRole,
		dateValue,
		formattedDate,
		isInputDate,
		isDatePickerOpen,
		isDownloadButtonDisabled,
		onChangeDate,
		onChangeSearchValueHandler,
		onChangeStatusValueHandler,
		onChangeDateFilterValueHandler,
		onClickDownloadCSVButtonHandler,
		onClickOutsideDatePickerHandler,
		onDeleteItemHandler,
		// onMarkAsPaidButtonHandler,
		onMarkAsHandler,
		onDownloadExcelFileHandler,
		onEmailClick,
		onSelectFilesHandler,
		searchValue,
		setIsDatePickerOpen,
		showActions,
		statusValue,
		dateFilterValue,
		onActionsClick,
		onActionsClose,
		isContentLoading,
		dateFormat,
		isAllChecked,
		onCheckedPaidHandler,
		onCheckedApproveHandler,
		onCheckedPublishMockFuncHandler,
		onCheckedAllItemsHandler,
		onCheckedItemHandler,
		currentPage,
		inputPaginationValue,
		onBackwardClick,
		onChangePaginationInputValue,
		onChangeItemsPerPage,
		onForwardClick,
		onEnterGoToClick,
		onGoToClick,
		pages,
		itemsPerPage,
		onChangePage,
		isFetchingReceipts,
		datePickerRef,
		receiptList,
		sortField,
		sortOrder,
		requestSort,
		paginationCustomStyle,
		InBoxActionList,
		isActionMenuButtonDisabled,
	} = props;

	const isGuard = true;

	return (
		<Styled.Wrapper>
			{/* {!isFetchingReceipts && ( */}
				{/* <HeaderPanel
					dot3ExpReport={true}
					primaryAction={primaryAction}
					datePickerRef={datePickerRef}
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
					isDownloadButtonDisabled={isDownloadButtonDisabled}
					onDownloadExcelFileHandler={onDownloadExcelFileHandler}
					onDeleteItemHandler={onDeleteItemHandler}
					onMarkAsHandler={onMarkAsHandler}
				/>
				<Styled.ActionPanelPlaceHolder>
					<ReUseSearch searchValue={searchValue} onChangeSearchValueHandler={onChangeSearchValueHandler} onBlurHandler={onBlurHandler} onFocusSearchHandler={onFocusSearchHandler} />
				 	<ReUseDatePicker
						datePickerRef={datePickerRef}
						dateFilterValue={dateFilterValue}
						isDatePickerOpen={isDatePickerOpen}
						dateValue={dateValue}
						formattedDate={formattedDate}
			 		isInputDate={isInputDate}
			 		onChangeDate={onChangeDate}
			 		setIsDatePickerOpen={setIsDatePickerOpen}
						onChangeDateFilterValueHandler={onChangeDateFilterValueHandler}
			 		onClickOutsideDatePickerHandler={onClickOutsideDatePickerHandler}
				 	/>
				 	<ReUseStatusFilter onChangeStatusValueHandler={onChangeStatusValueHandler} statusValue={statusValue} />
					<ReUseActionButton displayText="Add Expense Report" buttonType="actionButton" widthType="primary" themedButton='primary' toPath={ROUTES.receiptUploadFile} locationState={{ action: "receipt" }} customWidth="50%" displayIconType="addPlus" />
					<ReUseActionMenu margin="0 0 0 auto" actionListArray={InBoxActionList} isActionMenuDisabled={isActionMenuButtonDisabled} />
				 	{isGuard && userRole !== "user" ? <ReUseActionButton displayText="Upload Invoices" buttonType="actionButton" widthType="primary" themedButton="primary" toPath={ROUTES.invoiceUploadFile} locationState={{ action: "upload-invoice" }} displayIconType="addPlus" /> : null}
				 </Styled.ActionPanelPlaceHolder>
			)} */}
			<Styled.TableWrapper>
				{/* {isContentLoading && ( */}
					<Styled.LoaderWrapper>
						<LoaderComponent theme="preview" />
					</Styled.LoaderWrapper>
				{/* )} */}
				{/* <TableInboxAdmin
					onCheckedItemHandler={onCheckedItemHandler}
					onCheckedAllItemsHandler={onCheckedAllItemsHandler}
					onCheckedPaidHandler={onCheckedPaidHandler}
					onCheckedApproveHandler={onCheckedApproveHandler}
					onCheckedPublishMockFuncHandler={onCheckedPublishMockFuncHandler}
					receiptList={receiptList}
					isAllChecked={isAllChecked}
					dateFormat={dateFormat}
					sortField={sortField}
					sortOrder={sortOrder}
					requestSort={requestSort}
					isContentLoading={isContentLoading}
					isFetchingReceipts
				/> */}
				{/* {receiptList?.length ? ( */}
					{/* <PaginationPanel
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
					/> */}
				 {/* ) : null} */}
			</Styled.TableWrapper>
		</Styled.Wrapper>
	);
};
