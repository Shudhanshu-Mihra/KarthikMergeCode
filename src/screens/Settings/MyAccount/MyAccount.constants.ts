import {
  IGetInputFieldsProps,
  IGetResetPasswordFields,
} from './types/MyAccount.types';

export const resetPasswordFormikInitialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const getInputFields = (props: IGetInputFieldsProps) => {
  const {
    // countries,
    dateFormats,
    // formatedCurrencies,
    funcArray,
    state,
    isDisabledSelect,
    // isDisabledCountry,
  } = props;
  return [
    {
      type: 'input',
      label: 'Full Name',
      name: 'name',
    },
    {
      type: 'input',
      label: 'Email',
      name: 'email',
    },
    {
      type: 'select',
      name: 'dateFormat',
      label: 'Date Format',
      isDisabled: isDisabledSelect,
      value: state.dateFormat,
      options: dateFormats,
      // onChangeSelect: funcArray[0],
      onChangeSelect:funcArray && Array.isArray(funcArray) && funcArray[0] ? funcArray[0] : undefined,
    }
  ];
};

export const getResetPasswordInputFields = (props: IGetResetPasswordFields) => {
  const {
    isShowPassword: {
      isShowConfirmPassword,
      isShowCurrentPassword,
      isShowNewPassword,
    },
    funcsArray,
  } = props;
  return [
    {
      onToggleVisibility: funcsArray[0],
      isShowPassword: isShowCurrentPassword,
      label: 'Current Password',
      name: 'currentPassword',
      type: 'password',
    },
    {
      onToggleVisibility: funcsArray[1],
      isShowPassword: isShowNewPassword,
      label: 'New Password',
      name: 'newPassword',
      type: 'password',
    },
    {
      onToggleVisibility: funcsArray[2],
      isShowPassword: isShowConfirmPassword,
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
    },
  ];
};
