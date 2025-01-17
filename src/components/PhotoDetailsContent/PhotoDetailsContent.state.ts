import { ROUTES } from 'constants/routes';
import React, { useEffect, useState ,useRef, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRecieptDiscriptionDetails, updateInvoiceItem, updateReceiptItem } from 'screens/RecieptInvoiceDataList/RecieptInvoiceDataList.api';
import { format } from 'date-fns';
import { IState } from 'services/redux/reducer';
import { DATE_FORMATS } from 'constants/strings';
// import { SingleValue } from 'react-select';
import { ICurrency } from "../../screens/SignUp/types/signup.types";
import { ISelectedReceiptDetails } from 'screens/RIDATA/types/RIdata.type';
import { setSelectedReceiptSubDetails } from 'screens/RIDATA/reducer/RIdata.reducer';
export const usePhotoDetailsContentState = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const {user:{user:{id},currencies}, RIdata: { selectedReceipt , selectedReceiptDetails } } = useSelector((state: IState) => state);

  // Update state type to reflect Date values
  const [state, setState] = useState({
    currencyValue: selectedReceipt?.type_currency || '',
    type_date: selectedReceipt?.type_date ? new Date(selectedReceipt.type_date) : '',
    formattedDate: selectedReceipt?.type_date 
      ? format(new Date(selectedReceipt.created), DATE_FORMATS[0].value)
      : '',
    status: selectedReceipt?.status || '',
    vat: selectedReceipt?.vat_code || '',
    total: selectedReceipt?.total || '',
    tax: selectedReceipt?.tax || '',
    net:selectedReceipt?.net || '',
    supplier: selectedReceipt?.type_user || '',
    recieptId: selectedReceipt?.custom_id || '',
    id:selectedReceipt?.id||'',
    selectedReceiptSubDetails: selectedReceiptDetails || [],
    selectedReceiptSubDetailsCategory: selectedReceiptDetails.category || null ,
    selectedReceiptSubDetailsPayment_type: selectedReceiptDetails.payment_type || null ,
    selectedReceiptType:selectedReceipt?.type || '',
  });
  console.log('selectedReceiptDetails:-',selectedReceiptDetails);
  const [buttonValue, setButtonValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedReceipt) {
      setState({
        currencyValue: selectedReceipt.type_currency || '',
        type_date: selectedReceipt.type_date ? new Date(selectedReceipt.type_date) : '',
        
        formattedDate: selectedReceipt.type_date 
          ? format(new Date(selectedReceipt.type_date), DATE_FORMATS[0].value)
          : '',
        status: selectedReceipt.status || '',
        vat: selectedReceipt.vat_code || '',
        total: selectedReceipt.total || '',
        tax: selectedReceipt.tax || '',
        net:selectedReceipt.net || '',
        supplier:selectedReceipt.type_user || '',
        recieptId: selectedReceipt.custom_id || '',
        id:selectedReceipt.id || '',
    selectedReceiptSubDetails: selectedReceiptDetails || [],
    selectedReceiptSubDetailsCategory:selectedReceiptDetails.category||null ,
    selectedReceiptSubDetailsPayment_type: selectedReceiptDetails.payment_type || null ,
selectedReceiptType:selectedReceipt.type || '',
      });
    }
  }, [selectedReceipt?.id]);

  const onCancelButtonClickHandler = () => navigate(-1);

  interface ICurrenciesData{
    value: string,
    label: string,
    [key: string]: string | undefined;
    id?: string
  }
  const currenciesData: ICurrenciesData[] = currencies.map((currency: ICurrency) => ({
    value: currency.id,
    label: `${currency.country} - ${currency.value}`,
    key: currency.id,
    id:currency.id
  }));

  const onDatePickerClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    datePickerRef.current &&
      datePickerRef?.current.contains(e.target as Node) &&
      setIsOpen(!isOpen);
    console.log("datePickerRef.current :- ",datePickerRef.current);
  };

  const onChangeRadioButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    setButtonValue(event.currentTarget.value);
    console.log("buttonValue :--- ", buttonValue);
  };

  const onChangeDate = (date: Date) => {
    setIsOpen(!isOpen);
    setState(prevState => ({
      ...prevState,
      formattedDate: format(date, DATE_FORMATS[0].value),
      type_date:date
    }));
    console.log("Selected Date:", state.type_date); // Raw date object
  console.log("Formatted Date:", format(date, DATE_FORMATS[0].value)); // Formatted date
  };

  const onForbiddenCharacterClick = (event: React.KeyboardEvent) => {
    if (event.key === '-' || event.key === 'e' || event.key === '+') {
      event.preventDefault();
    }
  };
  const rejectInvoiceHandler = async () => {
    try {
     const headerStringData:any ={
      id: selectedReceipt?.id ?? '', 
      type:selectedReceipt?.type || null,
      status: 'rejected'

     }
      const payload: IUpdateInvoiceItemPayload = {
        id: selectedReceipt?.id ||  '', 
        description: selectedReceipt?.description || null, 
        status: 'rejected', 
        saleinvoice_date: state.type_date || selectedReceipt?.type_date || null,
        customer:state.supplier || selectedReceipt?.type_user || null,

        // supplier: state.supplier || selectedReceipt?.type_user || null, 
        customer_account: null, 
        payment_type:state?.selectedReceiptSubDetailsPayment_type || selectedReceiptDetails.payment_type || null,
        category: state?.selectedReceiptSubDetailsCategory || selectedReceiptDetails.category || null,
        vat_code: state.vat || selectedReceipt?.vat_code || null, 
        net: state.net || selectedReceipt?.net || null, 
        tax: state.tax || selectedReceipt?.tax || null, 
        total: state.total || selectedReceipt?.total || null, 
        currency: state.currencyValue || selectedReceipt?.type_currency || null, 
        publish_status: selectedReceipt?.publish_status ?? false, 
        payment_status: selectedReceipt?.payment_status ?? false, 
        // active_account: null, 
        vendor:state.supplier || selectedReceipt?.type_user || null
        // payment_type: '', 
      };
console.log("payload:-  ",payload);
      setIsLoading(true);
      await updateInvoiceItem(payload ,headerStringData);
      navigate(ROUTES.pendingriData);
    } catch (error) {
      console.error('Error updating receipt:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
const saveInvoiceHandler = async () => {
    try {
     const headerStringData:any ={
      id: selectedReceipt?.id ?? '', 
      type:selectedReceipt?.type || null,
      status: 'reviewed'

     }
      const payload: IUpdateInvoiceItemPayload = {
        id: selectedReceipt?.id ||  '', 
        description: selectedReceipt?.description || null, 
        status: 'reviewed', 
        saleinvoice_date: state.type_date || selectedReceipt?.type_date || null,
        // supplier: state.supplier || selectedReceipt?.type_user || null, 
        customer:state.supplier || selectedReceipt?.type_user || null,
        customer_account: null, 
        payment_type:state?.selectedReceiptSubDetailsPayment_type || selectedReceiptDetails.payment_type || null,
        category: state?.selectedReceiptSubDetailsCategory || selectedReceiptDetails.category || null,
        vat_code: state.vat || selectedReceipt?.vat_code || null, 
        net: state.net || selectedReceipt?.net || null, 
        tax: state.tax || selectedReceipt?.tax || null, 
        total: state.total || selectedReceipt?.total || null, 
        currency: state.currencyValue || selectedReceipt?.type_currency || null, 
        publish_status: selectedReceipt?.publish_status ?? false, 
        payment_status: selectedReceipt?.payment_status ?? false, 
        // active_account: null, 
        vendor:state.supplier || selectedReceipt?.type_user || null
        // payment_type: '', 
      };
console.log("payload:-  ",payload);
      setIsLoading(true);
      await updateInvoiceItem(payload ,headerStringData);
      navigate(ROUTES.pendingriData);
    } catch (error) {
      console.error('Error updating receipt:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const rejectReceiptHandler = async () => {
    try {
     const headerStringData:any ={
      id: selectedReceipt?.id ?? '', 
      type:selectedReceipt?.type || null,
      status: 'rejected'

     }
      const payload: IUpdateReceiptItemPayload = {
        id: selectedReceipt?.id ||  '', 
        description: selectedReceipt?.description || null, 
        status: 'rejected', 
        receipt_date: state.type_date || selectedReceipt?.type_date || null,
        supplier: state.supplier || selectedReceipt?.type_user || null, 
        supplier_account: null, 
        payment_type:state?.selectedReceiptSubDetailsPayment_type || selectedReceiptDetails.payment_type || null,
        category: state?.selectedReceiptSubDetailsCategory || selectedReceiptDetails.category || null,
        vat_code: state.vat || selectedReceipt?.vat_code || null, 
        net: state.net || selectedReceipt?.net || null, 
        tax: state.tax || selectedReceipt?.tax || null, 
        total: state.total || selectedReceipt?.total || null, 
        currency: state.currencyValue || selectedReceipt?.type_currency || null, 
        publish_status: selectedReceipt?.publish_status ?? false, 
        payment_status: selectedReceipt?.payment_status ?? false, 
        // active_account: null, 
        vendor:state.supplier || selectedReceipt?.type_user || null
        // payment_type: '', 
      };
console.log("payload:-  ",payload);
      setIsLoading(true);
      await updateReceiptItem(payload ,headerStringData);
      navigate(ROUTES.pendingriData);
    } catch (error) {
      console.error('Error updating receipt:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const saveReceiptHandler = async () => {
    try {
     const headerStringData:any ={
      id: selectedReceipt?.id ?? '', 
      type:selectedReceipt?.type || null,
      status: 'reviewed'

     }
      const payload: IUpdateReceiptItemPayload = {
        id: selectedReceipt?.id ||  '', 
        description: selectedReceipt?.description || null, 
        status: 'reviewed', 
        receipt_date: state.type_date || selectedReceipt?.type_date || null,
        supplier: state.supplier || selectedReceipt?.type_user || null, 
        supplier_account: null, 
        payment_type:state?.selectedReceiptSubDetailsPayment_type || selectedReceiptDetails.payment_type || null,
        category: state?.selectedReceiptSubDetailsCategory || selectedReceiptDetails.category || null,
        vat_code: state.vat || selectedReceipt?.vat_code || null, 
        net: state.net || selectedReceipt?.net || null, 
        tax: state.tax || selectedReceipt?.tax || null, 
        total: state.total || selectedReceipt?.total || null, 
        currency: state.currencyValue || selectedReceipt?.type_currency || null, 
        publish_status: selectedReceipt?.publish_status ?? false, 
        payment_status: selectedReceipt?.payment_status ?? false, 
        // active_account: null, 
        vendor:state.supplier || selectedReceipt?.type_user || null
        // payment_type: '', 
      };
console.log("payload:-  ",payload);
      setIsLoading(true);
      await updateReceiptItem(payload ,headerStringData);
      navigate(ROUTES.pendingriData);
    } catch (error) {
      console.error('Error updating receipt:', error);
    } finally {
      setIsLoading(false);
    }
  };

// cmnt api (get receipt item details)
  const getReceiptSubItemDetail = async (id:string) => {
  
    try {
      const payload: IGetRecieptDiscriptionDetailsPayload = {
        id: id || selectedReceipt?.id || state.id || ''
      };
      const { data } = await getRecieptDiscriptionDetails(payload);
      dispatch(setSelectedReceiptSubDetails(data));
      console.log(data);
     }
    catch (error) {
      console.error('Error updating receipt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickOutsideDatePickerHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    datePickerRef.current &&
      !datePickerRef?.current.contains(event.target as Node) &&
      setIsOpen(false);
  };
  const datePickerRef = useRef<HTMLButtonElement>(null);

  const handleFieldChange = (fieldName: string, value: string) => {
    // console.log(fieldName + ': ' + value);
		setState((prevState) => ({
			...prevState,
			[fieldName]: value,
		}));
		
	};
  

  // const handleInputChange = (
  //   event:ChangeEvent<HTMLInputElement>,
  //   field: string
  // ) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     [field]: event.target.value,
	//   }));
	//   console.log("field :---",field , "event :---" , event);
  // };
  return {
    ...state,
    setState,
    state,
    isLoading,
    isOpen,
    onChangeDate,
    onCancelButtonClickHandler,
    onChangeRadioButtonHandler,
    saveReceiptHandler,
    onDatePickerClickHandler,
    datePickerRef,
    onClickOutsideDatePickerHandler,
    onForbiddenCharacterClick,
    handleFieldChange,    
    currenciesData,
    getReceiptSubItemDetail,
    rejectReceiptHandler,
    saveInvoiceHandler,
    rejectInvoiceHandler
  };
};
