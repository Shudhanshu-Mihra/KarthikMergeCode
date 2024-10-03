import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from 'services/redux/reducer';

import { selectReceipt , selectRecieptType,selectRecieptPhoto} from 'screens/RIDATA/reducer/RIdata.reducer';

import { ROUTES } from 'constants/routes';
import { useToggle } from 'hooks/useToggle';
import { useCallback, useState } from 'react';
import { getImageUrlFromAws } from 'screens/RIDATA/RIdata.api';

interface IuseTableInboxAdminItemState {
  receiptId: string;
  selectedReceiptIndex: number;
  type: string;
  photos: string;
}

export const useTableInboxAdminItemState = (
  props: IuseTableInboxAdminItemState
) => {
  const { selectedReceiptIndex, type, photos } = props;
  
  const {
    RIdata: {
      selectedReceipt,
      selectedReceiptType,
      receiptInvoiceData,
      selectedReceiptPhoto,
    }
    } = useSelector((state: IState) => state);
  // console.log("receiptIndex  :-- ",receiptIndex);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');

  const user = useSelector((state: IState) => state.user);

  const onReceiptDetailsClickHandler = (
    event:React.MouseEvent<HTMLDivElement>
  ) => {
    dispatch(selectReceipt(selectedReceiptIndex));
    dispatch(selectRecieptType(type));
    dispatch(selectRecieptPhoto([photos]));
    navigate(ROUTES.ridetails);
  };

  const [isModalWindowOpen, onModalWindowToggle] = useToggle();


  const onModalWindowToggleHandler = () => {
    // onGetCompaniesHandler();
    onModalWindowToggle();
    onFetchReceiptImageHandler();
  };
  const onModalWindowCancelClickButtonHandler = () => {
    onModalWindowToggle();
   
  };

  function downloadImage() {
    console.log("imageUrl");

    fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "Reciept"; // Set your desired file name
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up after download
        })
        .catch(error => {
            console.error('Error downloading the image:', error);
        });
}

  // Usage
  
  const onFetchReceiptImageHandler = useCallback(async () => {
    console.log(photos);
    try {
      const payload = { keys: [photos|| ''] };
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
  console.log("imageUrl:-" ,imageUrl);
  return {
    ...user.userInfo,
    onReceiptDetailsClickHandler,
    onModalWindowToggleHandler,
    isModalWindowOpen,
    onModalWindowCancelClickButtonHandler,
    onFetchReceiptImageHandler,
    selectedReceipt,
    imageUrl,
    downloadImage
  };
};
