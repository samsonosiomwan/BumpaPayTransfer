import {ChangeEvent, Dispatch, ReactNode, SetStateAction} from 'react';

export interface ITextFieldProps {
  label?: string;
  value?: any;
  style?: object;
  onBlur?: (val?: ChangeEvent) => void;
  onFocus?: (val?: ChangeEvent) => void;
  customError: string;
  height?: number;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  showError?: boolean;
  multiline?: boolean;
  onChange?: any;
  rightAdornment?: any;
  requiredErrorMessage?: string;
  placeholder?: string;
  labelOut?: boolean;
  styleInput?: object;
  maxLength?: number;
  loading?: boolean;
  onSelect?: any;
  onEmpty?: (val?: string | number) => void;
  suggestions?: object[];
  titleKey?: string | number;
  children?: ReactNode;
  threshold?: number;
  setPersistTap?: (val?: string | number) => void;
  showDropdown?: boolean;
  editable?: boolean;
  hideRightArrow?: boolean;
  maxScrollHeight?: number;
}
