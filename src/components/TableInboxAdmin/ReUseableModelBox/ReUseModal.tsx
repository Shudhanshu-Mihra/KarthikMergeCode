import { FC } from 'react';
import ReactModal from 'react-modal';

// import { ModalWindowHeader } from '../ModalWindowHeader';
import {
    ReUseModalContentStyles as Styled,
  ReUseModalStyles,
} from './reUseModal.style';

interface IReUseModal {
    children?: any;
    // isDisableButton?: boolean;
    // isLoading: boolean;
    onCloseModalWindowHandler: () => void;
    // onChangePaginationInputValueHandler: (
    // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => void;
    // onSaveButtonCLickHandler: () => Promise<void>;
    // onEnterCreateItemClick: (event: React.KeyboardEvent) => void;
    isModalWindowOpen: boolean;
    // headerText: string;
    // inputValue: string;
    // text?: string;
}

export const ReUseModal: FC<IReUseModal> = (props) => {
    const {
        children,
      isModalWindowOpen,
      onCloseModalWindowHandler
  } = props;

  return (
    <ReactModal
      isOpen={isModalWindowOpen}
      onRequestClose={onCloseModalWindowHandler}
      ariaHideApp={false}
      style={ReUseModalStyles}
    >
      {children}
    </ReactModal>
  );
};