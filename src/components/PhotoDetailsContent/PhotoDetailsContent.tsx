import { FC, useEffect, memo ,useState } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { StatusBar } from "../StatusBar";
import { ButtonsBox } from "../ButtonsBox";
import { FieldsBox } from "./FieldsBox";
// import { usePhotoDetailsContentState } from "./PhotoDetailsContent.state";
import { PhotoDetailsContentStyles as Styled } from "./PhotoDetailsContent.style";
import { PhotoDetailsContentItem } from "./PhotoDetailsContentItem";
import { ButtonsBoxNew } from "../ButtonBoxNew";
import { CheckboxItem } from "components/Checkbox";

import PurchaseTable from "components/Purchases/PurchasesTable";
// import { PhotoDetailsTabs } from "../PhotoDetailsContent";
import { IState } from 'services/redux/reducer';
import { usePhotoDetailsContentState } from "./PhotoDetailsContent.state";

interface ChildProps {
	changePaid: boolean;
	fnChangePaid: () => void;
	actionValue: boolean;
	fnGetPayStatus: (what: boolean | undefined) => void;
	// onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	// onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	changePublish: boolean;
	fnChangePublish: () => void;
	newPublish: boolean;
	getLivePublish:(what: boolean | undefined) => void;
	// rejectReceiptHandler?: () => Promise<void>;
	rejected?: () => Promise<void>;
	reviewed?:() => Promise<void>;
}

interface Item {
	vatCode: number;
	units: number;
	price: number;
	net: number;
	vat: number;
	total: number;
  }
export const PhotoDetailsContent: FC<ChildProps> = memo((props) => {

	// const { changePaid, fnChangePaid, actionValue, fnGetPayStatus } = props;
	// const { changePublish, fnChangePublish, newPublish, getLivePublish } = props;
	// console.log("!!!!!!!!!!!!!!!!! - RDContent child-form", actionValue);
	// const {changePaid} = props;
	const {
		state,
		currenciesData,
		type_date,
		isOpen,
		isLoading,
		datePickerRef,
		saveReceiptHandler,
		onChangeRadioButtonHandler,
		onCancelButtonClickHandler,
		onClickOutsideDatePickerHandler,
		onDatePickerClickHandler,
		status,
		onForbiddenCharacterClick,
		handleFieldChange,
		onChangeDate,
		recieptId,
		getReceiptSubItemDetail,
		rejectReceiptHandler,
		saveInvoiceHandler,
		rejectInvoiceHandler
	} = usePhotoDetailsContentState();
	
	// const [purchaseItems, setPurchaseItems] = useState<Item[]>([
	// 	{vatCode: 0, units: 0, price: 0, net: 0, vat: 0, total: 0 }
	//   ]);

	const {
		    user:{currencies},
		    RIdata: { selectedReceipt }
			
		  } = useSelector((state: IState) => state);
	
	useEffect(() => {
		const receiptId = state.id;
		if (receiptId) {
			getReceiptSubItemDetail(receiptId);
		}
	  }, [state.id]);
	  
	return (
		<Styled.ReceiptDetailContent>
			<Styled.StatusBarWrapper>
				<PhotoDetailsContentItem label="Status">
					{/* <StatusBar status={selectedReceipt?.status } /> */}
					<StatusBar status={status as TStatuses} />
				</PhotoDetailsContentItem>
				 <PhotoDetailsContentItem label="Recept ID">
					<StatusBar rid={recieptId} />
				</PhotoDetailsContentItem> 
			</Styled.StatusBarWrapper>

			<Styled.FormFieldWrapper>
				<FieldsBox
					// findLabelById={findLabelById}
					inputFields={state}
					options={ currenciesData}
					currencies={currencies}
					onDatePickerClickHandler={onDatePickerClickHandler}
					onClickOutsideDatePickerHandler={onClickOutsideDatePickerHandler}
					isOpen={isOpen}
					onDateChange={ onChangeDate}
					formattedDate={state.formattedDate}
					datePickerRef={datePickerRef}
					selectedDate={type_date ? new Date(type_date) : null}
					onForbiddenCharacterClick={onForbiddenCharacterClick}
					onFieldChange={handleFieldChange}
				/>
			</Styled.FormFieldWrapper>
			<Styled.ReceiptItemTable>
				<h4>Details</h4>
			{/* {selectedReciept.map((items) => <Styled.items>{items}</Styled.items>): 'no data'} */}
				{/* <PurchaseTable inputFields={selectedReciept}/> */}
				{/* <PurchaseTable inputFields={state} items={purchaseItems} onItemsChange={handlePurchaseItemsChange}/> */}
				<PurchaseTable inputFields={state}  onItemsChange={handleFieldChange} />
			</Styled.ReceiptItemTable>
			{/* <Styled.ReceiptStatusContainer>
				<Styled.CheckboxContainer>
					<CheckboxItem
						name={"Payment status"}
						isChecked={paymentStatus}
						// isChecked={false}
						labelText={"Mark as Paid"}
						onChange={onChangePaymentStatus}
					/>
					<CheckboxItem
						name={"Publish status"}
						isChecked={isPublishStatus}
						// isChecked={true}
						labelText={"Mark as Published"}
						onChange={onChangePublishStatus}
					/>
				</Styled.CheckboxContainer>
				<Styled.Description>
					<Styled.DescriptionInput type="text" placeholder="Description" />
				</Styled.Description>
			</Styled.ReceiptStatusContainer> */}
			<Styled.Footer>
  {state.selectedReceiptType === "receipt" ? (
    <>
      <ButtonsBoxNew 
        rejected={rejectReceiptHandler} 
        onRejectButtonClickHandler={onChangeRadioButtonHandler} 
        isLoading={isLoading} 
      />
      <ButtonsBox 
        reviewed={saveReceiptHandler} 
        onCancelButtonClickHandler={onCancelButtonClickHandler} 
        isLoading={isLoading} 
        onApproveButtonClickHandler={onChangeRadioButtonHandler} 
      />
    </>
  ) : (
    <>
      <ButtonsBoxNew 
        rejected={rejectInvoiceHandler} 
        onRejectButtonClickHandler={onChangeRadioButtonHandler} 
        isLoading={isLoading} 
      />
      <ButtonsBox 
        reviewed={saveInvoiceHandler} 
        onCancelButtonClickHandler={onCancelButtonClickHandler} 
        isLoading={isLoading} 
        onApproveButtonClickHandler={onChangeRadioButtonHandler} 
      />
    </>
  )}
</Styled.Footer>

		</Styled.ReceiptDetailContent>
	);
});
