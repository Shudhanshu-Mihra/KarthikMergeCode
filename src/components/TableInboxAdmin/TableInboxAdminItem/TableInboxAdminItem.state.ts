import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from 'services/redux/reducer';

import { selectReceipt , selectRecieptType,selectRecieptPhoto, setFlagDataUpdate} from 'screens/RIDATA/reducer/RIdata.reducer';

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
  // const [isRed, setIsRed] = useToggle(false);
  const [isRed, setIsRed] = useState(false);

  const user = useSelector((state: IState) => state.user);
  const [state, setState] = useState({
    is_flagged:selectedReceipt?.is_flagged|| '',
    id:selectedReceipt?.id||'',
    selectedReceiptType:selectedReceipt?.type || '',
  });
  useEffect(() => {
    if (selectedReceipt) {
      setState({
        is_flagged:selectedReceipt.is_flagged|| '',
        id:selectedReceipt.id || '',
selectedReceiptType:selectedReceipt.type || '',
      });
    }
  }, [selectedReceipt?.id]);

  const handleClick = (Id: string , type:string) => {

    const payload = {
          id: Id || '',
          entity: type || ''
        }
        const sendPayload = async () => {
          try {
            const response = await sendFlagData(payload);
            console.log("response.data.is_flagged :- ", response.data.is_flagged);
            const data = response.data.is_flagged;
           dispatch(setFlagDataUpdate({ id: Id, is_flagged: data })) ;
            setIsRed(data)
          } catch (error) {
            console.error("Error sending flag data:", error);
          }
        };
        
        sendPayload();
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
