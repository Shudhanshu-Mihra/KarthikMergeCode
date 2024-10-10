import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Download } from 'assets/icons/downloadIcon.svg';
import { getCorrectCustomId } from 'services/utils';

// import { CheckboxItem } from 'components/Checkbox/Checkbox';
import { StatusLabel } from 'components/StatusLabel/StatusLabel';

import { TableInboxAdminItemStyles as Styled } from './TableInboxAdminItem.style';
import { useTableInboxAdminItemState } from './TableInboxAdminItem.state';
import { Icon } from 'components/Icons';
import { ModalBox } from 'screens/Settings/UsersList/ModalBox';
import { ReUseModal } from '../ReUseableModelBox/ReUseModal';
import { PhotoPreview } from 'components/PhotoPreview';
import { ImageViewer } from '../ImageViewer/ImageViewer';

interface TableInboxAdminProps {
  isVisited?: boolean;
  onCheckedItemHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedPaidHandler?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  onCheckedApproveHandler?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  onCheckedPublishMockFuncHandler?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isChecked?: boolean;
  tax: string | null;
  // date: string | null;
  date: string;
  supplier?: string | null;
  supplierAccount?: string | null;
  category?: string | null;
  vatCode: string | null;
  currency?: string | null;
  net: string | null;
  total: string | null;
  status: string;
  receiptId: string;
  selectedReceiptIndex: number;
  customId: string;
  paymentStatus?: boolean;
  approveStatus?: boolean;
  publishStatus?: boolean;
  dateFormat: string;
  type: string;
  photos: string;
  is_flagged: boolean;
}

export const TableInboxAdminItem: React.FC<TableInboxAdminProps> = (props) => {
  const {
    // isChecked,
    category,
    // currency,
    date,
    net,
    status,
    supplier,
    // supplierAccount,
    total,
    vatCode,
    tax,
    receiptId,
    selectedReceiptIndex,
    customId,
    // paymentStatus,
    // approveStatus,
    // publishStatus,
    is_flagged,
    dateFormat,
    type,
    photos,
    // onCheckedPaidHandler,
    // onCheckedApproveHandler,
    // onCheckedItemHandler,
    // onCheckedPublishMockFuncHandler,
  } = props;

  const { onReceiptDetailsClickHandler
    , onModalWindowToggleHandler,
    isModalWindowOpen,
    onModalWindowCancelClickButtonHandler,
    // onFetchReceiptImageHandler,
    // selectedReceipt,
    // downloadImage,
    imageUrl,
    selectedReceiptPhoto,
    handleClick,
    setIsRed,
    isRed
  } = useTableInboxAdminItemState({
    receiptId,
    selectedReceiptIndex,
    photos,
    type,
  });

    return (
      <Styled.Item>
      <ReUseModal isModalWindowOpen={isModalWindowOpen} onCloseModalWindowHandler={onModalWindowCancelClickButtonHandler}>
        <Styled.mainImageModel>
          <Styled.CloseIconWrapper>
            <Close width={20} onClick={onModalWindowCancelClickButtonHandler} />
          </Styled.CloseIconWrapper>
          {photos ? (
      <ImageViewer download={photos} imageUrl={imageUrl} />
    ) : (
      <Styled.NoImageMessage>No image is there</Styled.NoImageMessage>
    )}
        </Styled.mainImageModel>
      </ReUseModal>

      <Styled.ImageIcon id={receiptId} onClick={onModalWindowToggleHandler}>
        <Icon type="Image" width="18px" />
      </Styled.ImageIcon>

      <Styled.ImageIcon   onClick={() => handleClick(receiptId,type)}>
        <Icon
          className='FlagIcon'
          fill={isRed || is_flagged  ? 'red' : 'gray'} // Change to red when clicked
          stroke={isRed || is_flagged ? 'red' : 'gray'} // Also apply stroke color
          type="FlagIcon"
          width="18px"
        />
      </Styled.ImageIcon>

      <Styled.View id={receiptId} onClick={onReceiptDetailsClickHandler}>
        <Styled.Link>{getCorrectCustomId(customId)}</Styled.Link>
      </Styled.View>
      < Styled.Selector>
        {date || '---'}
      </Styled.Selector>
      <Styled.Selector>
        <Styled.ValueWrapper>{type && type === 'receipt' ? 'receipt' : 'invoice'}</Styled.ValueWrapper>
      </Styled.Selector>
      <Styled.Selector>
        <Styled.ValueWrapper>{supplier || '---'}</Styled.ValueWrapper>
      </Styled.Selector>

      <Styled.Selector >
        <Styled.ValueWrapper >{vatCode || '---'}</Styled.ValueWrapper>
      </Styled.Selector>
      <Styled.Selector>
        <Styled.ValueWrapper>{category || '---'}</Styled.ValueWrapper>
      </Styled.Selector>
      {/* <Styled.Selector>{currency || '---'}</Styled.Selector> */}
      <Styled.Selector>
        <Styled.ValueWrapper>{net || '00.00'}</Styled.ValueWrapper>
      </Styled.Selector>
      <Styled.Selector>
        <Styled.ValueWrapper>{tax || '00.00'}</Styled.ValueWrapper>
      </Styled.Selector>
      <Styled.Selector>
        <Styled.ValueWrapper>{total || '00.00'}</Styled.ValueWrapper>
      </Styled.Selector>
      <Styled.Status>
        <StatusLabel status={status as Statuses} />
      </Styled.Status>
    </Styled.Item>
  );
};
