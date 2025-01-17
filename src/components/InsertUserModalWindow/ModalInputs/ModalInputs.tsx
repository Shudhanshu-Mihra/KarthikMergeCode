// import { FC } from 'react';
// import { FieldInputProps, FieldMetaProps } from 'formik';

// import { CustomSelect } from '../../CustomSelect';
// import { Input } from '../../Input';
// import { ModalFormStyles as Styled } from './ModalInputs.styles';

// interface IModalFormProps {
//   selectValue?: IOption;
//   onChangeSelectHandler?:
//     | ((newValue: any, actionMeta: unknown) => void)
//     | undefined;
//   options?: IOption[];
//   isMulti?: boolean;
//   inputType: string;
//   CustomSelectLabel?:string;
//   label: string;
//   inputName: string;
//   formikMeta: (name: string) => FieldMetaProps<string>;
//   formikProps: (nameOrOptions: string) => FieldInputProps<string>;
//   onEnterCreateItemClick: (event: React.KeyboardEvent<Element>) => void;
// }
// export const ModalInputs: FC<IModalFormProps> = (props) => {
//   const {
//     inputType,
//     isMulti,
//     label,
//     inputName,
//     options,
//     selectValue,
//     formikMeta,
//     onChangeSelectHandler,
//     formikProps,
//     onEnterCreateItemClick,
//     CustomSelectLabel
//   } = props;

//   const { touched, error } = formikMeta(inputType === 'input' ? inputName : '');
//   const { value, onBlur, onChange, name } = formikProps(
//     inputType === 'input' ? inputName : ''
//   );

//   return (
//     <>
//       {inputType === 'input' ? (
//         <Styled.InputWrapper>
//           <Input
//             text={label}
//             value={value}
//             errorText={error}
//             inputName={name}
//             onBlur={onBlur}
//             onChangeValue={onChange}
//             touched={touched}
//             isNoMargin
//             isRemoveBorder
//             onKeyDown={onEnterCreateItemClick}
//           />
//         </Styled.InputWrapper>
//       ) : (
//         <Styled.selectWrapper>
//           <CustomSelect
//             onChangeValueHandler={onChangeSelectHandler}
//             options={options}
//             isFullWidth
//             isMulti={isMulti}
//             isRemoveBorder
//             value={selectValue}
//             label={CustomSelectLabel}
//           />
//         </Styled.selectWrapper>
//       )}
//     </>
//   );
// };


import { FC } from 'react';
import { FieldInputProps, FieldMetaProps } from 'formik';

import { CustomSelect } from '../../CustomSelect';
import { Input } from '../../Input';
import { ModalFormStyles as Styled } from './ModalInputs.styles';

interface IModalFormProps {
  selectValue?: IOption;
  onChangeSelectHandler?:
    | ((newValue: any, actionMeta: unknown) => void)
    | undefined;
  options?: IOption[];
  isMulti?: boolean;
  inputType: string;
  CustomSelectLabel?: string;
  label: string;
  inputName: string;
  // formikMeta: (name: string) => FieldMetaProps<string>;
  // formikProps: (nameOrOptions: string) => FieldInputProps<string>;
  formikMeta: (field: string) => FieldMetaProps<any>;
  formikProps: (field: string) => FieldInputProps<any>;
  onEnterCreateItemClick: (event: React.KeyboardEvent<Element>) => void;
}

export const ModalInputs: FC<IModalFormProps> = (props) => {
  const {
    inputType,
    isMulti,
    label,
    inputName,
    options,
    selectValue,
    formikMeta,
    onChangeSelectHandler,
    formikProps,
    onEnterCreateItemClick,
    CustomSelectLabel,
  } = props;

  const { touched, error } = formikMeta(inputType === 'input' ? inputName : '');
  const { value, onBlur, onChange, name  } = formikProps(
    inputType === 'input' ? inputName : ''
  );
  // console.log("name :- ",name);
  // console.log("value :- ",value);
  // console.log("inputName :- ",inputName);

  // Mapping labels
  const renderLabel = (labelText: string) => (
    <Styled.Label>{labelText}</Styled.Label>
  );
  console.log( "test:= ",selectValue);
  return (
    <>
      {inputType === 'input' ? (
        <Styled.InputWrapper>
          {renderLabel(label)} {/* Render the label before the input */}
          <Input
            text={label}
            // value={value}
            value={value}
            errorText={error}
            inputName={name}
            onBlur={onBlur}
            onChangeValue={onChange}
            touched={touched}
            isNoMargin
            // isRemoveBorder
            isRemoveBoxShadow ={true}
            onKeyDown={onEnterCreateItemClick}
          />
        </Styled.InputWrapper>
      ) : (
        <Styled.SelectWrapper>
          {/* {renderLabel(CustomSelectLabel || label)} */}
          <CustomSelect
            onChangeValueHandler={onChangeSelectHandler}
            options={options}
            isFullWidth
            isMulti={isMulti}
           // isRemoveBorder
           isRemoveBoxShadow ={true}
            value={selectValue}
            label={CustomSelectLabel}
          />
        </Styled.SelectWrapper>
      )}
    </>
  );
};
