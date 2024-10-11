import { FC, useState } from 'react';
import Modal from 'react-modal';

import { Button } from '../Button/Button';

import {

  DeleteModalWindowContentStyles as Styled,
} from './ConformRefresh';
import { COLORS } from '../../styles/theme';
import { modalContentStyles, overlay } from '../../constants/modal-window.constants';
import { Input } from '../Input';

export const ConformRefreshWindow: FC<IDeleteModalWindowProps> = (props) => {
  const {
    isDeleteModalWindowOpen,
    deleteItemName,
    isLoading,
    categoryName,
    account,
    onDeleteButtonClickHandler,
    onCloseDeleteModalWindowHandler,
  } = props;
  const DeleteModalWindowStyles = {
    content: {
      ...modalContentStyles,
      width: '420px',
      height: account ? 'auto' : '232px',
    },
    overlay,
  };
  const [value, setValue] = useState('');

  return (
    <Modal
      isOpen={isDeleteModalWindowOpen}
      onRequestClose={onCloseDeleteModalWindowHandler}
      ariaHideApp={false}
      style={DeleteModalWindowStyles}
    >
      <Styled.ContentWrapper data-testid="modal-window">
        <Styled.Title>Confirm Refresh Auth Token</Styled.Title>
        <Styled.MainContentWrapper>
          <Styled.SubTitle>
            {!account ?
              `Are you sure to refresh the auth token of ${ categoryName} and generate the new one ? ` :
              `Are you sure to refresh the auth token and generate the new one ?`
            }
            {/* <Styled.Highlighter>{deleteItemName}.</Styled.Highlighter> Old token will be removed */}
          </Styled.SubTitle>
          {account &&
            <>
              <Styled.SubTitle style={{ color: COLORS.red, marginBottom: 10, marginTop: 10 }}>
                All the data associated with this account will also be deleted
              </Styled.SubTitle>
              <Styled.SubTitle style={{ color: COLORS.red, marginBottom: 10, marginTop: 10 }}>
                Type 'DELETE' and click on 'Yes' to confirm
              </Styled.SubTitle>
              <Input
                value={value}
                onChangeValue={(e) => setValue(e.target.value)}
                inputName=""
                text=""
                isRemoveBorder
              />
            </>
          }
          <Styled.ButtonsBox>
            <Styled.ButtonsWrapper>
              <Button
                isAccout={Boolean(account)}
                onClick={onDeleteButtonClickHandler}
                themedButton="roundedWhite"
                width="rounded"
                isLoading={isLoading}
                isDisabled={account ? value !== 'DELETE' : false}
              >
                Yes
              </Button>
              <Button
                onClick={onCloseDeleteModalWindowHandler}
                themedButton="roundedRed"
                width="rounded"
              >
                No
              </Button>
            </Styled.ButtonsWrapper>
          </Styled.ButtonsBox>
        </Styled.MainContentWrapper>
      </Styled.ContentWrapper >
    </Modal >
  );
};
