import { FC, useState } from 'react';
import Modal from 'react-modal';

import { Button } from '../Button/Button';
import { Input } from '../Input';
import { ReUseComponentStyles as Styled } from './ReassignModalWindow.style';
import { COLORS } from '../../styles/theme';
import { modalContentStyles, overlay } from '../../constants/modal-window.constants';
import { IReassignModalWindowProps } from 'typings/types';
import { CustomSelect } from 'components/CustomSelect';
import { ModalButtonsBox } from 'components/ModalButtonsBox';
import { CustomSelectWithCheckbox } from 'components/CustomSelectWithCheckbox';
import { ReactComponent as Close } from 'assets/icons/close.svg';
export const ReassignModalWindow: FC<IReassignModalWindowProps> = (props) => {
  const {
    isOpen,
    onConfirmClick, 
    onCancelClick,
    isLoading,
    options,
    onChangeSelectHandler,
    isMulti,
    selectValue,
    CustomSelectLabel,
    inactiveUser,
    isDisabled,
    isClearable,
    defaultValue,
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); 

  const modalStyles = {
    content: {
      ...modalContentStyles,
      width: '400px',
      height: 'auto',
    },
    overlay,
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancelClick}
      ariaHideApp={false}
      style={modalStyles}
    >

      <Styled.ContentWrapper>
      <Styled.CloseIconWrapper>
          <Close width={20}  onClick={onCancelClick} />
          </Styled.CloseIconWrapper>
        <Styled.Title>REASSIGN TASKS</Styled.Title>
        <Styled.Description>
          Reassign {inactiveUser}'s tasks to</Styled.Description>
          <Styled.DropdownCheck>
          <CustomSelectWithCheckbox
            onChangeValueHandler={onChangeSelectHandler}
            options={options}
            isFullWidth
            isMulti={isMulti}
            isRemoveBoxShadow={true}  
            value={selectValue}
            label={CustomSelectLabel} 
            defaultValue={defaultValue}
          />
          {/* <CustomSelect
          onChangeValueHandler={onChangeSelectHandler}
            options={options}
            isFullWidth
            isMulti={isMulti}
            isRemoveBoxShadow={true}  
            value={selectValue}
            label={CustomSelectLabel} 
            isDisabled={isDisabled}
            isClearable={isClearable}
            defaultValue={defaultValue}
            
          /> */}
          </Styled.DropdownCheck>
         
        <Styled.ButtonsWrapper>
          <ModalButtonsBox
            isLoading={isLoading}
            onCancelClickHandler={onCancelClick}
            onSaveButtonCLickHandler={onConfirmClick}
            isSaveButton
            isNoPadding
          />
        </Styled.ButtonsWrapper>
      </Styled.ContentWrapper>
    </Modal>
  );
};
