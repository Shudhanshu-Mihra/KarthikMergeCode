import { useState ,useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import { selectedRecieptPhoto } from "../RIDATA/reducer/RIdata.reducer";
import { IState } from 'services/redux/reducer';
import { selectReceipt, selectRecieptPhoto } from '../RIDATA/reducer/RIdata.reducer';
import { getImageUrlFromAws } from 'screens/RIDATA/RIdata.api';
import { IImageView } from 'screens/RIDATA/types/RIdata.type';
export const useRIDetailsState = () => {
//   console.log('useReceiptDetailsState  call here ');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState('');
//   const [isPDF, setIsPDF] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  
  
  const {
    RIdata: {
      selectedReceiptIndex,
      selectedReceipt,
      selectedReceiptType,
      receiptInvoiceData,
      selectedReceiptPhoto,
    }
    } = useSelector((state: IState) => state);
    
//   console.warn('receipt view -------', imageSrc);

  const onGoBackHandler = () => navigate(-1);

//   const onClickGetNextReceiptHandler = () => {
//     if (Number(selectedReceiptIndex) + 1 >= recieptInvoiceData.length) return;
//     dispatch(selectReceipt(Number(selectedReceiptIndex) + 1));
//     let ImageKey = {
//       keys: selectedRecieptPhoto
// }

//     onFetchReceiptImageHandler(ImageKey)
  //   };
  const onClickGetNextReceiptHandler = () => {
//     setImageLoading(true);
//     if (Number(selectedReceiptIndex) + 1 >= recieptInvoiceData.length) return;
  
//     const nextReceiptIndex = Number(selectedReceiptIndex) + 1;
// console.log("nextReceiptIndex",nextReceiptIndex);
//     dispatch(selectReceipt(nextReceiptIndex));
  
//     const nextReceiptImageIndex =  recieptInvoiceData;
//     console.log("selectedRecieptPhoto :-" , nextReceiptImageIndex);

//     onFetchReceiptImageHandler();
    setImageLoading(true);
if (Number(selectedReceiptIndex) + 1 >= receiptInvoiceData.length) return;
    dispatch(selectReceipt(Number(selectedReceiptIndex) + 1));
    // console.log("selectReceipt:- ",selectedReciept);
    setImageLoading(false);
    
  };

  const onClickGetPrevReceiptHandler = () => {
    setImageLoading(true);

    if (Number(selectedReceiptIndex) <= 1) return;
    dispatch(selectReceipt(Number(selectedReceiptIndex) - 1));
    setImageLoading(false);

  };
  
  const onFetchReceiptImageHandler = useCallback(async () => {
    console.log(selectedReceipt?.photos);
    try {
      const payload = { keys: [selectedReceipt?.photos|| ''] };
      console.log(payload);
      const { data } = await getImageUrlFromAws(payload);
          // dispatch(selectRecieptPhoto(data.url))
          // dispatch(selectRecieptPhoto(data.key))
      setImageUrl(data.url)
    return(data.url);
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
    }
  }, [selectedReceipt]);


  return {
      selectedReceiptIndex,
    selectedReceipt,
    selectedReceiptType,
    receiptInvoiceData,
    selectedReceiptPhoto,
    imageUrl,
    // imageSrc,
    // receipts,
    // selectedReceiptIndex,
    isImageLoading,
    // isPDF,
    // onGetReceiptImageHandler,
    onGoBackHandler,
    onClickGetNextReceiptHandler,
    onClickGetPrevReceiptHandler,
    onFetchReceiptImageHandler,
  };
};
