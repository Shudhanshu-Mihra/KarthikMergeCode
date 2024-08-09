import React, { FC } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { ResetPasswordField } from '../ResetPasseordFields/ResetPasswordField';
import { IResetPasswordFields } from '../types/MyAccount.types';
import {
  PasswordChangeModel,
  LinkSocaAccModalWindowStyles as Styled,
} from './PasswordChangeModelWindow.style';
import { ModalButtonsBox } from 'components/ModalButtonsBox';
interface ForgetPasswordModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isLoading: boolean;
  // onCloseModalWindowHandler: () => void;
  onFormHandleSubmit: (
    e?: React.FormEvent<HTMLFormElement> | undefined
  ) => void;
  // isValid: boolean;
}

// Example initial values, ensure this matches the type and structure you need
const initialValues: IResetPasswordFields[] = [
  {
    name: 'password',
    type: 'password',
    label: 'Current Password',
    isShowPassword: false,
    onToggleVisibility: () => {},
  },
  {
    name: 'NewPassword',
    type: 'password',
    label: 'New Password',
    isShowPassword: false,
    onToggleVisibility: () => {},
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    isShowPassword: false,
    onToggleVisibility: () => {},
  },
];

const validate = (values: IResetPasswordFields[]) => {
  const errors: Partial<IResetPasswordFields>[] = [];
  // Validation logic here, e.g., check for empty fields
  return errors;
};

export const PasswordChangeModelWindow: FC<ForgetPasswordModalProps> = ( { isOpen, onRequestClose , isLoading , onFormHandleSubmit}) => {
  // Set up Formik for the reset password form
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={PasswordChangeModel}>
      {/* <form onSubmit={onFormHandleSubmit}> */}

      <Styled.MainContentWrapper>
        <h2>Reset Password</h2>
        <ResetPasswordField
          resetPasswordFields={formik.values}
          resetPasswordFormikProps={formik.getFieldProps}
          resetPasswordFormikMeta={formik.getFieldMeta}
        />
        {/* <button onClick={onRequestClose}>Close</button> */}
      </Styled.MainContentWrapper>
      <ModalButtonsBox
          isLoading={isLoading}
          onCancelClickHandler={onRequestClose}
          onSaveButtonCLickHandler={onFormHandleSubmit}
          isSaveButton
          // isDisableButton={!isValid}
        />
      {/* </form> */}

    </Modal>
  );
};
