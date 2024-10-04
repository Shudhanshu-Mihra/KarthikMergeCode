import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from 'services/redux/reducer';

import { selectReceipt , selectRecieptType,selectRecieptPhoto} from 'screens/RIDATA/reducer/RIdata.reducer';

import { ROUTES } from 'constants/routes';
import { useToggle } from 'hooks/useToggle';
import { useCallback, useEffect, useState } from 'react';
import { getImageUrlFromAws, sendFlagData } from 'screens/RIDATA/RIdata.api';

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [isRed, setIsRed] = useState(false);

  const user = useSelector((state: IState) => state.user);
  const [state, setState] = useState({
    id:selectedReceipt?.id||'',
    selectedReceiptType:selectedReceipt?.type || '',
  });
  useEffect(() => {
    if (selectedReceipt) {
      setState({
        id:selectedReceipt.id || '',
selectedReceiptType:selectedReceipt.type || '',
      });
    }
  }, [selectedReceipt?.id]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsRed((prev) => !prev);
    console.log(selectedReceiptIndex);
    console.log("flag active:", !isRed);  
    dispatch(selectReceipt(selectedReceiptIndex));   
  };


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
    try {
      const payload = { keys: [photos|| ''] };
      const { data } = await getImageUrlFromAws(payload);
          // dispatch(selectRecieptPhoto(data.url))
          // dispatch(selectRecieptPhoto(data.key))
      setImageUrl(data.url)
    return(data.url);
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
    }
  }, [selectedReceipt]);

  // const updateFlagValue = ((selectedReceipt:any) => {
  //  if (selectedReceipt) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       id: selectedReceipt?.id || '',
  //       selectedReceiptType: selectedReceipt.type || ''
  //     }));
  //   }
  
  //   // The state updates asynchronously, so log updated state after the click
  //   console.log("Updated state (old value):", state);
  //   const payload = {
  //     id: state.id|| selectedReceipt.id || '',
  //     type: state.selectedReceiptType || selectedReceipt.type || ''
  //    }
  //   sendFlagData(payload)
  // },[isRed]);

  useEffect(() => {
    const updateFlagValue = () => {
      if (selectedReceipt) {
      
        const payload = {
          id: selectedReceipt?.id || '',
          entity: selectedReceipt?.type || ''
        }
        sendFlagData(payload);
      }
    };
    updateFlagValue();
  }, [!isRed]);
  
    // Do not attempt to log or use the updated state immediately here, since it will still have the old value.
  //   console.log("Selected receipt:", selectedReceipt);
  // };
  return {
    ...user.userInfo,
    onReceiptDetailsClickHandler,
    onModalWindowToggleHandler,
    isModalWindowOpen,
    onModalWindowCancelClickButtonHandler,
    onFetchReceiptImageHandler,
    selectedReceipt,
    imageUrl,
    downloadImage,
    selectedReceiptPhoto,
    handleClick,
    isRed,
    setIsRed
  };
};
