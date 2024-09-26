
import { FC } from 'react';
import { Input } from '../../Input'; // Assuming Input is used to display field values
import { FiedlsBoxStyles as Styled } from './FiledsBox.style'; // Assuming this is for styling
import { IReceiptInvoiceData } from 'screens/RIDATA/types/RIdata.type';
import { CustomDatePicker } from 'components/CustomDatePicker';
import { PhotoDetailsContent } from '../PhotoDetailsContent';
import { PhotoDetailsContentItem } from '../PhotoDetailsContentItem';
import { CustomSelect } from 'components/CustomSelect';
import { ICurrency } from 'screens/SignUp/types/signup.types';
import { ActionMeta, MultiValue, OnChangeValue, SingleValue } from 'react-select';
import { getFormatedCurrencies } from 'services/utils';
import { currencies } from 'screens/SignUp/SignUp.constants';
import { selectReceipt } from 'screens/RIDATA/reducer/RIdata.reducer';
// Define the custom labels for each field
const FIELD_LABELS: { [key: string]: string } = {
  supplier: 'Supplier',
  type_date: 'Date',
  currencyValue: 'Currency',
  net: 'Net Amount',
  vat: 'VAT Code',
  tax: 'Tax Amount',
  total: 'Total Amount',
};

// Define the fields to display
const FIELDS_TO_DISPLAY = ['supplier', 'type_date', 'currencyValue'];

export interface IFieldsState{
  // id: string ;
  // custom_id: string  ;
  // type_currency: string ;
  // created: string  ;
  // status: string  ;
  // vat_code: string ;
  // total: string  ;
  // tax: string  ;
  // type_user: string  ;
  currencyValue: string;
  type_date: string | Date;
  formattedDate: string;
  status: string;
  vat: string;
  total: string;
  tax: string;
  supplier: string;
  recieptId: string;
}

interface IFieldsBox {
  // inputFields: IRecieptInvoiceData | null;
  inputFields: IFieldsState | null;
  onForbiddenCharacterClick?: (event: React.KeyboardEvent<Element>) => void;
  onFieldChange?: (fieldName: string, value: string) => void; // Added handler for field changes
  formattedDate?: string;
  onDatePickerClickHandler?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  isOpen?: boolean;
  datePickerRef?: React.RefObject<HTMLButtonElement> | undefined;
  onClickOutsideDatePickerHandler?: ((event: React.MouseEvent<HTMLDivElement>) => void) | undefined;
  selectedDate?: Date | null | undefined;
  onDateChange?: ((date: Date) => void) | undefined;
  currencies: ICurrency[];
  options: IOption[] | undefined;
}

export const  FieldsBox: FC<IFieldsBox> = ({
  inputFields,
  onForbiddenCharacterClick,
  formattedDate,
  onFieldChange,
  onDatePickerClickHandler,
  isOpen,
  datePickerRef,
  onClickOutsideDatePickerHandler,
  selectedDate,
  onDateChange,
  options
  // currencies
}) => {

  const handleFieldChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
		if (onFieldChange) {
			onFieldChange(fieldName, event.target.value); // Call the handler passed from parent
		}
	};

  // const onChangeCurrencyFieldHandler = (
  //   newValue:
  //     {
  //     value: string,
  //     label: string,
  //     key:string
  //     }
  //   ,
  //   actionMeta: ActionMeta<unknown>
  // ) => {
  //   // Logging the selected currency value
  //   console.log('currencyValue', newValue.value);
  
  //   // Check if newValue is not null before accessing properties
  //   if (newValue && onFieldChange) {
  //     onFieldChange("currencyValue", newValue.value);
  //   }
  // };

  interface ICurrencyChange {
    value: string;
    label: string;
    key: string;
  }
  
  // Handler function with correct types
  const onChangeCurrencyFieldHandler = (
    newValue: OnChangeValue<ICurrencyChange, false> | unknown, // Accept unknown due to the handler's type
    actionMeta: ActionMeta<ICurrencyChange | unknown>
  ) => {
    // Safely cast newValue to ICurrencyChange type
    const currencyValue = newValue as ICurrencyChange;
  
    // Logging the selected currency value
    console.log('currencyValue', currencyValue?.value);
  
    // Check if currencyValue is valid and call the change handler
    if (currencyValue && onFieldChange) {
      onFieldChange("currencyValue", currencyValue.value);
    }
  };
// console.log("options:-- ",options)
  const findLabelById = (id: string) => {
    console.log("currency get field id :-  ",id);

    const item = options?.find(data => data.id == id);
    console.log("currency get field:-  ",item);
    return item ? item.label : "Unknown Label"; // fallback in case id is not found
  };
  
const item = {
  value: 
    {
      value: inputFields?.currencyValue,
      // label: inputFields?.currencyValue,
      label: findLabelById ? findLabelById(inputFields?.currencyValue ?? '') : 'Unknown Currency',  
      id: inputFields?.currencyValue
    } as SingleValue<IOption>, // Multiple selections
  currencies:options,
   
    onChangeSelect: onChangeCurrencyFieldHandler,

  isDisabled: false
};

// const onChangeSelect = (
//   newValue: OnChangeValue<IOption, boolean> | unknown,
//   actionMeta: ActionMeta<IOption | unknown>
// ) => {
//   // Check if newValue is valid and process accordingly
//   if (Array.isArray(newValue)) {
//     // MultiValue case
//     console.log('Selected multiple options:', newValue);
//   } else if (newValue && typeof newValue === 'object') {
//     // SingleValue case
//     console.log('Selected single option:', newValue as IOption);
//   }

//   // You can also use actionMeta to handle specific actions
//   console.log('Action meta:', actionMeta);
// };
console.log("formattedDate:---" , formattedDate);
  return (
    <Styled.Container>
      {inputFields ? (
        Object.entries(inputFields)
          .filter(([key]) => FIELDS_TO_DISPLAY.includes(key)) // Filter the fields to only include the specified ones
          .map(([key, value], index) => (
            // <Styled.FieldItem key={index}>
            <PhotoDetailsContentItem  label={FIELD_LABELS[key] }>

              {key === 'type_date' ? (
                <CustomDatePicker
                  isInputDate
                  onChange={onDateChange} // Ensure item.onChangeDate is properly defined
                  onDatePickerClickHandler={onDatePickerClickHandler} // Ensure this handler is defined
                  onClickOutsideDatePickerHandler={onClickOutsideDatePickerHandler} // Ensure this handler is defined
                  isDatePickerOpen={isOpen} // Ensure isOpen is properly defined
                  selectedDate={selectedDate} // Ensure selectedDate is defined
                  formattedDate={formattedDate}
                  datePickerRef={datePickerRef} // Ensure datePickerRef is properly defined
                />
              ) : key === 'currencyValue' ? (
                <CustomSelect
                  value={item.value}
                  options={item.currencies}
                  onChangeValueHandler={onChangeCurrencyFieldHandler}
                  marginBottom="0px"
                  isDisabled={item.isDisabled}
                  isRemoveBorder
                />
                // <></>
              ) :  (
                  
                <Input
                    // text={FIELD_LABELS[key] || key}
                    isDisabled={false}
                    value={typeof value === 'string' ? value : String(value)}
                    onKeyDown={onForbiddenCharacterClick}
                    onChangeValue={handleFieldChange(key)}
                    // onChangeValue={handleFieldChange(key)}
                  // inputName={key}
                   // Assuming `isInputDate` is dependent on the key
                />
                )}
            </PhotoDetailsContentItem>
          ))
        ) : (
          <h1>empty data</h1>
        )}
    </Styled.Container>
  );
};
