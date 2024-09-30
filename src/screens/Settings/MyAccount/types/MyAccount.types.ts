import { SingleValue } from 'react-select';
import { getInputFields } from '../MyAccount.constants';
import { ChangeEvent } from 'react';

export type TInputFields = ReturnType<typeof getInputFields>;
// export interface IGetInputFieldsProps {
//   isDisabledCountry?: boolean;
//   isDisabledSelect?: boolean;
//   funcArray: any[];
//   state: {
//     currency: SingleValue<IOption> | any;
//     dateFormat: SingleValue<IOption> | any;
//     country: SingleValue<IOption> | any;
//   };
//   formatedCurrencies: { label: string; value: string; id: string }[];
//   countries: IOption[];
//   dateFormats: IOption[];
// }
export interface IOption {
  id?: string;
  label: string;
  value: any;
}
interface IuseMyAccountState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  currency: SingleValue<IOption> | any;
  dateFormat: SingleValue<IOption> | any;
  country: SingleValue<IOption> | any;
}
export interface IGetInputFieldsProps {
  type: string;
  label: string;
  name: string;
  isDisabled?: boolean;
  value?: any;
  options?: IOption[];
  onChangeSelect?: (value: any) => void;
  isDisabledCountry?: boolean;
  isDisabledSelect: boolean;
  countries?: IOption[];
  formatedCurrencies?: IOption[];
  dateFormats?: IOption[];
  funcArray?: ((value: any) => void) | ((event: ChangeEvent<HTMLInputElement>) => void)[] | ((event: React.ChangeEvent<HTMLInputElement>) => undefined) ;
  state: IuseMyAccountState;
}

export interface IGetResetPasswordFields {
  isShowPassword: {
    isShowCurrentPassword: boolean;
    isShowNewPassword: boolean;
    isShowConfirmPassword: boolean;
  };
  funcsArray: (() => void)[];
}

export interface IResetPasswordFieldsProps {
  name: string;
  type: string;
  isShowPassword: boolean;
  onToggleVisibility: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
}
// export interface IOption {
//   label: string;
//   value: string;
// }

// export type TInputFields = ReturnType<typeof getInputFields>;
export type IAdminInputFields = {
  label: string;
  value: string;
  type: string;
  name: string;
  isDisabled:boolean;
  option: IOption[][];
  onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect:((newValue: IOption, actionMeta: unknown) => void)[];
}
// export interface IResetPasswordFields {
//   onToggleVisibility: () => void;
//   isShowPassword: boolean;
//   label: string;
//   name: string;
//   type: string;
//   value:string;
// }
export interface IResetPasswordFields {
  ShowPasswordHandler: () => void;
  onInputChange: (optionName: "currency" | "newPassword" | "confirmPassword" | "currentPassword" | "dateFormat", value: string | boolean | SingleValue<IOption>) => void;
  onToggleVisibility: () => void;
  isShowPassword: boolean;
  label: string;
  name: string;
  type: string;
  value:string
}

// onInputChange: (
//   optionName: "currency" | "newPassword" | "confirmPassword" | "currentPassword" | "dateFormat" | "country", 
//   value: string | boolean | SingleValue<IOption>
// ) => void;  