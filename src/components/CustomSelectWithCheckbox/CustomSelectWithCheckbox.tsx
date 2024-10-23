import { FC, useEffect, useState } from 'react';
import {
  ActionMeta,
  SingleValue,
  OnChangeValue,
  MultiValue,
  components,
} from 'react-select';

import { DropdownIndicator } from './DropdownIndicator';
import { StyledReactSelect, SelectWrapper, SelectLabel } from './CustomSelectWithCheckbox.style';
import { IOption, IsMulti } from './types';
import { CheckboxItem } from '../Checkbox';

interface ICustomSelectWithCheckboxProps {
  name?: string;
  onChangeValueHandler?: (
    newValue: OnChangeValue<IOption, IsMulti> | unknown,
    actionMeta: ActionMeta<IOption | unknown>
  ) => void;
  marginBottom?: string;
  value?: SingleValue<IOption> | MultiValue<IOption>;
  height?: string;
  width?: string;
  defaultOption?: IOption[];
  options?: IOption[];
  paginate?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  isFullWidth?: boolean;
  isRemoveBorder?: boolean;
  label?: string;
  isRemoveBoxShadow?: boolean;
  isSelected?:boolean;
  defaultValue?:IOption[];
  // data?:[] | undefined;
}
const CustomOption = (props: any) => {
  const { data, isSelected } = props;
  return (
    <components.Option {...props}>
      <CheckboxItem
        name={data.label}
        isChecked={isSelected}
        labelText={data.label}
        onChange={() => props.selectOption(data)}
      />
    </components.Option>
  );
};

export const CustomSelectWithCheckbox: FC<ICustomSelectWithCheckboxProps> = (props) => {
  const {
    onChangeValueHandler,
    defaultOption,
    options,
    value,
    marginBottom,
    height,
    width,
    paginate,
    name,
    isDisabled,
    isMulti,
    isFullWidth,
    isRemoveBorder,
    label,
    isRemoveBoxShadow,
  } = props;

  return (
    <SelectWrapper>
      {!label ? null : <SelectLabel>{label}</SelectLabel>}
      <StyledReactSelect
        isRemoveBorder={isRemoveBorder}
        height={height}
        isRemoveBoxShadow={isRemoveBoxShadow}
        width={width}
        marginBottom={marginBottom}
        components={{ DropdownIndicator, Option: CustomOption }} 
        classNamePrefix="Select"
        options={options}
        defaultValue={defaultOption}
        value={value}
        onChange={onChangeValueHandler}
        paginate={paginate}
        name={name}
        menuPlacement="auto"
        isDisabled={isDisabled}
        placeholder={isDisabled && 'Nothing to select'}
        isMulti={isMulti}
        isClearable={false}
        isFullWidth={isFullWidth}
      />
    </SelectWrapper>
  );
};
